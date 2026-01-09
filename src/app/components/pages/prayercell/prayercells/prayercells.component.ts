import { Component, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PrayercellService } from '../../../../shared/services/prayercell.service';
import { Prayercell } from 'src/app/shared/models/prayercell';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
    selector: 'app-prayercells',
    templateUrl: './prayercells.component.html',
    styleUrls: ['./prayercells.component.scss'],
    standalone: false
})
export class PrayercellsComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  prayercells: Prayercell[] = [];
  isLoading: boolean = true;

  constructor(public prayercellService: PrayercellService, public authService: AuthService) {}

  ngOnInit(): void {
    this.prayercellService.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: Prayercell[]) => {
        this.prayercells = data;
        this.isLoading = false;
        // setTimeout(() => {
        // this.prayercells = data;
        // this.loading = false;
        //  }, 9000)

      });
  }

  deletePrayercell(id: any) {
    if (confirm('are you sure you want to delete this record?')) {
      this.prayercellService.delete(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe((res) => {
          this.prayercells = this.prayercells.filter((item) => item.id !== id);

        });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
