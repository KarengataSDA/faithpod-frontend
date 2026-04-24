import { Component, OnInit } from '@angular/core';
import { Contribution, ContributionCategory } from '../../../../../shared/models/collection';
import { ContributionCategoryService } from 'src/app/shared/services/contribution-category.service';
import { ThemeService } from 'src/app/shared/services/theme.service';
import { ActivatedRoute } from '@angular/router';
import { ChartType } from 'chart.js';
import * as moment from 'moment'

@Component({
    selector: 'app-view-category',
    templateUrl: './view-category.component.html',
    styleUrls: ['./view-category.component.scss'],
    standalone: false
})
export class ViewCategoryComponent implements OnInit {
  id: number
  category: ContributionCategory

  solidCategoryData: any
  solidCategoryOptions: any
  solidCategoryLegend: boolean = true
  solidCategoryType: ChartType = 'bar'
  selectedCategory: string = 'weekly'

  paginatedContributions: Contribution[] = []

  currentPage = 1;
  pageSize = 10;
  totalLength = 0;
  totalPages = 0;

  constructor(
    private contributionCategoryService: ContributionCategoryService,
    private themeService: ThemeService,
    private route: ActivatedRoute
  ) {}

  
  getChartColor(): string {
    const theme = this.themeService.getStoredTheme();
    const primaryColor = theme?.primaryColor || '23, 83, 81';
    return `rgb(${primaryColor})`;
  }

  
  getChartHoverColor(opacity: number = 0.8): string {
    const theme = this.themeService.getStoredTheme();
    const primaryColor = theme?.primaryColor || '23, 83, 81';
    return `rgba(${primaryColor}, ${opacity})`;
  }

  ngOnInit(): void {
      this.id = this.route.snapshot.params['categoryId'];

      this.contributionCategoryService.find(this.id).subscribe((data: ContributionCategory)=> {
        this.category = data; 
        this.totalLength = data.contributions.length;
        this.totalPages = Math.ceil(this.totalLength / this.pageSize);
        this.currentPage = 1;
        this.updatePaginatedContributions()
      })

    this.loadChartData('weekly'); 
    

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

    pages.push(this.totalPages);

    return pages;
  }

  onPageChange(page: number): void {
    if (page < 1 || page > this.totalPages) return;

    this.currentPage = page;
    this.updatePaginatedContributions();
  }

   updatePaginatedContributions(): void {
     if (this.currentPage < 1) this.currentPage = 1;
    if (this.currentPage > this.totalPages) this.currentPage = this.totalPages || 1;

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    
    this.paginatedContributions = this.category.contributions.slice(startIndex, endIndex);
  }

  loadChartData(category: string): void {
    this.contributionCategoryService.chart(this.id).subscribe(data => {
      const aggregatedData = this.aggregateData(data.contributions, category)
  
    this.solidCategoryData = {
      labels: aggregatedData.labels,
      datasets: [
         {
           label: 'Total Contribution',
           data: aggregatedData.values,
           fill: false,
           backgroundColor: this.getChartColor(),
           hoverBackgroundColor: this.getChartHoverColor(),
           hoverBorderColor: this.getChartColor(),
           outerHeight: '1000px'
         },
       ],
     };
    })
   
     this.solidCategoryOptions = {
       maintainAspectRatio: false,
      // aspectRatio: 2,
       responsive: true,
       plugins: {
         legend: {
           display: true,
         },
       },
     };
   
     this.solidCategoryLegend = true;
     this.solidCategoryType = 'bar'; 
  }

  aggregateData(contributions: any[], category: string) {
    let labels: string[] = []
    let values: number[] = []
    let groupedData: {[key: string]: number } = {} 

    contributions.forEach(contribution => {
      let date = moment.default(contribution.contribution_date)
      let key

      switch(category) {
        case 'weekly':
          key = date.startOf('isoWeek').format('YYYY-MM-DD');
          break; 

        case 'monthly':
          key = date.format('YYYY-MM');
          break;

        case 'yearly':
          key = date.format('YYYY')
          break;

      }

      if(!groupedData[key]) {
        groupedData[key] = 0;
      }

      groupedData[key] += contribution.total_amount
    })

    labels = Object.keys(groupedData).sort();
    values = labels.map(label => groupedData[label])

    return {
      labels: labels,
      values: values
    }
  }

  updateChartData(category: string) {
    this.selectedCategory = category
    this.loadChartData(category)
  }


}
