import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePrayercellComponent } from './prayercell/create-prayercell/create-prayercell.component';
import { ViewPrayercellComponent } from './prayercell/view-prayercell/view-prayercell.component';
import { EditPrayercellComponent } from './prayercell/edit-prayercell/edit-prayercell.component';
import { MembersComponent } from './members/members/members.component';
import { PrayercellsComponent } from './prayercell/prayercells/prayercells.component';
import { EditMemberComponent } from './members/edit-member/edit-member.component';
import { ViewMemberComponent } from './members/view-member/view-member.component';
import { CreateMemberComponent } from './members/create-member/create-member.component';
import { CollectionComponent } from './treasury/contributions/collection/collection.component';
import { CreateCollectionComponent } from './treasury/contributions/create-collection/create-collection.component';
import { ViewCollectionComponent } from './treasury/view-collection/view-collection.component';
import { EditCollectionComponent } from './treasury/contributions/edit-collection/edit-collection.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { ViewProfileComponent } from './profile/view-profile/view-profile.component';
import { ReceiptComponent } from './treasury/receipt/receipt.component';
import { CategoriesComponent } from './treasury/collection-categories/categories/categories.component';
import { GroupsComponent } from './populations/groups/groups.component';
import { ViewGroupComponent } from './populations/view-group/view-group.component';
import { CreateGroupComponent } from './populations/create-group/create-group.component';
import { EditGroupComponent } from './populations/edit-group/edit-group.component';
import { CreateCategoryComponent } from './treasury/collection-categories/create-category/create-category.component';
import { EditCategoryComponent } from './treasury/collection-categories/edit-category/edit-category.component';
import { ViewCategoryComponent } from './treasury/collection-categories/view-category/view-category.component';
import { RolesComponent } from './role/roles/roles.component';
import { EditRoleComponent } from './role/edit-role/edit-role.component';
import { CreateRoleComponent } from './role/create-role/create-role.component';
import { ViewRoleComponent } from './role/view-role/view-role.component';
import { MyCollectionComponent } from './treasury/contributions/my-collection/my-collection.component';
import { MembershipComponent } from './membership/membership/membership.component';
import { ViewMembershipComponent } from './membership/view-membership/view-membership.component';
import { AuthGuard } from 'src/app/shared/guard/auth.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { PaybillTransactionsComponent } from './treasury/paybill-transactions/paybill-transactions.component';
import { AllContributionsComponent } from './treasury/contributions/all-contributions/all-contributions.component';
import { DashboardMonitorComponent } from './treasury/dashboard-monitor/dashboard-monitor.component';



const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'members', title: "Karengata - Members", component: MembersComponent, canActivate: [AuthGuard], data: { permission: 'can_view_users'}},
      {path: 'members/edit/:id', title: "Karengata - Edit Member", component: EditMemberComponent, canActivate: [AuthGuard], data: { permission: 'can_edit_user'}},
      {path: 'members/view/:memberId', title: "Karengata - View Member", component: ViewMemberComponent, canActivate: [AuthGuard], data: { permission: 'can_view_users'}},
      {path: 'members/create-member', title: "Karengata - Create Member", component: CreateMemberComponent, canActivate: [AuthGuard], data: { permission: 'can_create_user'}},

      {path: 'prayercells', title: "Karengata - Prayercells", component: PrayercellsComponent, canActivate: [AuthGuard], data: {permission: 'can_view_prayercells'}},
      {path: 'prayercells/view/:prayercellId', title: "Karengata - View Prayercell", component: ViewPrayercellComponent, canActivate: [AuthGuard], data: { permission: 'can_view_prayercells'}},
      {path: 'prayercells/create-prayercell', title: "Karengata - Create Prayercell", component: CreatePrayercellComponent, canActivate: [AuthGuard], data: { permission: 'can_create_prayercell'}},
      { path: 'prayercells/edit/:id', title: "Karengata - Edit Prayercell", component: EditPrayercellComponent, canActivate: [AuthGuard], data: { permission: 'can_edit_prayercell'}},

      {path: 'groups', title: "Karengata - Groups", component: GroupsComponent, canActivate: [AuthGuard], data: { permission: 'can_view_groups'} },
      {path: 'groups/view/:groupId', title: "Karengata - View Group", component: ViewGroupComponent, canActivate: [AuthGuard], data: { permission: 'can_view_groups'} },
      {path: 'groups/create-group', title: "Karengata - Create Group", component: CreateGroupComponent, canActivate: [AuthGuard], data: { permission: 'can_create_group'} },
      {path: 'groups/edit/:id', title: "Karengata - Edit Group", component: EditGroupComponent, canActivate: [AuthGuard], data: { permission: 'can_edit_group'} },
      
      {path: 'treasury/collections', title: "Karengata - Treasury", component: CollectionComponent, canActivate: [AuthGuard], data: { permission: 'can_view_contributions'}},
      {path: 'treasury/all-collections', title: "Karengata - All Collection", component: AllContributionsComponent, canActivate: [AuthGuard], data: { permission: 'can_view_contributions'}},
      {path: 'treasury/collections/create', title: "Karengata - Create Collection", component: CreateCollectionComponent, canActivate: [AuthGuard], data: { permission: 'can_create_contribution'}},
      {path: 'treasury/my-collections/create', title: "Karengata - Create Collection", component: MyCollectionComponent},
      {path: 'treasury/collections/view/:date', title: "Karengata - View Collection", component: ViewCollectionComponent, canActivate: [AuthGuard], data: { permission: 'can_view_contributions'}},
      {path: 'treasury/edit-collection', title: "Karengata - Edit Collection", component: EditCollectionComponent, canActivate: [AuthGuard], data: { permission: 'can_edit_contribution'}},
      {path: 'treasury/receipt', title: "Karengata - Receipt", component: ReceiptComponent},
      
      {path: 'treasury/collection-categories', title: "Karengata - Collections", component: CategoriesComponent, canActivate: [AuthGuard], data: { permission: 'can_view_categories'}},
      {path: 'treasury/collection-categories/create', title: "Karengata - Collections", component: CreateCategoryComponent, canActivate: [AuthGuard], data: { permission: 'can_create_category'}},
      {path: 'treasury/collection-categories/:categoryId/contributions', title: "Karengata - Collections", component: ViewCategoryComponent, canActivate: [AuthGuard], data: { permission: 'can_view_categories'}},
      {path: 'treasury/collection-categories/edit/:id', title: "Karengata - Collections", component: EditCategoryComponent, canActivate: [AuthGuard], data: { permission: 'can_edit_category'}},

      {path: 'treasury/paybill-transactions', title: "Karengata - Paybill Transactions", component: PaybillTransactionsComponent},
      {path: 'treasury/dashboard-monitor', title: "Karengata - Dashboard Monitor", component: DashboardMonitorComponent},

      {path: 'profile', title: "Karengata - Profile", component: ViewProfileComponent},
      {path: 'edit-profile', title: "Karengata - Edit Profile", component: EditProfileComponent},

      {path: 'roles', title: "Karengata - Roles", component: RolesComponent, canActivate: [AuthGuard], data: { permission: 'can_view_roles'}},
      {path: 'roles/view/:roleId', title: "Karengata - View Roles", component: ViewRoleComponent, canActivate: [AuthGuard], data: { permission: 'can_view_roles'}},
      {path: 'roles/create-role', title: "Karengata - Create Role", component: CreateRoleComponent, canActivate: [AuthGuard], data: { permission: 'can_create_role'}},
      { path: 'roles/edit/:id', title: "Karengata - Edit Role", component: EditRoleComponent, canActivate: [AuthGuard], data: { permission: 'can_edit_role'}},

      {path: 'memberships', title: "Karengata - Membership", component: MembershipComponent, canActivate: [AuthGuard], data: { permission: 'can_view_membershiptypes'}},
      {path: 'memberships/view/:id', title: "Karengata - View Membership", component:ViewMembershipComponent, canActivate: [AuthGuard], data: { permission: 'can_view_membershiptypes'}},    
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRoutingModule { }
