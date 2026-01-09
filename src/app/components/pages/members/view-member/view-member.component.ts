import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../../../shared/services/member.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CollectionService } from '../../../../shared/services/collection.service';
import { Member } from 'src/app/shared/models/member';
import { Collection, Contribution } from 'src/app/shared/models/collection';

@Component({
    selector: 'app-view-member',
    templateUrl: './view-member.component.html',
    styleUrls: ['./view-member.component.scss'],
    standalone: false
})
export class ViewMemberComponent implements OnInit{
  id!: number;
  member: Member;
  date: string;
  collection: Collection;

  

constructor (
  public memberService: MemberService,
  public collectionService: CollectionService,
  private route: ActivatedRoute,
  private router: Router
) {}

ngOnInit(): void {
  this.id = this.route.snapshot.params['memberId'];
  
  this.memberService.getUser(this.id).subscribe((data: Member) => {
    this.member = data;
  
  })

  var col_id = this.member?.contributions.find(item => item.id == this.id)?.id
  
}

getRowspan(contributions: Contribution[], date: string): number {
  return contributions.filter(contribution => contribution.contribution_date === date).length
}

sendMail(id) {
  this.collectionService.sendMail(id).subscribe(res => {
    id = this.member.contributions.find(item => item.id == id)?.id
    window.location.reload()
  
  })
}
}
