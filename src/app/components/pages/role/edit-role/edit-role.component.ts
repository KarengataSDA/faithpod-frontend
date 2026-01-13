import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { forkJoin, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Permission } from '../permission';
import { PermissionService } from 'src/app/shared/services/permission.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RoleService } from 'src/app/shared/services/role.service';
import { Role } from '../role';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-edit-role',
    templateUrl: './edit-role.component.html',
    styleUrls: ['./edit-role.component.scss'],
    standalone: false
})
export class EditRoleComponent implements OnInit, OnDestroy {
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

    this.id = this.route.snapshot.params.id;

    // Load permissions and role data together to avoid race condition
    forkJoin({
      permissions: this.permissionService.getAll(),
      role: this.roleService.get(this.id)
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe(({ permissions, role }) => {
        this.permissions = permissions;

        // Build the permissions form array with checked state based on role's permissions
        this.permissions.forEach((p) => {
          const hasPermission = role.permissions?.some((r) => r.id === p.id) || false;
          this.permissionsArray.push(
            this.formBuilder.group({
              value: hasPermission,
              id: p.id,
            })
          );
        });

        // Set the role name
        this.form.patchValue({
          name: role.name,
        });
      });
  }

  get permissionsArray(): FormArray {
    return this.form.get('permissions') as FormArray;
  }

  submit(): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });

    const formData = this.form.getRawValue();

    const data = {
      name: formData.name,
      permissions: formData.permissions.filter(p => p.value === true).map(p=> p.id)
    }

    this.roleService.update(this.id, data)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          Toast.fire({
            icon: 'success',
            title: 'Role permissions updated successfully'
          });
          this.router.navigateByUrl('/pages/roles');
        },
        error: (err) => {
          Toast.fire({
            icon: 'error',
            title: 'Failed to update role permissions'
          });
          console.error('Error updating role:', err);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
