import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MemberService } from '../../../../shared/services/member.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { normalizePhoneNumber, phoneNumberValidator } from 'src/app/shared/utils/phone.utils';

@Component({
    selector: 'app-create-member',
    templateUrl: './create-member.component.html',
    styleUrls: ['./create-member.component.scss'],
    standalone: false
})
export class CreateMemberComponent implements OnInit {
  form: FormGroup;
  isSubmitting = false;

  constructor(
    private formBuilder: FormBuilder,
    private memberService: MemberService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      first_name:   ['', Validators.required],
      middle_name:  [''],
      last_name:    ['', Validators.required],
      email:        ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, phoneNumberValidator()]],
    });
  }

  submit() {
    if (this.form.invalid || this.isSubmitting) return;

    this.isSubmitting = true;
    const formData = { ...this.form.value };
    formData.phone_number = normalizePhoneNumber(formData.phone_number);

    this.memberService.create(formData).subscribe({
      next: () => {
        this.isSubmitting = false;
        Swal.fire({
          icon: 'success',
          title: 'Invitation Sent',
          text: 'An invite email has been sent to the member.',
          confirmButtonText: 'OK',
        }).then(() => this.router.navigateByUrl('pages/members'));
      },
      error: (err) => {
        this.isSubmitting = false;
        const message = err?.error?.message || 'Failed to send invitation. Please try again.';
        Swal.fire({ icon: 'error', title: 'Error', text: message });
      },
    });
  }
}
