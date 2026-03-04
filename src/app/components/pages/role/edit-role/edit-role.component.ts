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

    // Subscribe to route params to handle navigation between different roles
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        this.id = params.id;
        this.loadRoleData();
      });
  }

  loadRoleData(): void {
    // Load permissions and role data together to avoid race condition
    // Force refresh to ensure we always get the latest data
    forkJoin({
      permissions: this.permissionService.getAll(),
      role: this.roleService.get(this.id, true) // Force refresh
    })
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: ({ permissions, role }) => {
          this.permissions = permissions;

          // Clear existing permissions array before rebuilding
          this.permissionsArray.clear();

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
        },
        error: (err) => {
          console.error('Failed to load role data:', err);
        }
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

    // Build data object dynamically - only include fields that are provided
    const data: any = {};

    // Include name if it's provided and not empty
    if (formData.name && formData.name.trim() !== '') {
      data.name = formData.name;
    }

    // Include permissions - always send the selected permissions
    data.permissions = formData.permissions.filter(p => p.value === true).map(p => p.id);

    this.roleService.update(this.id, data)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          Toast.fire({
            icon: 'success',
            title: 'Role updated successfully'
          });
          this.router.navigateByUrl('/pages/roles');
        },
        error: (err) => {
          Toast.fire({
            icon: 'error',
            title: 'Failed to update role'
          });
          console.error('Error updating role:', err);
        }
      });
  }

  /**
   * Update only permissions without changing the role name
   */
  updatePermissionsOnly(): void {
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
    const permissionIds = formData.permissions.filter(p => p.value === true).map(p => p.id);

    this.roleService.assignPermissions(this.id, permissionIds)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          Toast.fire({
            icon: 'success',
            title: 'Permissions updated successfully'
          });
          this.router.navigateByUrl('/pages/roles');
        },
        error: (err) => {
          Toast.fire({
            icon: 'error',
            title: 'Failed to update permissions'
          });
          console.error('Error updating permissions:', err);
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
