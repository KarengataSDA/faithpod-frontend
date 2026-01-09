export let offcanvasHTML1 = 
`<div class="btn-list">
<a class="btn btn-primary off-canvas" data-bs-toggle="offcanvas" (click)="open(content)" role="button" aria-controls="offcanvasExample">
    Link with href
</a>
<button class="btn btn-primary off-canvas" type="button" data-bs-toggle="offcanvas" (click)="open(content)" aria-controls="offcanvasExample">
    Button with data-bs-target
</button>
</div>`

export let offcanvasTS1 = 
`import { Component } from '@angular/core';
interface Alert {
    type: string;
    message: string;
}
const basicALERTS: Alert[] = [{
    type: 'success',
    message: 'Well done! You successfully read this important alert message.',
  }, {
    type: 'info',
    message: "Heads up! This alert needs your attention, but it's not super important.",
  }, {
    type: 'warning',
    message: "Warning! Better check yourself, you're not looking too good.",
  }, {
    type: 'danger',
    message: "Oh snap! Change a few things up and try submitting again.",
  },
  ];

@Component({
    selector: 'app-alerts',
    templateUrl: './alerts.component.html',
    styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent {
  closeResult = '';
  constructor(private offcanvasService: NgbOffcanvas) { }
  open(content) {
    this.offcanvasService.open(content, {ariaLabelledBy: 'offcanvas-basic-title'}).result.then((result) => {
      this.closeResult = Closed with: '$'{result};
    }, (reason) => {
      this.closeResult = Dismissed '$'{this.getDismissReason(reason)};
    });
  }
}`

export let offcanvasHTML2 = 
`<div class="btn-list">
<button class="btn btn-primary off-canvas" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasScrolling" aria-controls="offcanvasScrolling" (click)="openNoBackdrop(content2)">Enable body scrolling</button>
<button class="btn btn-primary off-canvas" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBackdrop" aria-controls="offcanvasWithBackdrop" (click)="openNoBackdrop(content2)">Enable backdrop (default)</button>
<button class="btn btn-primary off-canvas text-wrap" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions" (click)="openNoBackdrop(content2)">Enable both scrolling & backdrop</button>
</div>`
export let offcanvasTS2 = 
`import { Component } from '@angular/core';
interface Alert {
    type: string;
    message: string;
}

@Component({
    selector: 'app-alerts',
    templateUrl: './alerts.component.html',
    styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent {
  openNoBackdrop(content: TemplateRef<any>) {
    this.offcanvasService.open(content, { backdrop: false });
  }
}`

export let offcanvasHTML3 = 
`<div class="btn-list">
<button class="btn btn-primary off-canvas" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop" (click)="openTop(content2)">Toggle top offcanvas</button>
<button class="btn btn-primary off-canvas" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasRight" aria-controls="offcanvasRight" (click)="openEnd(content2)">Toggle right offcanvas</button>
<button class="btn btn-primary off-canvas" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom" (click)="openBottom(content2)">Toggle bottom offcanvas</button>
</div>`
export let offcanvasTS3 = 
`import { Component } from '@angular/core';
interface Alert {
    type: string;
    message: string;
}

@Component({
    selector: 'app-alerts',
    templateUrl: './alerts.component.html',
    styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent {

  //Toggle top offcanvas

openTop(content: TemplateRef<any>) {
  this.offcanvasService.open(content, { position: 'top' });
}

//Toggle Right offcanvas


openEnd(content: TemplateRef<any>) {
  this.offcanvasService.open(content, { position: 'end' });
}

//Toggle Bottom offcanvas

openBottom(content: TemplateRef<any>) {
  this.offcanvasService.open(content, { position: 'bottom' });
}
    
}`

