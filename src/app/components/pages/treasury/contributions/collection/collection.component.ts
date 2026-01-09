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

  constructor(public collectionService: CollectionService, public authService: AuthService) {}

  ngOnInit(): void {
    this.collectionService.getAll().subscribe((data: Collection[]) => {
    // setTimeout(() => {
      this.collections = data;
      this.isLoading = false
    // }, 5000)
    });
  }

  sendMail(id) {
    this.collectionService.sendMail(id).subscribe((res) => {
      id = this.collections.find((item) => item.id == id)?.id;
      window.location.reload();
    
    });
  }

  deleteContribution(id: any) {
    this.collectionService.delete(id).subscribe((res) => {
      this.collections = this.collections.filter((item) => item.id !== id);
     
    });
  }
}
