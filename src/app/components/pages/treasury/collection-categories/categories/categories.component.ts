import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ContributionCategory } from '../../../../../shared/models/collection';
import { CollectionService } from '../../../../../shared/services/collection.service';
import { ContributionCategoryService } from 'src/app/shared/services/contribution-category.service';
import Swal from 'sweetalert2';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
    selector: 'app-categories',
    templateUrl: './categories.component.html',
    styleUrls: ['./categories.component.scss'],
    standalone: false
})
export class CategoriesComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  contributionCategories: ContributionCategory[] = [];

  paginatedCategories: ContributionCategory[] = [];
  totalLength = 0;
  pageSize = 5;
  currentPage = 1;
  totalPages = 0;

  filteredCategories: ContributionCategory[] = [];
  searchTerm: string = '';
  isLoading: boolean = true;

  constructor(public contributionCategoryService: ContributionCategoryService, public authService: AuthService) {}

  ngOnInit(): void {
    this.contributionCategoryService.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ContributionCategory[])=> {
        this.contributionCategories = data;
        this.applyFilter();
        this.isLoading = false;
      })
  }

  applyFilter() {
    if(this.searchTerm) {
      this.filteredCategories = this.contributionCategories.filter(category =>
        category.name?.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
    } else {
      this.filteredCategories = this.contributionCategories;
    }

    this.totalLength = this.filteredCategories.length;
    this.totalPages = Math.ceil(this.totalLength / this.pageSize);
    this.updatePaginatedCategories();
  }

  updatePaginatedCategories() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedCategories = this.filteredCategories.slice(startIndex, endIndex);
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.updatePaginatedCategories();
  }

  onSearchChange(event: Event) {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.currentPage = 1;
    this.applyFilter();
  }

  deleteCategory(id: any) {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
          this.contributionCategoryService.delete(id)
            .pipe(takeUntil(this.destroy$))
            .subscribe((res) => {
              this.contributionCategories = this.contributionCategories.filter((item) => item.id !== id);
              this.applyFilter();
            });

          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
