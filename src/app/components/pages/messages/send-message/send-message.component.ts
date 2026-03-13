import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RecipientOptions, SendMessageRequest } from 'src/app/shared/models/message';
import { MessageService } from 'src/app/shared/services/message.service';
import { MemberService } from 'src/app/shared/services/member.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrl: './send-message.component.scss',
  standalone: false,
})
export class SendMessageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  form: FormGroup;
  isLoading: boolean = true;
  isSubmitting: boolean = false;

  recipientOptions: RecipientOptions | null = null;
  members: any[] = [];

  channels = [
    { value: 'sms', label: 'SMS Only' },
    { value: 'email', label: 'Email Only' },
    { value: 'both', label: 'Both SMS & Email' }
  ];

  recipientTypes = [
    { value: 'all', label: 'All Members' },
    { value: 'group', label: 'Specific Group(s)' },
    { value: 'prayercell', label: 'Specific Prayer Cell(s)' },
    { value: 'individual', label: 'Individual Member(s)' }
  ];

  constructor(
    private fb: FormBuilder,
    private messageService: MessageService,
    private memberService: MemberService,
    private router: Router
  ) {
    this.form = this.fb.group({
      subject: [''],
      message: ['', [Validators.required, Validators.minLength(10)]],
      channel: ['both', Validators.required],
      recipient_type: ['all', Validators.required],
      recipient_ids: [[]]
    });
  }

  ngOnInit(): void {
    this.loadRecipientOptions();
    this.loadMembers();
    this.setupFormListeners();
  }

  loadRecipientOptions(): void {
    this.messageService.getRecipientOptions()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          this.recipientOptions = data;
          this.isLoading = false;
        },
        error: () => {
          this.isLoading = false;
        }
      });
  }

  loadMembers(): void {
    this.memberService.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: any[]) => {
          this.members = data.map(m => ({
            id: m.id,
            name: `${m.first_name} ${m.last_name}`,
            email: m.email,
            phone: m.phone_number
          }));
        }
      });
  }

  setupFormListeners(): void {
    this.form.get('channel')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(channel => {
        const subjectControl = this.form.get('subject');
        if (channel === 'email' || channel === 'both') {
          subjectControl?.setValidators([Validators.required, Validators.maxLength(255)]);
        } else {
          subjectControl?.clearValidators();
        }
        subjectControl?.updateValueAndValidity();
      });

    this.form.get('recipient_type')?.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(type => {
        const recipientIdsControl = this.form.get('recipient_ids');
        if (type === 'all') {
          recipientIdsControl?.clearValidators();
          recipientIdsControl?.setValue([]);
        } else {
          recipientIdsControl?.setValidators(Validators.required);
        }
        recipientIdsControl?.updateValueAndValidity();
      });
  }

  get messageLength(): number {
    return this.form.get('message')?.value?.length || 0;
  }

  get smsSegments(): number {
    const length = this.messageLength;
    if (length <= 160) return 1;
    return Math.ceil(length / 153);
  }

  get showSubjectField(): boolean {
    const channel = this.form.get('channel')?.value;
    return channel === 'email' || channel === 'both';
  }

  get showRecipientSelector(): boolean {
    return this.form.get('recipient_type')?.value !== 'all';
  }

  get currentRecipientType(): string {
    return this.form.get('recipient_type')?.value;
  }

  get recipientSelectorItems(): any[] {
    const type = this.currentRecipientType;
    if (type === 'group') {
      return this.recipientOptions?.groups || [];
    } else if (type === 'prayercell') {
      return this.recipientOptions?.prayercells || [];
    } else if (type === 'individual') {
      return this.members;
    }
    return [];
  }

  onSubmit(): void {
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;

    const formValue = this.form.value;
    const request: SendMessageRequest = {
      message: formValue.message,
      channel: formValue.channel,
      recipient_type: formValue.recipient_type
    };

    if (this.showSubjectField && formValue.subject) {
      request.subject = formValue.subject;
    }

    if (formValue.recipient_type !== 'all' && formValue.recipient_ids?.length > 0) {
      request.recipient_ids = formValue.recipient_ids;
    }

    this.messageService.send(request)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          this.isSubmitting = false;
          const total = response.results.successful_sms + response.results.successful_emails;
          Toast.fire({
            icon: 'success',
            title: 'Message Sent Successfully',
            text: `Delivered to ${total} recipient(s)`
          });
          this.router.navigate(['/pages/messages']);
        },
        error: (error) => {
          this.isSubmitting = false;
          Toast.fire({
            icon: 'error',
            title: 'Failed to send message',
            text: error.error?.message || 'Something went wrong. Please try again later.',
          });
        }
      });
  }

  onDiscard(): void {
    this.router.navigate(['/pages/messages']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
