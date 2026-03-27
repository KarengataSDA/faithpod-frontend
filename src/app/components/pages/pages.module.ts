import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { CreatePrayercellComponent } from './prayercell/create-prayercell/create-prayercell.component';
import { EditPrayercellComponent } from './prayercell/edit-prayercell/edit-prayercell.component';
import { ViewPrayercellComponent } from './prayercell/view-prayercell/view-prayercell.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EditMemberComponent } from './members/edit-member/edit-member.component';
import { ViewMemberComponent } from './members/view-member/view-member.component';
import { CreateMemberComponent } from './members/create-member/create-member.component';
import { MembersComponent } from './members/members/members.component';
import { PrayercellsComponent } from './prayercell/prayercells/prayercells.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ViewCollectionComponent } from './treasury/view-collection/view-collection.component';
import { EditCollectionComponent } from './treasury/contributions/edit-collection/edit-collection.component';
import { CollectionComponent } from './treasury/contributions/collection/collection.component';
import { ViewProfileComponent } from './profile/view-profile/view-profile.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { ReceiptComponent } from './treasury/receipt/receipt.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CategoriesComponent } from './treasury/collection-categories/categories/categories.component';
import { GroupsComponent } from './populations/groups/groups.component';
import { CreateGroupComponent } from './populations/create-group/create-group.component';
import { EditGroupComponent } from './populations/edit-group/edit-group.component';
import { ViewGroupComponent } from './populations/view-group/view-group.component';
import { CreateCategoryComponent } from './treasury/collection-categories/create-category/create-category.component';
import { ViewCategoryComponent } from './treasury/collection-categories/view-category/view-category.component';
import { EditCategoryComponent } from './treasury/collection-categories/edit-category/edit-category.component';
import { RolesComponent } from './role/roles/roles.component';
import { CreateRoleComponent } from './role/create-role/create-role.component';
import { ViewRoleComponent } from './role/view-role/view-role.component';
import { EditRoleComponent } from './role/edit-role/edit-role.component';
import { MyCollectionComponent } from './treasury/contributions/my-collection/my-collection.component';
import { MembershipComponent } from './membership/membership/membership.component';
import { ViewMembershipComponent } from './membership/view-membership/view-membership.component';

import { NgChartsModule } from 'ng2-charts';
import { HasPermissionDirective } from 'src/app/shared/directives/has-permission.directive';
import { SkeletonLoaderComponent } from "../../shared/skeleton-loader/skeleton-loader.component";
import { ImageUploadComponent } from "../../shared/components/image-upload/image-upload.component";
import { PaybillTransactionsComponent } from './treasury/paybill-transactions/paybill-transactions.component';
import { AllContributionsComponent } from './treasury/contributions/all-contributions/all-contributions.component';
import { ManualContributionComponent } from './treasury/contributions/manual-contribution/manual-contribution.component';
import { MemberActivityLogComponent } from './settings/member-activity-log/member-activity-log.component';
import { BrandingComponent } from './settings/branding/branding.component';
import { AppSettingsComponent } from './settings/app-settings/app-settings.component';
import { AnnouncementsComponent } from './announcements/announcements/announcements.component';
import { CreateAnnouncementComponent } from './announcements/create-announcement/create-announcement.component';
import { ViewAnnouncementComponent } from './announcements/view-announcement/view-announcement.component';
import { EditAnnouncementComponent } from './announcements/edit-announcement/edit-announcement.component';
import { HymnLanguagesComponent } from './hymns/hymn-languages/hymn-languages.component';
import { HymnsListComponent } from './hymns/hymns-list/hymns-list.component';
import { ViewHymnComponent } from './hymns/view-hymn/view-hymn.component';
import { HymnFavoritesComponent } from './hymns/hymn-favorites/hymn-favorites.component';
import { BirthdayWishesComponent } from './messages/birthday-wishes/birthday-wishes.component';
import { ViewMessageComponent } from './messages/view-message/view-message.component';
import { SendMessageComponent } from './messages/send-message/send-message.component';
import { MessagesComponent } from './messages/messages/messages.component';



@NgModule({
  declarations: [
    PrayercellsComponent,
    CreatePrayercellComponent,
    EditPrayercellComponent,
    ViewPrayercellComponent,

    EditMemberComponent,
    ViewMemberComponent,
    CreateMemberComponent,
    MembersComponent,
    
    ViewCollectionComponent,
    EditCollectionComponent,
    CollectionComponent,
    ReceiptComponent,
    
    
    ViewProfileComponent,
    EditProfileComponent,
    CategoriesComponent,
    AllContributionsComponent,
    ManualContributionComponent,

    GroupsComponent,
    CreateGroupComponent,
    EditGroupComponent,
    ViewGroupComponent,
    CreateCategoryComponent,
    ViewCategoryComponent,
    EditCategoryComponent,
    RolesComponent,
    CreateRoleComponent,
    ViewRoleComponent,
    EditRoleComponent,
    MyCollectionComponent,
    MembershipComponent,
    ViewMembershipComponent,
    PaybillTransactionsComponent,
    MemberActivityLogComponent,
    BrandingComponent,
    AppSettingsComponent,

    MessagesComponent,
    SendMessageComponent,
    ViewMessageComponent,
    BirthdayWishesComponent,

    AnnouncementsComponent,
    CreateAnnouncementComponent,
    ViewAnnouncementComponent,
    EditAnnouncementComponent,

    HymnLanguagesComponent,
    HymnsListComponent,
    ViewHymnComponent,
    HymnFavoritesComponent



    
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    SharedModule,
    NgSelectModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    NgChartsModule,
    SkeletonLoaderComponent,
    ImageUploadComponent,
]
})
export class PagesModule { }
