import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-skeleton-loader',
  imports: [],
  templateUrl: './skeleton-loader.component.html',
  styleUrl: './skeleton-loader.component.scss'
})
export class SkeletonLoaderComponent {
 @Input() rows: number = 5 
 @Input() columns: number = 5
}
