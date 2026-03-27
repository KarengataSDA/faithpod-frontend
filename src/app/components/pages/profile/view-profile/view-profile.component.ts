import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Contribution } from '../../../../shared/models/collection';
import { CollectionService } from '../../../../shared/services/collection.service';

@Component({
    selector: 'app-view-profile',
    templateUrl: './view-profile.component.html',
    styleUrls: ['./view-profile.component.scss'],
    standalone: false
})
export class ViewProfileComponent implements OnInit{
  user: User
  completionPercentage: number;
  unfilledFields: string[] = []

  // Pagination properties
  paginatedContributions: Contribution[] = []
  filteredContributions: Contribution[] = []
  totalLength = 0
  pageSize = 10
  currentPage = 1
  totalPages = 0

  constructor(private authService: AuthService, private collectionService: CollectionService) {}
  ngOnInit(): void {
      this.authService.user().subscribe(user => {
        this.user = user;
        this.completionPercentage = this.getProfileCompletionPercentage();
        this.unfilledFields = this.getUnfilledFields();
      });
      this.collectionService.getUserContributions().subscribe(contributions => {
        this.applyFilter(contributions);
      });
  }

  applyFilter(contributions: Contribution[]) {
    this.filteredContributions = [...contributions].sort((a, b) =>
      new Date(b.contribution_date).getTime() - new Date(a.contribution_date).getTime()
    );
    this.totalLength = this.filteredContributions.length;
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.totalLength / this.pageSize);
    this.updatePaginatedContributions();
  }

  updatePaginatedContributions() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedContributions = this.filteredContributions.slice(startIndex, endIndex);
  }

  onPageChange(page: number | string) {
    if (typeof page !== 'number' || page < 1 || page > this.totalPages || page === this.currentPage) {
      return;
    }
    this.currentPage = page;
    this.updatePaginatedContributions();
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

  getProfileCompletionPercentage(): number {
    const totalFields = 11;
    const filledFields = [
      'first_name',
      'middle_name',
      'last_name',
      'email',
      'phone_number',
      'date_of_birth',
      'gender',
      'roles',
      'prayercell',
      'membership_type',
      'population_group'
    ]
      .map(field => this.user[field as keyof User])
      .filter(value => {
        if (Array.isArray(value)) return value.length > 0;
        return value && value !== '';
      }).length;

    return Math.round((filledFields / totalFields) * 100);
  }

  getUnfilledFields(): string[] {
    const fields: Record<string, string> = {
      first_name: "First Name",
      middle_name: "Middle Name",
      last_name: "Last Name",
      email: "Email Address",
      phone_number: "Phone Number",
      date_of_birth: "Date of Birth",
      gender: "Gender",
      roles: "Role",
      prayercell: "Prayercell",
      membership_type: "Membership",
      population_group: "Population Group"
    };

    return Object.keys(fields).filter(field => {
      const value = this.user[field as keyof User];
      if (Array.isArray(value)) return value.length === 0;
      return !value;
    }).map(field => fields[field]);
  }
}
