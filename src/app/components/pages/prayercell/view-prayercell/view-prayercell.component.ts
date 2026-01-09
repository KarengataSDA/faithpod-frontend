import { Component, OnInit } from '@angular/core';
import { PrayercellService } from '../../../../shared/services/prayercell.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from 'src/app/shared/services/member.service';
import { Prayercell } from 'src/app/shared/models/prayercell';
import { Member } from 'src/app/shared/models/member';


@Component({
    selector: 'app-view-prayercell',
    templateUrl: './view-prayercell.component.html',
    styleUrls: ['./view-prayercell.component.scss'],
    standalone: false
})
export class ViewPrayercellComponent implements OnInit {
  id!: number;
  prayercell!: Prayercell;
  members: Member[] = [];

  constructor( 
    private prayercellService: PrayercellService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.params['prayercellId'];

    this.prayercellService.find(this.id).subscribe((data: Prayercell) => {
      this.prayercell = data;
      this.members = data.users || [];
    })

   // this.memberService.getAll().
  }
}
