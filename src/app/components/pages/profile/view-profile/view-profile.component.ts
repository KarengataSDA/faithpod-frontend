import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Contribution } from '../../../../shared/models/collection';

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

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
      this.authService.user().subscribe(
        (user) => {
          this.user = user;
          this.completionPercentage = this.getProfileCompletionPercentage()
          this.unfilledFields = this.getUnfilledFields();
        }
      )
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
      'role',
      'prayercell',
      'membershiptype',
      'population_group'
    ] 
      .map(field => this.user[field as keyof User])
      .filter(value=> value && value !== '').length
    
      return Math.round((filledFields / totalFields) * 100);
  }

  getUnfilledFields(): string[] {
    const fields = {
     first_name: "First Name", 
      middle_name: "Middle Name",  
      last_name: "Last Name",
      email: "Email Address",
      phone_number: "Phone Number",
      date_of_birth: "Date of Birth",
      gender: "Gender",
      role: "Role",
      prayercell: "Prayercell",
      membershiptype: "Membership",
      population_group: "Population Group"
    }

    return Object.keys(fields).filter(field => !this.user[field as keyof User]).map(field => fields[field as keyof typeof fields])
  }

  getRowspan(contributions: Contribution[], date: string): number {
    return contributions.filter(contribution => contribution.contribution_date === date).length
  }
}
