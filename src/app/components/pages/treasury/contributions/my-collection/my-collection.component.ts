import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Member } from '../../../../../shared/models/member';
import { ContributionCategory } from '../../../../../shared/models/collection';
import { MemberService } from 'src/app/shared/services/member.service';
import { CollectionService } from 'src/app/shared/services/collection.service';
import { ContributionCategoryService } from 'src/app/shared/services/contribution-category.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { User } from 'src/app/shared/models/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Auth } from 'src/app/components/classes/auth';
import { last, Subscription, switchMap, takeWhile, timer } from 'rxjs';

@Component({
    selector: 'app-my-collection',
    templateUrl: './my-collection.component.html',
    styleUrls: ['./my-collection.component.scss'],
    standalone: false
})
export class MyCollectionComponent implements OnInit{
  form: FormGroup;
  member: Member;
  members: Member[] = [];
  selectedId: number;
  categories: ContributionCategory[] = [];
  user: User
  pollingSubscription: Subscription | null = null
  today: string

  /**
   * Constructor
   * @param memberService
   * @param router
   * @param fb
   */
  constructor(
    public memberService: MemberService,
    private authService: AuthService,
    public collectionService: CollectionService,
    public contributionCategoryService: ContributionCategoryService,
    private router: Router,
    private fb: FormBuilder // Inject FormBuilder
  ) {}


  ngOnInit(): void {
    this.authService.user().subscribe(
      (user) => {
        this.user = user;
      }
    )

    this.today = new Date().toISOString().split('T')[0];

    this.form = this.fb.group({
      user_id: [''],
      member_id: [''],
      first_name: [''],
      email: [''],
      contributions: this.fb.array([]), // Define a FormArray for contributions
      contribution_date: this.today
    });

    this.contributionCategoryService.getAll().subscribe((data: ContributionCategory[]) => {
        // Filter out archived categories - only show active ones (archived === false)
        this.categories = data.filter(category => category.archived === false);
    });

    this.form.get('user_id')?.valueChanges.subscribe((userId) => {
      const selectedMember = this.members.find((m) => m.id === userId);
      if (selectedMember) {
        this.form.patchValue({
          first_name: selectedMember.first_name,
          email: selectedMember.email,
          member_id: selectedMember.id,
        });
      }
    });

    this.addContribution();
  }

  get fullName(): string {
    return `${this.user?.last_name || ''} ${this.user?.first_name || ''}`.trim();
  }

  get contributions(): FormArray {
    return this.form.get('contributions') as FormArray;
  }

  addContribution() {
    const contributionGroup = this.fb.group({
      category: ['', Validators.required], 
      amount: ['', [Validators.required, Validators.min(0)]],
    });

    this.contributions.push(contributionGroup);
  }

  removeContribution(index: number) {
    this.contributions.removeAt(index);
  }

  formatFormData(formData: any): any {
    const { user_id, contribution_date, status, contributions } = formData;

    const formattedContributions = contributions.map((contribution: any) => ({
      user_id: Number(user_id),
      contributiontype_id: Number(contribution.category), 
      contribution_amount: parseFloat(contribution.amount),
      contribution_date: contribution_date,
      status: status,
    }));

    return { contributions: formattedContributions };
  }

  displayConfirmationDialog(formData: any) {
    const contributionsList = formData.contributions.map((contribution: any, index: number) => 
      `<ul style="list-style: none; padding: 0; margin: 0;">
            <li style="display: flex; justify-content: space-between; align-items: center; padding: 8px 16px; border-bottom: 1px solid #ebebeb;">
                  <span> ${this.categories.find(category => category.id === contribution.category)?.name || contribution.category}</span>
                  <span><strong>Ksh:</strong> ${contribution.amount}</span>
            </li>
        </ul>
      `
    ).join('')

     Swal.fire({
          title: 'Confirm Submission',
          html: `
            <p><strong>Name:</strong> ${this.fullName}</p>
            <p><strong>Contribution Date:</strong> ${formData.contribution_date}</p>
            <ul>${contributionsList}</ul>
            <br>
             <p style="font-size: 16px">on submit, this will trigger mpesa prompt</p>
          `,
          showCancelButton: true,
          confirmButtonColor: "#175351",
          confirmButtonText: 'Submit',
          customClass: {
            title: 'swal2-title-small'
          }
        }).then((result) => {
          if (result.isConfirmed) {
            this.submitForm();
          }
        });

  }

  pollTransactionStatus(userId: number) {
  let attempts = 0;
  const maxAttempts = 8;

  Swal.fire({
    title: 'Processing...',
    text: 'Verifying your transaction status...',
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    }
  });

  const interval = setInterval(() => {
    console.log(`Attempt #${attempts + 1}: polling transaction status for userId: ${userId}`);

    this.memberService.getTransactionStatus().subscribe({
      next: (res) => {
        attempts++;

        console.log('Response from getTransactionStatus:', res);

        const rawStatus = res?.status ?? '';
        const normalizedStatus = rawStatus.toString().trim().toLowerCase();

        console.log('Raw status from response:', rawStatus);
        console.log('Normalized status:', normalizedStatus);

        if (normalizedStatus === 'completed') {
          console.log('✅ Transaction completed. Stopping polling.');
          clearInterval(interval);

          Swal.fire('Success', 'Transaction successful!', 'success').then(() => {
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/pages/profile']);
            });
          });
        } else if (normalizedStatus === 'not completed') {
          console.log('❌ Transaction failed. Stopping polling.');
          clearInterval(interval);

          Swal.fire('Failed', 'Transaction was not successful.', 'error').then(() => {
            location.reload();
          });
        } else if (attempts >= maxAttempts) {
          console.log('⚠️ Max attempts reached. Stopping polling.');
          clearInterval(interval);

          Swal.fire('Failed', 'Transaction not completed. Please try again.', 'error').then(() => {
            location.reload();
          });
        } else {
          console.log(`ℹ️ Transaction still pending. Attempt #${attempts} of ${maxAttempts}.`);
        }
      },
      error: (err) => {
        console.error('🚨 Error fetching transaction status:', err);
        clearInterval(interval);

        Swal.fire('Error', 'Could not fetch transaction status', 'error').then(() => {
          location.reload();
        });
      }
    });
  }, 5000);
}


  submitForm() {
    if (this.form.valid) {
      const formValue = this.form.value 
      formValue.user_id = this.user.id 

      const formattedData = this.formatFormData(formValue);

      this.memberService.createOwnCollection(formattedData).subscribe({
        next: () => {
          Swal.fire({
            title: 'Waiting for Mpesa Confirmation...',
            text: 'Please complete the Mpesa prompt on your phone',
            icon: 'info',
            timer: 10000,
            showCancelButton: false,
          })

          setTimeout(() => {
            this.pollTransactionStatus(this.user.id)
          }, 10000) // give time for Mpesa pin entry
        },

        error: () => {
          Swal.fire({
            icon: 'error',
            title: 'submission failed',
            text: 'failed to save your contribution. Please try again'
          })
        }
    });
    }
  }

  submit() {
    this.displayConfirmationDialog(this.form.value)
  }
}
