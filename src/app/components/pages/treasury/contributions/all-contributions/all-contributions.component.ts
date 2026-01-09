import { Component, OnInit } from '@angular/core';
import { Collection, Contribution } from 'src/app/shared/models/collection';
import { AuthService } from 'src/app/shared/services/auth.service';
import { CollectionService } from 'src/app/shared/services/collection.service';
import * as XLSX from 'xlsx'
import * as FileSaver from 'file-saver'

import { jsPDF } from 'jspdf'
import { autoTable } from 'jspdf-autotable'

@Component({
  selector: 'app-all-contributions',
  templateUrl: './all-contributions.component.html',
  styleUrls: ['./all-contributions.component.scss'],
  standalone: false
})
export class AllContributionsComponent implements OnInit {
  collections: Contribution[] = [];
  isLoading: boolean = true

  totalAmount: number = 0 
  searchTerm: string = ""
  filteredContributions: Contribution[] = []

  paginatedContributions: Contribution[] = [] 
  totalLength = 0; 
  pageSize = 20 
  currentPage = 1 
  totalPages = 0 


  logoBase64: string = ''

  startDate: string = ''; 
  endDate: string = '';
  
  constructor(public collectionService: CollectionService, public authService: AuthService) {}

  ngOnInit(): void {
    this.collectionService.getAllContributions().subscribe({
      next: (data: Contribution[]) => {
        this.collections = data 
          .sort((a, b) => new Date(b.contribution_date).getTime() - new Date(a.contribution_date).getTime())

        this.filteredContributions = [...this.collections]
        this.totalAmount = this.filteredContributions.reduce((sum, transaction) => {
          return sum + parseFloat(transaction.contribution_amount)
        }, 0)
        this.paginate()
        this.isLoading = false 
      },
      error: err => {
        console.log("error fetching data", err) 
        this.isLoading = false
      }
    })

    this.loadLogo()
  }

  filterSearchContributions(): void {
    const term = this.searchTerm.toLowerCase()
    this.filteredContributions = this.collections.filter(txn =>
      txn.user.first_name?.toLowerCase().includes(term) || 
      txn.user.last_name?.toLowerCase().includes(term) ||
      txn.user.phone_number?.toLowerCase().includes(term) ||
      txn.contribution_date?.toLowerCase().includes(term) ||
      txn.contribution_type.name?.toLocaleLowerCase().includes(term)
    )
    
    this.totalAmount = this.filteredContributions.reduce((sum, txn) => {
      return sum + parseFloat(txn.contribution_amount)
    }, 0)

    this.currentPage = 1 
    this.paginate()
  }

  paginate(): void {
    const startIndex = (this.currentPage - 1) * this.pageSize 
    const endIndex = startIndex + this.pageSize 

    this.paginatedContributions = this.filteredContributions.slice(startIndex, endIndex)
    this.totalLength = this.filteredContributions.length 
    this.totalPages = Math.ceil(this.totalLength / this.pageSize)
  }

  onPageChange(page: number | string): void {
    if(typeof page !== 'number' || page < 1 || page > this.totalPages || page === this.currentPage ) {
      return 
    }
    this.currentPage = page; 
    this.paginate()
  }

  getDisplayedPages(): (number | '...')[] {
    const pages: (number | '...')[] = [];

    if(this.totalPages <= 7) {
      for(let i = 1; i <= this.totalPages; i++) {
        pages.push(i)
      }
      return pages;
    }
    pages.push(1) 

    if(this.currentPage > 4) {
      pages.push('...')
    }

    const start = Math.max(2, this.currentPage - 2)
    const end = Math.min(this.totalPages - 1, this.currentPage + 2)

    for(let i = start; i<= end; i++) {
      pages.push(i)
    }

    if(this.currentPage < this.totalPages - 3) {
      pages.push('...')
    }

    pages.push(this.totalPages)

    return pages;
  }

  exportToExcel(): void {
    const exportData = this.filteredContributions.map((txn, index) => ({
      'No': index + 1,
      'First Name': txn.user.first_name,
      'Last Name': txn.user.last_name,
      'Contribution Category': txn.contribution_type.name,
      'Amount': parseFloat(txn.contribution_amount),
      'Date' : txn.contribution_date
    }))

    if(exportData.length === 0) {
      alert('no transaction to export')
      return
    }

    const worksheet = XLSX.utils.json_to_sheet(exportData)
    const workbook = { Sheets: {'Contributions':worksheet }, SheetNames: ['Contributions']}
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const blob = new Blob([excelBuffer], {type: 'application/octet-stream'})

    const filename = this.getReportFileName() + '.xlsx'
    FileSaver.saveAs(blob,filename)
  }

   getReportFileName(): string {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    return `${year}_${month}_${day}_CONTRIBUTIONS_REPORT`
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

   exportToPDF(): void {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()

    const headers = [['#', 'First Name', 'Last Name', 'Phone Number', 'Category Type', 'Amount', 'Date']]
    const data = this.filteredContributions.map((txn, index) => [
      index + 1,
      txn.user.first_name,
      txn.user.last_name,
      txn.user.phone_number,
      txn.contribution_type.name,
      txn.contribution_amount,
      txn.contribution_date,
      this.formatDateTime(txn.contribution_date)
    ])

    const totalAmount = this.filteredContributions.reduce((sum, txn) => sum + parseFloat(txn.contribution_amount), 0)
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
          doc.text('Church Contributions Report', pageWidth / 2, 20, { align: 'center' });

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
