import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ContributionCategoryService } from 'src/app/shared/services/contribution-category.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-create-category',
    templateUrl: './create-category.component.html',
    styleUrls: ['./create-category.component.scss'],
    standalone: false
})
export class CreateCategoryComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  form: FormGroup

  constructor(
    public contributionCategoryService: ContributionCategoryService,
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
    this.contributionCategoryService.create(this.form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {

        this.form.reset()
        Toast.fire({
          icon: 'success',
          title: 'Category added Successfully'
        })
        this.router.navigateByUrl('/pages/treasury/collection-categories')
      })

    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
