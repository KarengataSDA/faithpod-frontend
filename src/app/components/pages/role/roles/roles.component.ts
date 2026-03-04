import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Role } from 'src/app/shared/models/role';
import { AuthService } from 'src/app/shared/services/auth.service';
import { RoleService } from 'src/app/shared/services/role.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
    selector: 'app-roles',
    templateUrl: './roles.component.html',
    styleUrls: ['./roles.component.scss'],
    standalone: false
})
export class RolesComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  roles: Role[] = [];
  isLoading: boolean = true

  constructor(
    public rolesService: RoleService,
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Load roles initially
    this.loadRoles();

    // Reload roles when navigating back to this route (force refresh to bypass cache)
    this.router.events
      .pipe(
        filter(event => event instanceof NavigationEnd),
        filter((event: NavigationEnd) => event.url.includes('/pages/roles')),
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
        // Force refresh when navigating back to ensure we see updated data
        this.loadRoles(true);
      });
  }

  loadRoles(forceRefresh: boolean = false): void {
    this.isLoading = true;
    this.rolesService.getAll(forceRefresh)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: Role[]) => {
          this.roles = data;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
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
