import { Component, OnDestroy } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Permission } from '../permission';
import { PermissionService } from 'src/app/shared/services/permission.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from 'src/app/shared/services/role.service';
import { Role } from '../role';

@Component({
    selector: 'app-edit-role',
    templateUrl: './edit-role.component.html',
    styleUrls: ['./edit-role.component.scss'],
    standalone: false
})
export class EditRoleComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  form: FormGroup;
  permissions: Permission[] = [];
  id: number;

  constructor(
    private formBuilder: FormBuilder,
    private roleService: RoleService,
    private permissionService: PermissionService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      permissions: this.formBuilder.array([]),
    });

    this.permissionService.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe((permissions) => {
        this.permissions = permissions;
        this.permissions.forEach((p) => {
          this.permissionsArray.push(
            this.formBuilder.group({
              value: false,
              id: p.id,
            })
          );
        });
      });

    this.id = this.route.snapshot.params.id;

    this.roleService.get(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (role: Role) => {

        const values = this.permissions.map(
            p => {
          return {
           value: role.permissions?.some((r) => r.id === p.id),

            id: p.id,
          };
        }
      );
        this.form.patchValue({
          name: role.name,
          permissions: values,
        });

      });
  }

  get permissionsArray(): FormArray {
    return this.form.get('permissions') as FormArray;
  }

  submit(): void {
    const formData = this.form.getRawValue();

    const data = {
      name: formData.name,
      permissions: formData.permissions.filter(p => p.value === true).map(p=> p.id)
    }
    this.roleService.update(this.id, data)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.router.navigateByUrl('/pages/roles'))
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
