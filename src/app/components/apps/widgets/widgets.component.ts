import { Component, OnInit } from '@angular/core';
import { Gallery, GalleryItem, ImageItem } from 'ng-gallery';


@Component({
    selector: 'app-widgets',
    templateUrl: './widgets.component.html',
    styleUrls: ['./widgets.component.scss'],
    standalone: false
})
export class WidgetsComponent implements OnInit {

  items!: GalleryItem[];

  imageData = data;

  constructor(public gallery: Gallery) { }

  ngOnInit(): void {
    // Creat gallery items
    this.items = this.imageData.map(
      (item) =>{
        return new ImageItem({ src: item.srcUrl, thumb: item.previewUrl })
      }
    );
  }



}
const data = [
  {
    srcUrl: "./assets/images/media/1.jpg",
    previewUrl: "./assets/images/media/1.jpg"
  },
  {
    srcUrl: "./assets/images/media/2.jpg",
    previewUrl: "./assets/images/media/2.jpg"
  },{
    srcUrl: "./assets/images/media/3.jpg",
    previewUrl: "./assets/images/media/3.jpg"
  },{
    srcUrl: "./assets/images/media/4.jpg",
    previewUrl: "./assets/images/media/4.jpg"
  },{
    srcUrl: "./assets/images/media/5.jpg",
    previewUrl: "./assets/images/media/5.jpg"
  },{
    srcUrl: "./assets/images/media/6.jpg",
    previewUrl: "./assets/images/media/6.jpg"
  },
]
