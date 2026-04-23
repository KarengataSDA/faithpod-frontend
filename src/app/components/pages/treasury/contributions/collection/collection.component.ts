import { Component, OnInit } from '@angular/core';
import { Collection } from '../../../../../shared/models/collection';
import { CollectionService } from '../../../../../shared/services/collection.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
    selector: 'app-collection',
    templateUrl: './collection.component.html',
    styleUrls: ['./collection.component.scss'],
    standalone: false
})
export class CollectionComponent implements OnInit {
  collections: Collection[] = [];
  total: number;
  isLoading: boolean = true

  paginatedCollections: Collection[] = [] 

  currentPage = 1;
  pageSize = 20;
  totalLength = 0;
  totalPages = 0;

  constructor(public collectionService: CollectionService, public authService: AuthService) {}

  ngOnInit(): void {
    this.collectionService.getAll().subscribe((data: Collection[]) => {
      this.collections = data;
      this.totalLength = data.length; 
      this.totalPages = Math.ceil(this.totalLength / this.pageSize);
      this.currentPage = 1; 
      this.updatePaginatedCollections();
      this.isLoading = false
   
    });
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
    this.updatePaginatedCollections();
  }

   updatePaginatedCollections(): void {
     if (this.currentPage < 1) this.currentPage = 1;
    if (this.currentPage > this.totalPages) this.currentPage = this.totalPages || 1;

    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    
    this.paginatedCollections = this.collections.slice(startIndex, endIndex);
  }
}
