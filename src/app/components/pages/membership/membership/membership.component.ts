import { Component } from '@angular/core';
import { Membership } from 'src/app/shared/models/membership';
import { MembershipTypeService } from 'src/app/shared/services/membership-type.service';

@Component({
    selector: 'app-membership',
    templateUrl: './membership.component.html',
    styleUrls: ['./membership.component.scss'],
    standalone: false
})
export class MembershipComponent  {
  memberships: Membership[] = [] 
  isLoading: boolean = true

  constructor(public membershipTypeService: MembershipTypeService) {} 

  ngOnInit(): void {
    this.membershipTypeService.getAll().subscribe((data: Membership[]) => {
      this.memberships = data; 
      this.isLoading = false
      
    })
  }
}
