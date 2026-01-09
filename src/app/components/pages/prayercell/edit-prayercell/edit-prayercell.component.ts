import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PrayercellService } from 'src/app/shared/services/prayercell.service';

@Component({
    selector: 'app-edit-prayercell',
    templateUrl: './edit-prayercell.component.html',
    styleUrls: ['./edit-prayercell.component.scss'],
    standalone: false
})
export class EditPrayercellComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  form: FormGroup;
  id: number;

  constructor(
    private formBuilder: FormBuilder,
    public prayercellService: PrayercellService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
    });

    this.id = this.route.snapshot.params.id;


    this.prayercellService.find(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((prayercell) => {
        this.form.patchValue({
          name: prayercell.name
        });
      });
  }

  submit() {
    this.prayercellService.update(this.id, this.form.getRawValue())
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {

        this.router.navigateByUrl('/pages/prayercells');
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
