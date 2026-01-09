import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MemberService } from '../../../shared/services/member.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Auth } from '../../classes/auth';
import { PrayercellService } from 'src/app/shared/services/prayercell.service';
import { PopulationGroupService } from 'src/app/shared/services/population-group.service';
import { CollectionService } from 'src/app/shared/services/collection.service';
import { MembershipTypeService } from 'src/app/shared/services/membership-type.service';
import { Chart, ChartType } from 'chart.js';
import { ContributionCategoryService } from 'src/app/shared/services/contribution-category.service';
import * as moment from 'moment'
import { User } from 'src/app/shared/models/user';
import { Prayercell } from 'src/app/shared/models/prayercell';
import { Gender, Member } from 'src/app/shared/models/member';
import { PopulationGroup } from 'src/app/shared/models/population-group';
import { CollectionTotal, ContributionCategory } from 'src/app/shared/models/collection';
import { MembershipCount } from 'src/app/shared/models/membership';



@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    standalone: false
})
export class DashboardComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
 // id: number
  solidContributionData: any 
  solidContributionOptions: any 
  solidContributionLegend: boolean = true 
  solidContributionType: ChartType = 'bar'
  selectedCategory: string = 'weekly' 

  selectedCategoryName: string = "Category"
  selectedCategoryId: number

  contributionCategories: any[] 
  contributionCategory: ContributionCategory


  // category chart
  solidCategoryData: any 
  solidCategoryOptions: any 
  solidCategoryLegend: boolean = true 
  solidCategoryType: ChartType = 'bar'

  members: Member[] = [] 
  prayercells: Prayercell[] = [] 
  groups: PopulationGroup[] = []
  user: User;
  totalCollection: CollectionTotal
  gender: Gender
  membershipCount: MembershipCount

 constructor (
  private authService: AuthService, 
 
  private memberService: MemberService,
  private membershipTypeService: MembershipTypeService,
  private prayercellService: PrayercellService,
  private collectionService: CollectionService,
  private contributionCategoryService: ContributionCategoryService,
  private populationGroupService: PopulationGroupService,

  private router: Router, 
  private route: ActivatedRoute) {

 }
  ngOnInit(): void {
    this.fetchUserData()
    this.fetchMembers()
    this.fetchGenderCount()
    this.fetchMembershipCount()
    this.fetchPrayercells()
    this.fetchPopulationGroups()
    this.fetchTotalContribution()

   this.fetchContributionCategoriesChart()
   this.selectedCategoryId = 1
    
      // inital data load for chart
   this.loadContributionChartData('weekly'); // -> Default to Weekly

    this.loadContributionCategoryChartData(this.selectedCategory)
  
   
  }

  onCategoryChange(): void {
    const selectedCategory = this.contributionCategories?.find(category => category.id === this.selectedCategoryId)

    if(selectedCategory) {
      this.selectedCategoryName = selectedCategory.name
      this.contributionCategory = selectedCategory

    } else {
      this.selectedCategoryName = "Category"
    }

    this.updateContributionCategoryChartData()
  }

  fetchContributionCategoriesChart(): void {
    this.contributionCategoryService.categoriesChart()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ContributionCategory[]) => {
        this.contributionCategories = data;
        this.updateContributionCategoryChartData()
      });
   }


  loadContributionCategoryChartData(category: string): void {
    this.contributionCategoryService.categoriesChart()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ContributionCategory[]) => {
        this.contributionCategories = data;
        const selectedCategory = this.contributionCategories?.find(category => category.id === this.selectedCategoryId)

      if (selectedCategory) {
        const aggregatedContributionCategoryData = this.aggregateContributionCategoryData(selectedCategory.contributions, category)

        this.solidCategoryData = {
          labels: aggregatedContributionCategoryData.labels,
          datasets: [
            {
              label: 'Total Contributions',
              data: aggregatedContributionCategoryData.values,
              fill: false,
              backgroundColor: 'rgb(23,83,81)',
              hoverBackgroundColor: 'rgb(23,83,81)',
              hoverBorderColor: 'rgb(23,83,81)',
            }
          ]
        }
      }
    });

    this.solidCategoryOptions = {
      maintainAspectRatio: false,
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

  aggregateContributionCategoryData(contributions: any[], category: string) {
    let labels: string[] = [];
    let values: number[] = [];
    let groupedData: { [key: string]: number } = {};

    contributions.forEach(contribution => {
      let date = moment.default(contribution.contribution_date);
      let key:any;

      switch (category) {
        case 'weekly':
          key = date.startOf('isoWeek').format('YYYY-MM-DD');
          break;

        case 'monthly':
          key = date.format('YYYY-MM');
          break;

        case 'yearly':
          key = date.format('YYYY');
          break;
      }

      if (!groupedData[key]) {
        groupedData[key] = 0;
      }

      groupedData[key] += contribution.total_amount;
    });

    labels = Object.keys(groupedData).sort();
    values = labels.map(label => groupedData[label]);

    return {
      labels: labels,
      values: values
    };
  }

  updateContributionCategoryChartData() {
    this.loadContributionCategoryChartData(this.selectedCategory);
  }

 fetchUserData(): void {
  this.authService.user()
    .pipe(takeUntil(this.destroy$))
    .subscribe(
      user => {
        this.user = user
        Auth.userEmitter.emit(this.user);
      },
      () => this.router.navigate(['/auth/login'])
    )
 }

 fetchMembers(): void {
  this.memberService.getAll()
    .pipe(takeUntil(this.destroy$))
    .subscribe((data) => {
      this.members = data;
    });
 }

 fetchGenderCount(): void {
  this.memberService.genderCount()
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: Gender) => {
      this.gender = data;
    })
 }

 fetchMembershipCount(): void {
  this.membershipTypeService.membershipCount()
    .pipe(takeUntil(this.destroy$))
    .subscribe((data: MembershipCount) => {
      this.membershipCount = data
    })
}

  fetchPrayercells(): void {
    this.prayercellService.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.prayercells = data
      })
 }

 fetchPopulationGroups(): void {
  this.populationGroupService.getAll()
    .pipe(takeUntil(this.destroy$))
    .subscribe((data) => {
      this.groups = data
    })
 }

 fetchTotalContribution(): void {
  this.collectionService.getTotalAmount()
    .pipe(takeUntil(this.destroy$))
    .subscribe((data)=> {
      this.totalCollection = data
    })

 }

  loadContributionChartData(category: string): void {
    this.collectionService.chart()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => {
        const aggregatedData = this.aggregateData(data, category)

      this.solidContributionData = {
        labels: aggregatedData.labels,
        datasets: [
           {
             label: 'Total Contribution',
             data: aggregatedData.values,
             fill: false,
             backgroundColor: 'rgb(23,83,81)',
             hoverBackgroundColor:  'rgb(23,83,81)',
             hoverBorderColor: 'rgb(23,83,81)'
           },
         ],
       };
      })
   
     this.solidContributionOptions = {
       maintainAspectRatio: false,
       responsive: true,
       plugins: {
         legend: {
           display: true,
         },
       },
     };
   
     this.solidContributionLegend = true;
     this.solidContributionType = 'bar'; 
  }

  aggregateData(contributions: any[], category: string) {
    let labels: string[] = []
    let values: number[] = []
    let groupedData: {[key: string]: number } = {} 

    contributions.forEach(contribution => {
      let date = moment.default(contribution.contribution_date)
      let key:any

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
    this.loadContributionChartData(category)
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
