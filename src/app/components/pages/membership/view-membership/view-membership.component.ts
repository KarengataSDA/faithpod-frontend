import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/app/shared/services/member.service';
import { ActivatedRoute } from '@angular/router';
import { MembershipTypeService } from 'src/app/shared/services/membership-type.service';
import { Membership } from 'src/app/shared/models/membership';
import { Member } from 'src/app/shared/models/member';

@Component({
    selector: 'app-view-membership',
    templateUrl: './view-membership.component.html',
    styleUrls: ['./view-membership.component.scss'],
    standalone: false
})
export class ViewMembershipComponent implements OnInit {
id: number;
membership: Membership;
members: Member[] = [];

constructor(
  private membershipTypeService: MembershipTypeService,
  private route: ActivatedRoute
) {}

  ngOnInit(): void {
     this.id = this.route.snapshot.params['id'];

     this.membershipTypeService.find(this.id).subscribe((data: Membership) => {
        this.membership = data;
        this.members = data.members || [];
     })
  }
}
