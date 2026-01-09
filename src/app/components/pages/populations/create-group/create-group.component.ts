import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { PopulationGroupService } from 'src/app/shared/services/population-group.service';
import Swal from 'sweetalert2';

@Component({
    selector: 'app-create-group',
    templateUrl: './create-group.component.html',
    styleUrls: ['./create-group.component.scss'],
    standalone: false
})
export class CreateGroupComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  form: FormGroup

  constructor( public populationGroupService: PopulationGroupService, private router: Router) {}

  ngOnInit(): void {
      this.form = new FormGroup({
        name: new FormControl('')
      })
  }

  get f() {
    return this.form.controls;
  }

  submit() {
    this.populationGroupService.create(this.form.value)
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {

        this.form.reset()
        Toast.fire({
          icon: 'success',
          title: 'Population Group Added Successfully'
        });
        this.router.navigateByUrl('/pages/groups')
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
