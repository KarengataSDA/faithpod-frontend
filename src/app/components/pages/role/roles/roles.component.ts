import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Role } from 'src/app/shared/models/role';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RoleService } from 'src/app/shared/services/role.service';

@Component({
    selector: 'app-roles',
    templateUrl: './roles.component.html',
    styleUrls: ['./roles.component.scss'],
    standalone: false
})
export class RolesComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  roles: Role[] = [];
  isLoading: boolean = true

  constructor(public rolesService: RoleService, public authService: AuthService) {}

  ngOnInit(): void {
    this.rolesService.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: Role[]) => {
        this.roles = data;
        this.isLoading = false

      });
  }

  deleteRole(id: number) {
    if (confirm('are you sure you want to delete this record?')) {
      this.rolesService.delete(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(() => {
          this.roles = this.roles.filter((item) => item.id !== id);

        });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
