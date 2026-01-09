import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ContributionCategoryService } from 'src/app/shared/services/contribution-category.service';

@Component({
    selector: 'app-edit-category',
    templateUrl: './edit-category.component.html',
    styleUrls: ['./edit-category.component.scss'],
    standalone: false
})
export class EditCategoryComponent implements OnDestroy {
  private destroy$ = new Subject<void>();
  form: FormGroup;
  id: number;

  constructor(
    private formBuilder: FormBuilder,
    public contributionCategoryService: ContributionCategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: '',
      archived: [false],
    });

    this.id = this.route.snapshot.params.id;


    this.contributionCategoryService.find(this.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe((category) => {
        this.form.patchValue({
          name: category.name,
          archived: category.archived
        });
      });
  }

  submit() {
    this.contributionCategoryService.update(this.id, this.form.getRawValue())
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {

        this.router.navigateByUrl('/pages/treasury/collection-categories');
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
