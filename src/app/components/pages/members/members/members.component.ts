import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MemberService } from '../../../../shared/services/member.service';
import Swal from 'sweetalert2';
import { start } from '@popperjs/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Member } from 'src/app/shared/models/member';

@Component({
    selector: 'app-members',
    templateUrl: './members.component.html',
    styleUrls: ['./members.component.scss'],
    standalone: false,
})
export class MembersComponent implements OnInit, OnDestroy {
  members: Member[] = [];

  paginatedMembers: Member[] = []
  totalLength = 0
  pageSize = 20;
  currentPage = 1
  totalPages = 0

  filteredMembers: Member[] = []
  searchTerm: string = ''
  isLoading: boolean = true

  private destroy$ = new Subject<void>();

  constructor(public memberService: MemberService, public authService: AuthService) {}

  ngOnInit(): void {
    this.memberService.getAll()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: Member[]) => {
        this.members = data;
        this.applyFilter()
        this.isLoading = false
      });

    this.authService.user()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        user => {

        }
      )
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  applyFilter() {
    if(this.searchTerm) {
      this.filteredMembers = this.members.filter(member => 
        member.first_name?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        member.last_name?.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        member.email?.toLocaleLowerCase().includes(this.searchTerm.toLocaleLowerCase()) ||
        (member.membership_number && member.membership_number.toString().toLowerCase().includes(this.searchTerm.toLowerCase()))
        
      )
    } else {
      this.filteredMembers = this.members
    }

    this.totalLength = this.filteredMembers.length 
    this.totalPages = Math.ceil(this.totalLength / this.pageSize)
    this.updatePaginatedMembers()

  }

  updatePaginatedMembers() {
    const startIndex = (this.currentPage -1) * this.pageSize 
    const endIndex = startIndex + this.pageSize 
    this.paginatedMembers = this.filteredMembers.slice(startIndex, endIndex)
  }

  onPageChange(page: number) {
    this.currentPage = page; 
    this.updatePaginatedMembers()
  }

  onSearchChange(event: Event) {
    const target = event.target as HTMLInputElement
    this.searchTerm = target.value 
    this.currentPage = 1;
    this.applyFilter()
  }

  deleteMember(id) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.memberService.delete(id)
          .pipe(takeUntil(this.destroy$))
          .subscribe((res) => {
            this.members = this.members.filter((item) => item.id !== id);
            this.applyFilter();
          });

        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });
  }
}