import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Member } from '../../../../../shared/models/member';
import { MemberService } from '../../../../../shared/services/member.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-edit-collection',
    templateUrl: './edit-collection.component.html',
    styleUrls: ['./edit-collection.component.scss'],
    standalone: false
})
export class EditCollectionComponent {}
