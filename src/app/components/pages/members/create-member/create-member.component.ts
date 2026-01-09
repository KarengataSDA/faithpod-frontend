import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MemberService } from '../../../../shared/services/member.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RoleService } from 'src/app/shared/services/role.service';
import { PrayercellService } from 'src/app/shared/services/prayercell.service';
import { PopulationGroupService } from 'src/app/shared/services/population-group.service';
import { Role } from 'src/app/shared/models/role';
import { PopulationGroup } from 'src/app/shared/models/population-group';
import { Prayercell } from 'src/app/shared/models/prayercell';
import { MembershipTypeService } from 'src/app/shared/services/membership-type.service';
import { Membership } from 'src/app/shared/models/membership';

@Component({
    selector: 'app-create-member',
    templateUrl: './create-member.component.html',
    styleUrls: ['./create-member.component.scss'],
    standalone: false
})
export class CreateMemberComponent implements OnInit {
  form: FormGroup;
  roles: Role[] = [];
  membershiptypes: Membership[] = [];
  groups: PopulationGroup[] = [];
  prayercells: Prayercell[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private memberService: MemberService,
    private roleService: RoleService,
    private prayercellService: PrayercellService,
    private populationGroupService: PopulationGroupService,
    private membershipTypeService: MembershipTypeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form =  this.formBuilder.group({
      first_name: '',
      middle_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      membership_number: '',
      membership_type_id: '',
      role_id: '',
      population_group_id: '',
      prayercell_id: ''
    });

    this.roleService.getAll().subscribe(
      roles => this.roles = roles 
    )

    this.prayercellService.getAll().subscribe(
      prayercells => this.prayercells = prayercells
    )

    this.populationGroupService.getAll().subscribe(
      groups => this.groups = groups
    )

    this.membershipTypeService.getAll().subscribe(
      membershiptypes => this.membershiptypes = membershiptypes
    )
    
  }

  submit() {
    this.memberService.create(this.form.value).subscribe(res => {
      this.form.reset() 
      Toast.fire({
        icon: 'success',
        title: 'Member added Successfully'
      });

     this.router.navigateByUrl('pages/members');

    })

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
  
  }
  
}
