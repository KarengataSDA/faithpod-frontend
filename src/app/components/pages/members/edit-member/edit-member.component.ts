import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from 'src/app/shared/services/member.service';
import { RoleService } from 'src/app/shared/services/role.service';
import Swal from 'sweetalert2';
import { PrayercellService } from 'src/app/shared/services/prayercell.service';
import { PopulationGroupService } from 'src/app/shared/services/population-group.service';
import { catchError, of, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Role } from 'src/app/shared/models/role';
import { PopulationGroup } from 'src/app/shared/models/population-group';
import { Prayercell } from 'src/app/shared/models/prayercell';
import { Membership } from 'src/app/shared/models/membership';
import { MembershipTypeService } from 'src/app/shared/services/membership-type.service';
import { LoggerService } from 'src/app/shared/services/logger.service';

@Component({
    selector: 'app-edit-member',
    templateUrl: './edit-member.component.html',
    styleUrls: ['./edit-member.component.scss'],
    standalone: false
})
export class EditMemberComponent implements OnInit, OnDestroy {
  form: FormGroup;
  roles: Role[] = [];
  id: number;
  groups: PopulationGroup[] = [];
  prayercells: Prayercell[] = [];
  membershiptypes: Membership[] = []

  private destroy$ = new Subject<void>();

  constructor(
    private formBuilder: FormBuilder,
    private memberService: MemberService,
    private roleService: RoleService,
    private prayercellService: PrayercellService,
    private populationGroupService: PopulationGroupService,
    private membershiptypeService: MembershipTypeService,
    private router: Router,
    private route: ActivatedRoute,
    private logger: LoggerService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      first_name: '',
      middle_name: '',
      last_name: '',
      email: '',
      phone_number: '',
      membership_number: '',
      membership_type_id: '',
      role_id: '',
      prayercell_id: '',
      population_group_id: ''
    });

    this.roleService.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe((roles) => (this.roles = roles));

    this.prayercellService.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe(prayercells => this.prayercells = prayercells);

    this.populationGroupService.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe(groups => this.groups = groups);

    this.membershiptypeService.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe(membershiptypes => this.membershiptypes = membershiptypes);

    this.id = this.route.snapshot.params.id;

    this.memberService.getUser(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((member) => {
        this.form.patchValue({
          first_name: member.first_name,
          middle_name: member.middle_name,
          last_name: member.last_name,
          email: member.email,
          phone_number: member.phone_number,
          membership_number: member.membership_number,
          membership_type_id: member.membershiptype.id,
          role_id: member.role.id,
          population_group_id: member.population_group ? member.population_group.id : null,
          prayercell_id: member.prayercell ? member.prayercell.id : null

        });
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  submit() {
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
  
    if (this.form.valid) {

      this.memberService.update(this.id, this.form.getRawValue())
        .pipe(
          takeUntil(this.destroy$),
          catchError((error) => {
            this.logger.error('Error updating member', error);

            Toast.fire({
              icon: 'error',
              title: 'Failed to update member',
              text: error.error?.message || 'Something went wrong. Please try again later.',
            });

            return of(null);
          })
        )
        .subscribe((response) => {
          if (response) {
            this.form.reset();

            Toast.fire({
              icon: 'success',
              title: 'Member Updated Successfully',
            });

            this.router.navigateByUrl('pages/members');
          }
        });
    }
  }
}
