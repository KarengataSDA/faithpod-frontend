import { Component } from '@angular/core';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-search-component',
    templateUrl: './search-component.component.html',
    styleUrls: ['./search-component.component.scss'],
    standalone: false
})
export class SearchComponentComponent {
  constructor(config: NgbDropdownConfig){
    // config.autoClose = false;
  }
}
