import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PrayercellService } from '../../../../shared/services/prayercell.service';
import { Router } from '@angular/router';

@Component({
    selector: 'app-create-prayercell',
    templateUrl: './create-prayercell.component.html',
    styleUrls: ['./create-prayercell.component.scss'],
    standalone: false
})
export class CreatePrayercellComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  form: FormGroup 

  constructor(
    public prayercellService: PrayercellService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(''),
    })
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    this.prayercellService.create(this.form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        this.router.navigateByUrl('/pages/prayercells')
      })
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
