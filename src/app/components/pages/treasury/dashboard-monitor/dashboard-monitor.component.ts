import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PaybillTransaction } from 'src/app/shared/models/paybill-transaction';
import { PaybillTransactionService } from 'src/app/shared/services/paybill-transaction.service';
import { LoggerService } from 'src/app/shared/services/logger.service';
import * as XLSX from 'xlsx'
import * as FileSaver from 'file-saver'

import { jsPDF } from 'jspdf'
import { autoTable } from 'jspdf-autotable'

@Component({
  selector: 'app-dashboard-monitor',
  templateUrl: './dashboard-monitor.component.html',
  styleUrl: './dashboard-monitor.component.scss',
  standalone: false
})
export class DashboardMonitorComponent implements OnDestroy {
  paybillTransactions: PaybillTransaction[] = [];
    isLoading: boolean = true
    totalAmount: number = 0
    searchTerm: string = ""
    filteredTransactions: PaybillTransaction[] = []

    paginatedTransactions: PaybillTransaction[] = []
    totalLength = 0;
    pageSize = 20;
    currentPage = 1
    totalPages = 0;

    logoBase64: string = ''

    startDate: string = ''; // yyyy-MM-dd format from input[type=date]
    endDate: string = '';

    private destroy$ = new Subject<void>();

    constructor(
      public paybillTransactionService: PaybillTransactionService,
      private logger: LoggerService
    ) { }

    ngOnInit(): void {
      this.paybillTransactionService.getAll()
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data: PaybillTransaction[]) => {
            this.paybillTransactions = data
              .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

            this.filteredTransactions = [...this.paybillTransactions];

            this.totalAmount = this.filteredTransactions.reduce((sum, transaction) => {
              return sum + parseFloat(transaction.amount)
            }, 0)
            this.paginate()
            this.isLoading = false
          },
          error: err => {
            this.logger.error("Error fetching transactions", err);
            this.isLoading = false
          }
        })

      this.loadLogo()
    }

    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }
  
    applyFilters(): void {
      this.filteredTransactions = this.paybillTransactions.filter(txn => {
        const textMatch = this.searchTerm
          ? (txn.trans_id + txn.first_name + txn.last_name + txn.phone_number + txn.account)
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())
          : true;
  
        const txnDate = new Date(txn.created_at);
        const start = this.startDate ? new Date(this.startDate) : null;
        const end = this.endDate ? new Date(this.endDate) : null;
  
        const inDateRange =
          (!start || txnDate >= start) &&
          (!end || txnDate <= new Date(end.getTime() + 24 * 60 * 60 * 1000)); // include end day
  
        return textMatch && inDateRange;
      });
  
      this.totalAmount = this.filteredTransactions.reduce((sum, transaction) => {
        return sum + parseFloat(transaction.amount)
      }, 0)
  
      this.paginate(); // reset to first page if paginated
    }
  
    loadLogo() {
      const imagePath = 'assets/images/brand/report-logo.png'
  
      fetch(imagePath)
        .then(res => res.blob())
        .then(blob => {
          const reader = new FileReader()
          reader.onloadend = () => {
            this.logoBase64 = reader.result as string;
          }
  
          reader.readAsDataURL(blob)
        })
    }
  
    formatDateTime(datetime: string): string {
      const date = new Date(datetime)
      const formattedDate = date.toISOString().slice(0, 10)
      const formattedTime = date.toTimeString().slice(0, 8)
      return `${formattedDate} : ${formattedTime}`
    }
  
    paginate(): void {
      const startIndex = (this.currentPage - 1) * this.pageSize
      const endIndex = startIndex + this.pageSize
  
      this.paginatedTransactions = this.filteredTransactions.slice(startIndex, endIndex)
      this.totalLength = this.filteredTransactions.length
      this.totalPages = Math.ceil(this.totalLength / this.pageSize)
    }
  
    filterTransactions(): void {
      const term = this.searchTerm.toLowerCase()
      this.filteredTransactions = this.paybillTransactions.filter(txn =>
        txn.trans_id?.toLowerCase().includes(term) ||
        txn.first_name?.toLowerCase().includes(term) ||
        txn.phone_number?.toLowerCase().includes(term) ||
        txn.account?.toLowerCase().includes(term) ||
        txn.created_at?.toLowerCase().includes(term)
      )
  
      this.totalAmount = this.filteredTransactions.reduce((sum, txn) => {
        return sum + parseFloat(txn.amount)
      }, 0)
  
      this.currentPage = 1
      this.paginate()
  
    }
  
    onPageChange(page: number | string): void {
      if (typeof page !== 'number' || page < 1 || page > this.totalPages || page === this.currentPage) {
        return;
      }
  
      this.currentPage = page;
      this.paginate();
    }
  
    getDisplayedPages(): (number | '...')[] {
      const pages: (number | '...')[] = [];
  
      if (this.totalPages <= 7) {
        for (let i = 1; i <= this.totalPages; i++) {
          pages.push(i);
        }
        return pages;
      }
  
      pages.push(1);
  
      if (this.currentPage > 4) {
        pages.push('...');
      }
  
      const start = Math.max(2, this.currentPage - 2);
      const end = Math.min(this.totalPages - 1, this.currentPage + 2);
  
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
  
      if (this.currentPage < this.totalPages - 3) {
        pages.push('...');
      }
  
      pages.push(this.totalPages); // Always show last page
  
      return pages;
    }
  
  
    getReportFileName(): string {
      const now = new Date()
      const year = now.getFullYear()
      const month = String(now.getMonth() + 1).padStart(2, '0')
      const day = String(now.getDate()).padStart(2, '0')
      return `${year}_${month}_${day}_TRANSACTIONS_REPORT`
    }
  
    exportToExcel(): void {
      const exportData = this.filteredTransactions.map(txn => ({
        'Transaction ID': txn.trans_id,
        'First Name': txn.first_name,
        'Phone': txn.phone_number,
        'Account': txn.account,
        'Amount': txn.amount,
        'Date': this.formatDateTime(txn.created_at)
      }))
  
      if (exportData.length === 0) {
        alert('no transaction to export!');
        return;
      }
  
      const worksheet = XLSX.utils.json_to_sheet(exportData);
      const workbook = { Sheets: { 'Transactions': worksheet }, SheetNames: ['Transactions'] }
      const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
      const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
  
      const filename = this.getReportFileName() + '.xlsx'
      FileSaver.saveAs(blob, filename)
    }
  
    exportToPDF(): void {
      const doc = new jsPDF()
      const pageWidth = doc.internal.pageSize.getWidth()
  
      const headers = [['#', 'Trans ID', 'First Name', 'Phone', 'Account', 'Amount', 'Date']]
      const data = this.filteredTransactions.map((txn, index) => [
        index + 1,
        txn.trans_id,
        txn.first_name,
        txn.phone_number,
        txn.account,
        txn.amount,
        this.formatDateTime(txn.created_at)
      ])
  
      const totalAmount = this.filteredTransactions.reduce((sum, txn) => sum + parseFloat(txn.amount), 0)
      const formattedTotal = `${totalAmount.toLocaleString('en-KE', { minimumFractionDigits: 2 })}`
      data.push(['', '', '', '', 'Total Amount: Ksh. ', formattedTotal, '']);
  
      // STEP 1: Draw table and standard footers
      autoTable(doc, {
        head: headers,
        body: data,
        startY: 40,
        styles: { fontSize: 7 },
        headStyles: { fillColor: [23, 83, 81] },
        didParseCell: function (dataArg) {
          const row = dataArg.row;
          const cell = dataArg.cell;
  
          if (row.raw && row.index === data.length - 1) {
            cell.styles.fontSize = 8;
            cell.styles.fontStyle = 'bold';
  
            if (dataArg.column.index === 5) {
              cell.styles.halign = 'right';
            }
          }
        },
        didDrawPage: (dataArg) => {
          const pageSize = doc.internal.pageSize;
          const pageHeight = pageSize.height || pageSize.getHeight();
          const pageWidth = pageSize.width || pageSize.getWidth();
          const currentPage = dataArg.pageNumber;
          const totalPages = doc.getNumberOfPages();
  
          if (currentPage === 1) {
            // Title and logo on first page
            doc.setFontSize(14);
            doc.setTextColor('#175351');
            doc.setFont('helvetica', 'bold');
            doc.text('Church Paybill Transaction Report', pageWidth / 2, 20, { align: 'center' });
  
            if (this.logoBase64) {
              const maxWidth = 32;
              const aspectRatio = 1028 / 300;
              const scaledWidth = maxWidth;
              const scaledHeight = maxWidth / aspectRatio;
              doc.addImage(this.logoBase64, 'PNG', 15, 10, scaledWidth, scaledHeight);
            }
          }
  
          // Always draw page numbers
          doc.setFontSize(7);
          doc.setTextColor('#175351');
          doc.setFont('helvetica', 'bold');
          doc.text(`Page ${currentPage} of ${totalPages}`, pageWidth - 40, pageHeight - 10);
        }
      });
  
      // STEP 2: Add branding + timestamp ONLY on the last page
      const totalPages = doc.getNumberOfPages();
      doc.setPage(totalPages);
  
      const pageSize = doc.internal.pageSize;
      const pageHeight = pageSize.height || pageSize.getHeight();
      //const pageWidth = pageSize.width || pageSize.getWidth();
  
      const today = new Date();
      const generatedOn = today.toLocaleDateString('en-KE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      const generatedOnTime = today.toLocaleTimeString('en-KE', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
      });
      const footerBaseY = pageHeight - 10;
  
      // Branding and date
      doc.setFontSize(8);
      doc.setTextColor('#175351');
      doc.setFont('helvetica', 'normal');
      doc.text(`KSDACHURCH • Generated by Finance Team`, pageWidth / 2, footerBaseY - 5, {
        align: 'center'
      });
  
      doc.setFontSize(7);
      doc.setFont('helvetica', 'italic', 'bold');
      doc.text(`Generated on ${generatedOn} at ${generatedOnTime}`, pageWidth / 2, footerBaseY, {
        align: 'center'
      });
  
      const filename = this.getReportFileName() + '.pdf'
      doc.save(filename)
    }

}
