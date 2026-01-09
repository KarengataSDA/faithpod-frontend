export let imageHTML1 = 
`<div class="example">
    <div>
        <img alt="Responsive image" class="img-fluid" src="./assets/img/photos/1.jpg">
    </div>
</div>`
export let imageTS1 = 
`import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit { }

`

export let imageHTML2 = 
`<div class="example">
    <img alt="Responsive image" class="img-thumbnail wd-100p wd-sm-200" src="./assets/img/photos/1.jpg">
</div>`
export let imageTS2 = 
`import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit { }
`

export let imageHTML3 = 
`<div class="example">
    <div class="bd pd-20 clearfix">
        <img alt="" class="rounded float-sm-left wd-100p wd-sm-200" src="./assets/img/photos/1.jpg">
        <img alt="" class="rounded float-sm-right wd-100p wd-sm-200 mg-t-10 mg-sm-t-0" src="./assets/img/photos/1.jpg">
    </div>
</div>`
export let imageTS3 = 
`import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit { }
`

export let imageHTML4 = 
`<div class="example">
    <figure class="pos-relative mg-b-0 wd-sm-80p wd-md-50p">
        <img alt="Responsive image" class="img-fit-cover" src="./assets/img/photos/1.jpg">
        <figcaption class="pos-absolute a-0 pd-25 bg-black-5 tx-white-8">
            <h6 class="tx-14 tx-sm-16 tx-white tx-semibold mg-b-15 mg-sm-b-20">What Does Royalty-Free Mean?</h6>
            <p class="mg-b-0">Royalty free means you just need to pay for rights to use the item once per end product. You don't need to pay additional or ongoing fees for each person who sees or uses it.</p>
        </figcaption>
    </figure>
</div>`
export let imageTS4 = 
`import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.scss']
})
export class ImagesComponent implements OnInit { }
`