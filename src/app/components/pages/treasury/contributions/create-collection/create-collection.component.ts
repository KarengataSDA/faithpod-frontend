import { Component, OnInit } from '@angular/core';
import { MemberService } from '../../../../../shared/services/member.service';
import { Member } from '../../../../../shared/models/member';
import {
  FormGroup,
  Validators,
  FormBuilder,
  FormArray,
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { group } from '@angular/animations';
import { CollectionService } from '../../../../../shared/services/collection.service';
import { ContributionCategory } from '../../../../../shared/models/collection';
import { ContributionCategoryService } from 'src/app/shared/services/contribution-category.service';

@Component({
    selector: 'app-create-collection',
    templateUrl: './create-collection.component.html',
    styleUrls: ['./create-collection.component.scss'],
    standalone: false
})
export class CreateCollectionComponent implements OnInit {
  form: FormGroup;
  member: Member;
  members: Member[] = [];
  selectedId: number;
  categories: ContributionCategory[] = [];

  /**
   * Constructor
   * @param memberService
   * @param router
   * @param fb
   */
  constructor(
    public memberService: MemberService,
    public collectionService: CollectionService,
    public contributionCategoryService: ContributionCategoryService,
    private router: Router,
    private fb: FormBuilder // Inject FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      user_id: [''],
      member_id: [''],
      first_name: [''],
      email: [''],
      contributions: this.fb.array([]), // Define a FormArray for contributions
      contribution_date: ['', Validators.required],
      status: ['0'],
    });

    this.memberService.getAll().subscribe((data: Member[]) => {
      this.members = data;
    });

    this.contributionCategoryService
      .getAll()
      .subscribe((data: ContributionCategory[]) => {
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
      `
        <ul style="text-align: center;">
          <div>
          <span style="margin-right: 15px;"><strong >Category:</strong> ${this.categories.find(category => category.id === contribution.category)?.name || contribution.category} </span>
           <span><strong>Amount:</strong> ${contribution.amount} </span>
          
          </div>
        </ul>
      `
    ).join('');

    Swal.fire({
      title: 'Confirm Submission',
      html: `
        <p><strong>Name:</strong> ${formData.first_name}</p>
        <p><strong>Contribution Date:</strong> ${formData.contribution_date}</p>
        <ul>${contributionsList}</ul>
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

  submitForm() {
    if (this.form.valid) {
      const formattedData = this.formatFormData(this.form.value);
      this.memberService.createCollection(formattedData).subscribe(
        (res) => {
          this.router.navigateByUrl('/pages/treasury/collections');
        }
      );
    }
  }


  submit() {
    this.displayConfirmationDialog(this.form.value)
  }

}
