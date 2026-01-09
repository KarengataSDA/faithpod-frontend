import { Component, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RoleService } from 'src/app/shared/services/role.service';
import { Permission } from '../permission';
import { PermissionService } from 'src/app/shared/services/permission.service';

@Component({
    selector: 'app-create-role',
    templateUrl: './create-role.component.html',
    styleUrls: ['./create-role.component.scss'],
    standalone: false
})
export class CreateRoleComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  form: FormGroup
  permissions: Permission[] = []

  constructor(
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private permissionService: PermissionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      permissions: this.formBuilder.array([])
    })

    this.permissionService.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        permissions => {this.permissions = permissions;
          this.permissions.forEach(p => {
            this.permissionArray.push(
            this.formBuilder.group({
              value: false,
              id:p.id
            })
          )
          })
        }

      )
  }

  get permissionArray(): FormArray {
    return this.form.get('permissions') as FormArray;
  }

  submit() {
    const formData = this.form.getRawValue();

    const data = {
      name: formData.name,
      permissions: formData.permissions.filter(p => p.value === true).map(p=> p.id)
    }

    this.roleService.create(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {

        this.router.navigateByUrl('/pages/roles')
      })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
