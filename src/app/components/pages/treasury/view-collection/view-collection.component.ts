import { Component, OnInit } from '@angular/core';
import { Collection, Contribution } from '../../../../shared/models/collection';
import { CollectionService } from 'src/app/shared/services/collection.service';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { Auth } from 'src/app/components/classes/auth';

@Component({
    selector: 'app-view-collection',
    templateUrl: './view-collection.component.html',
    styleUrls: ['./view-collection.component.scss'],
    standalone: false
})
export class ViewCollectionComponent implements OnInit {
  date: string
  collection: Collection 
  collections: Contribution[] = [];
  user: User

  constructor(
    private collectionService: CollectionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
      this.date = this.route.snapshot.params['date'];

      this.collectionService.find(this.date).subscribe((data: Collection)=> {
        this.collection = data
      })

      Auth.userEmitter.subscribe(user=> this.user = user)
  }

  getRowspan(contributions: Contribution[], name: string): number {
    return contributions.filter(contribution => contribution.user.first_name == name).length
  }

  sendMail(id) {
    this.collectionService.sendMail(id).subscribe((res) => {
      id = this.collections.find((item) => item.id == id)?.id;
      window.location.reload();
  
    });
  }

}
