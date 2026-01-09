import { Component, OnInit } from '@angular/core';
import { ContributionCategory } from '../../../../../shared/models/collection';
import { ContributionCategoryService } from 'src/app/shared/services/contribution-category.service';
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

  constructor(
    private contributionCategoryService: ContributionCategoryService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
      this.id = this.route.snapshot.params['categoryId'];

      this.contributionCategoryService.find(this.id).subscribe((data: ContributionCategory)=> {
        this.category = data; 
      })

          // inital data load for chart
    this.loadChartData('weekly'); // -> Default to Weekly

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
           backgroundColor: 'rgb(23,83,81)',
           hoverBackgroundColor:  'rgb(23,83,81)',
           hoverBorderColor: 'rgb(23,83,81)',
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
