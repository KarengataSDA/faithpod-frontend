import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PopulationGroupService } from 'src/app/shared/services/population-group.service';

@Component({
    selector: 'app-edit-group',
    templateUrl: './edit-group.component.html',
    styleUrls: ['./edit-group.component.scss'],
    standalone: false
})
export class EditGroupComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  form: FormGroup;
  id: number;

  constructor(
    private formBuilder: FormBuilder,
    public populationGroupService: PopulationGroupService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
    });

    this.id = this.route.snapshot.params.id;


    this.populationGroupService.find(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((group) => {
        this.form.patchValue({
          name: group.name
        });
      });
  }

  submit() {
    this.populationGroupService.update(this.id, this.form.getRawValue())
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {

        this.router.navigateByUrl('/pages/groups');
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
