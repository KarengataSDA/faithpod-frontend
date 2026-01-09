import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'app-element-card-header',
    templateUrl: './element-card-header.component.html',
    styleUrls: ['./element-card-header.component.scss'],
    standalone: false
})
export class ElementCardHeaderComponent implements OnInit {

  @Input() title!: string;
  @Input() item!: any;      
  @Input() item1!: any;      
  constructor() { }

  ngOnInit(): void {
  }

  getitem1 = this.item1

}
