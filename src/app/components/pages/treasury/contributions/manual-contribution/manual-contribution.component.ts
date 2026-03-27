import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Member } from 'src/app/shared/models/member';
import { ContributionCategory } from 'src/app/shared/models/collection';
import { MemberService } from 'src/app/shared/services/member.service';
import { CollectionService } from 'src/app/shared/services/collection.service';
import { ContributionCategoryService } from 'src/app/shared/services/contribution-category.service';

@Component({
  selector: 'app-manual-contribution',
  templateUrl: './manual-contribution.component.html',
  styleUrls: ['./manual-contribution.component.scss'],
  standalone: false,
})
export class ManualContributionComponent implements OnInit {
  form: FormGroup;
  members: Member[] = [];
  categories: ContributionCategory[] = [];

  /** Toggle: true = search existing member; false = enter manually */
  isSystemMember = true;

  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    public router: Router,
    private memberService: MemberService,
    private collectionService: CollectionService,
    private contributionCategoryService: ContributionCategoryService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      // System member (used when isSystemMember = true)
      member_id: [null],

      // Walk-in contributor fields (used when isSystemMember = false)
      contributor_name:  [''],
      contributor_phone: [''],
      contributor_email: ['', [Validators.email]],

      contribution_date: ['', Validators.required],
      notes: [''],

      contributions: this.fb.array([]),
    });

    this.memberService.getAll().subscribe((data: Member[]) => {
      this.members = data;
    });

    this.contributionCategoryService.getAll().subscribe((data: ContributionCategory[]) => {
      this.categories = data.filter(c => c.archived === false);
    });

    this.addContributionRow();
  }

  get contributions(): FormArray {
    return this.form.get('contributions') as FormArray;
  }

  addContributionRow(): void {
    this.contributions.push(
      this.fb.group({
        contributiontype_id: ['', Validators.required],
        contribution_amount: ['', [Validators.required, Validators.min(0.01)]],
      })
    );
  }

  removeContributionRow(index: number): void {
    this.contributions.removeAt(index);
  }

  toggleContributorType(isMember: boolean): void {
    this.isSystemMember = isMember;
    // Reset both sides when switching
    this.form.patchValue({
      member_id: null,
      contributor_name: '',
      contributor_phone: '',
      contributor_email: '',
    });
  }

  /** Validate that either member_id or contributor_name is filled */
  private isContributorValid(): boolean {
    if (this.isSystemMember) {
      return !!this.form.value.member_id;
    }
    return !!this.form.value.contributor_name?.trim();
  }

  private buildPayload() {
    const v = this.form.value;
    return {
      member_id:         this.isSystemMember ? v.member_id : null,
      contributor_name:  this.isSystemMember ? null : v.contributor_name || null,
      contributor_phone: this.isSystemMember ? null : v.contributor_phone || null,
      contributor_email: this.isSystemMember ? null : v.contributor_email || null,
      contribution_date: v.contribution_date,
      notes:             v.notes || null,
      contributions: v.contributions.map((c: any) => ({
        contributiontype_id: Number(c.contributiontype_id),
        contribution_amount: parseFloat(c.contribution_amount),
      })),
    };
  }

  private getDisplayName(): string {
    if (this.isSystemMember) {
      const m = this.members.find(x => x.id === this.form.value.member_id);
      return m ? `${m.first_name} ${m.last_name}` : '—';
    }
    return this.form.value.contributor_name || '—';
  }

  submit(): void {
    if (!this.form.valid || !this.isContributorValid()) {
      this.form.markAllAsTouched();
      if (!this.isContributorValid()) {
        Swal.fire('Missing Info', this.isSystemMember
          ? 'Please select a member.'
          : 'Please enter the contributor\'s name.', 'warning');
      }
      return;
    }

    const v = this.form.value;
    const total = v.contributions.reduce(
      (sum: number, c: any) => sum + parseFloat(c.contribution_amount || 0), 0
    );
    const lines = v.contributions
      .map((c: any) =>
        `<li><strong>${this.categories.find(x => x.id == c.contributiontype_id)?.name ?? c.contributiontype_id}</strong>: KES ${parseFloat(c.contribution_amount).toLocaleString('en-KE', { minimumFractionDigits: 2 })}</li>`
      )
      .join('');

    Swal.fire({
      title: 'Confirm Manual Contribution',
      html: `
        <p><strong>Contributor:</strong> ${this.getDisplayName()}</p>
        <p><strong>Date:</strong> ${v.contribution_date}</p>
        <ul style="text-align:left">${lines}</ul>
        <p><strong>Total: KES ${total.toLocaleString('en-KE', { minimumFractionDigits: 2 })}</strong></p>
        ${v.notes ? `<p><em>Notes: ${v.notes}</em></p>` : ''}
      `,
      showCancelButton: true,
      confirmButtonColor: '#175351',
      confirmButtonText: 'Record Contribution',
      customClass: { title: 'swal2-title-small' },
    }).then(result => {
      if (result.isConfirmed) {
        this.saveContribution();
      }
    });
  }

  private saveContribution(): void {
    this.isSubmitting = true;
    const payload = this.buildPayload();

    this.collectionService.storeManual(payload).subscribe({
      next: () => {
        this.isSubmitting = false;
        Swal.fire({
          icon: 'success',
          title: 'Recorded!',
          text: 'Contribution has been saved. Acknowledgment sent if contact details were provided.',
          confirmButtonColor: '#175351',
        }).then(() => this.router.navigateByUrl('/pages/treasury/all-collections'));
      },
      error: err => {
        this.isSubmitting = false;
        const msg = err?.error?.message || 'Something went wrong. Please try again.';
        Swal.fire('Error', msg, 'error');
      },
    });
  }
}
