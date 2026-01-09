import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PopulationGroup } from 'src/app/shared/models/population-group';
import { AuthService } from 'src/app/shared/services/auth.service';

import { PopulationGroupService } from 'src/app/shared/services/population-group.service';

@Component({
    selector: 'app-groups',
    templateUrl: './groups.component.html',
    styleUrls: ['./groups.component.scss'],
    standalone: false
})
export class GroupsComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  groups: PopulationGroup[] = [];
  isLoading: boolean = true

  constructor(public populationGroupService: PopulationGroupService, public authService: AuthService) {}

  ngOnInit(): void {
    this.populationGroupService.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: PopulationGroup[]) => {
        this.groups = data;
        this.isLoading = false
      })
  }

  deleteGroup(id: any) {
    if (confirm('are you sure you want to delete this record?')) {
      this.populationGroupService.delete(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe(res => {
          this.groups = this.groups.filter((item) => item.id !== id);
        })
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
