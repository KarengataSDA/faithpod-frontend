import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreatePrayercellComponent } from './prayercell/create-prayercell/create-prayercell.component';
import { ViewPrayercellComponent } from './prayercell/view-prayercell/view-prayercell.component';
import { EditPrayercellComponent } from './prayercell/edit-prayercell/edit-prayercell.component';
import { AnnouncementsComponent } from './announcements/announcements/announcements.component';
import { CreateAnnouncementComponent } from './announcements/create-announcement/create-announcement.component';
import { ViewAnnouncementComponent } from './announcements/view-announcement/view-announcement.component';
import { EditAnnouncementComponent } from './announcements/edit-announcement/edit-announcement.component';
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
import { MemberActivityLogComponent } from './settings/member-activity-log/member-activity-log.component';
import { BrandingComponent } from './settings/branding/branding.component';
import { AppSettingsComponent } from './settings/app-settings/app-settings.component';
import { HymnLanguagesComponent } from './hymns/hymn-languages/hymn-languages.component';
import { HymnsListComponent } from './hymns/hymns-list/hymns-list.component';
import { HymnFavoritesComponent } from './hymns/hymn-favorites/hymn-favorites.component';
import { ViewHymnComponent } from './hymns/view-hymn/view-hymn.component';
import { MessagesComponent } from './messages/messages/messages.component';
import { ViewMessageComponent } from './messages/view-message/view-message.component';
import { BirthdayWishesComponent } from './messages/birthday-wishes/birthday-wishes.component';
import { SendMessageComponent } from './messages/send-message/send-message.component';



const routes: Routes = [
  {
    path: '',
    children: [
      {path: 'members', title: "Members", component: MembersComponent, canActivate: [AuthGuard], data: { permission: 'view members'}},
      {path: 'members/edit/:id', title: "Edit Member", component: EditMemberComponent, canActivate: [AuthGuard], data: { permission: 'edit members'}},
      {path: 'members/view/:memberId', title: "View Member", component: ViewMemberComponent, canActivate: [AuthGuard], data: { permission: 'view members'}},
      {path: 'members/create-member', title: "Create Member", component: CreateMemberComponent, canActivate: [AuthGuard], data: { permission: 'create members'}},

      {path: 'prayercells', title: "Prayercells", component: PrayercellsComponent, canActivate: [AuthGuard], data: {permission: 'view prayer cells'}},
      {path: 'prayercells/view/:prayercellId', title: "View Prayercell", component: ViewPrayercellComponent, canActivate: [AuthGuard], data: { permission: 'view prayer cells'}},
      {path: 'prayercells/create-prayercell', title: "Create Prayercell", component: CreatePrayercellComponent, canActivate: [AuthGuard], data: { permission: 'create prayer cells'}},
      { path: 'prayercells/edit/:id', title: "Edit Prayercell", component: EditPrayercellComponent, canActivate: [AuthGuard], data: { permission: 'edit prayer cells'}},

      {path: 'groups', title: "Groups", component: GroupsComponent, canActivate: [AuthGuard], data: { permission: 'view population groups'} },
      {path: 'groups/view/:groupId', title: "View Group", component: ViewGroupComponent, canActivate: [AuthGuard], data: { permission: 'view population groups'} },
      {path: 'groups/create-group', title: "Create Group", component: CreateGroupComponent, canActivate: [AuthGuard], data: { permission: 'create population groups'} },
      {path: 'groups/edit/:id', title: "Edit Group", component: EditGroupComponent, canActivate: [AuthGuard], data: { permission: 'edit population groups'} },

      {path: 'treasury/collections', title: "Treasury", component: CollectionComponent, canActivate: [AuthGuard], data: { permission: 'view contribution types'}},
      {path: 'treasury/all-collections', title: "All Collections", component: AllContributionsComponent, canActivate: [AuthGuard], data: { permission: 'view contribution types'}},
      {path: 'treasury/collections/create', title: "Create Collection", component: CreateCollectionComponent, canActivate: [AuthGuard], data: { permission: 'create contribution types'}},
      {path: 'treasury/my-collections/create', title: "Create Collection", component: MyCollectionComponent},
      {path: 'treasury/collections/view/:date', title: "View Collection", component: ViewCollectionComponent, canActivate: [AuthGuard], data: { permission: 'view contribution types'}},
      {path: 'treasury/edit-collection', title: "Edit Collection", component: EditCollectionComponent, canActivate: [AuthGuard], data: { permission: 'edit contribution types'}},
      {path: 'treasury/receipt', title: "Receipt", component: ReceiptComponent},

      {path: 'treasury/collection-categories', title: "Collections", component: CategoriesComponent, canActivate: [AuthGuard], data: { permission: 'view contribution types'}},
      {path: 'treasury/collection-categories/create', title: "Collections", component: CreateCategoryComponent, canActivate: [AuthGuard], data: { permission: 'create contribution types'}},
      {path: 'treasury/collection-categories/:categoryId/contributions', title: "Collections", component: ViewCategoryComponent, canActivate: [AuthGuard], data: { permission: 'view contribution types'}},
      {path: 'treasury/collection-categories/edit/:id', title: "Collections", component: EditCategoryComponent, canActivate: [AuthGuard], data: { permission: 'edit contribution types'}},

      {path: 'treasury/paybill-transactions', title: "Paybill Transactions", component: PaybillTransactionsComponent},
      {path: 'treasury/dashboard-monitor', title: "Dashboard Monitor", component: DashboardMonitorComponent},

      {path: 'profile', title: "Profile", component: ViewProfileComponent},
      {path: 'edit-profile', title: "Edit Profile", component: EditProfileComponent},

      {path: 'roles', title: "Roles", component: RolesComponent, canActivate: [AuthGuard], data: { permission: 'view roles'}},
      {path: 'roles/view/:roleId', title: "View Role", component: ViewRoleComponent, canActivate: [AuthGuard], data: { permission: 'view roles'}},
      {path: 'roles/create-role', title: "Create Role", component: CreateRoleComponent, canActivate: [AuthGuard], data: { permission: 'create roles'}},
      { path: 'roles/edit/:id', title: "Edit Role", component: EditRoleComponent, canActivate: [AuthGuard], data: { permission: 'edit roles'}},

      {path: 'memberships', title: "Membership", component: MembershipComponent, canActivate: [AuthGuard], data: { permission: 'view membership types'}},
      {path: 'memberships/view/:id', title: "View Membership", component:ViewMembershipComponent, canActivate: [AuthGuard], data: { permission: 'view membership types'}},

      {path: 'settings/activity-log', title: "Member Activity Log", component: MemberActivityLogComponent, canActivate: [AuthGuard], data: { permission: 'edit members'}},
      {path: 'settings/branding', title: "Branding", component: BrandingComponent, canActivate: [AuthGuard], data: { permission: 'view roles'}},
      {path: 'settings/app-settings', title: "App Settings", component: AppSettingsComponent, canActivate: [AuthGuard], data: { permission: 'view roles'}},

      {path: 'announcements', title: "Announcements", component: AnnouncementsComponent},
      {path: 'announcements/create', title: "Create Announcement", component: CreateAnnouncementComponent},
      {path: 'announcements/view/:announcementId', title: "View Announcement", component: ViewAnnouncementComponent},
      {path: 'announcements/edit/:id', title: "Edit Announcement", component: EditAnnouncementComponent},

       {path: 'messages', title: " Messages", component: MessagesComponent, canActivate: [AuthGuard], data: { permission: 'can_view_messages'}},
      {path: 'messages/send', title: "Send Message", component: SendMessageComponent, canActivate: [AuthGuard], data: { permission: 'can_create_message'}},
      {path: 'messages/birthday-wishes', title: "Birthday Wishes", component: BirthdayWishesComponent, canActivate: [AuthGuard], data: { permission: 'can_view_messages'}},
      {path: 'messages/view/:id', title: "View Message", component: ViewMessageComponent, canActivate: [AuthGuard], data: { permission: 'can_view_messages'}},


        // Hymns Routes (read-only on tenant; create/edit/delete is central admin only)
      {path: 'hymns/languages', title: "Hymn Languages", component: HymnLanguagesComponent},
      {path: 'hymns/language/:languageId', title: "Hymns by Language", component: HymnsListComponent},
      {path: 'hymns/favorites', title: "Favorite Hymns", component: HymnFavoritesComponent, canActivate: [AuthGuard]},
      {path: 'hymns/view/:id', title: "View Hymn", component: ViewHymnComponent},
      {path: 'hymns', title: "Hymns", component: HymnsListComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRoutingModule { }
