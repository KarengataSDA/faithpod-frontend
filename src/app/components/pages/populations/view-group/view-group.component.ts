import { Component, OnInit } from '@angular/core';
import { PopulationGroupService } from 'src/app/shared/services/population-group.service';
import { ActivatedRoute } from '@angular/router';
import { Member } from 'src/app/shared/models/member';
import { PopulationGroup } from 'src/app/shared/models/population-group';

@Component({
    selector: 'app-view-group',
    templateUrl: './view-group.component.html',
    styleUrls: ['./view-group.component.scss'],
    standalone: false
})
export class ViewGroupComponent implements OnInit {
  id: number;
  group: PopulationGroup
  members: Member[] = []

  constructor(
    private populationGroupService: PopulationGroupService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
      this.id = this.route.snapshot.params['groupId'];

      this.populationGroupService.find(this.id).subscribe((data: PopulationGroup) => {
        this.group = data; 
        this.members = data.users || []; 
      })
  }

}
