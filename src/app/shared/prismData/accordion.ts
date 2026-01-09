export let accordionHTML1 = 
`<ngb-accordion #acc="ngbAccordion">
<ngb-panel title="Collapsible Group Item #1" cardClass="acc-card mb-2 br-5">
  <ng-template ngbPanelContent>
    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
  </ng-template>
</ngb-panel>
<ngb-panel title="Collapsible Group Item #2" cardClass="acc-card mb-2 br-5 border-top">
  <ng-template ngbPanelContent>
    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
  </ng-template>
</ngb-panel>
<ngb-panel title="Collapsible Group Item #3" cardClass="acc-card mb-2 br-5 border-top">
  <ng-template ngbPanelContent>
    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.
  </ng-template>
</ngb-panel>
</ngb-accordion>`

export let accordionTS1 = 
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
export class accordionComponent {
   
}`

export let accordionHTML2 = 
`<ngb-accordion [closeOthers]="true" activeIds="static-1">
<ngb-panel id="static-1" title="Accordion Item #1">
  <ng-template ngbPanelContent>
    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia
    aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor,
    sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica,
    craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings
    occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus
    labore sustainable VHS.
  </ng-template>
</ngb-panel>
<ngb-panel id="static-2" title="Accordion Item #2">
  <ng-template ngbPanelContent>
    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia
    aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor,
    sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica,
    craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings
    occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus
    labore sustainable VHS.
  </ng-template>
</ngb-panel>
<ngb-panel id="static-3" title="Accordion Item #3">
  <ng-template ngbPanelContent>
    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia
    aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor,
    sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica,
    craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings
    occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus
    labore sustainable VHS.
  </ng-template>
</ngb-panel>
</ngb-accordion>`
export let accordionTS2 = 
`import { Component } from '@angular/core';
interface Alert {
    type: string;
    message: string;
}

@Component({
    selector: 'app-accordion',
    templateUrl: './accordion.component.html',
    styleUrls: ['./accordion.component.scss']
})
export class AccordionComponent {
    
}`

export let accordionHTML3 = 
`<ngb-accordion [closeOthers]="true" activeIds="static-1">
<ngb-panel id="static-1" cardClass="br-5">
  <ng-template ngbPanelTitle >
    <i class="fa fa-minus-circle mx-1 "></i> 
    Select 1
    </ng-template>
    <ng-template ngbPanelContent>
    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. 
    Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. 
    Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. 
    Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable.
    </ng-template>
</ngb-panel>
<ngb-panel id="static-2" cardClass="mt-2 border-top br-5">
  <ng-template ngbPanelTitle >
    <i class="fa fa-minus-circle mx-1"></i> 
    Select 2
    </ng-template>
    <ng-template ngbPanelContent>
    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. 
    Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. 
    Nihil anim keffiyeh helvetica, craft beer labore.
    </ng-template>
</ngb-panel>
<ngb-panel id="static-3" cardClass="mt-2 border-top br-5">
  <ng-template ngbPanelTitle >
    <i class="fa fa-minus-circle mx-1"></i> 
    Select 3
    </ng-template>
    <ng-template ngbPanelContent>
    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. 
    Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squidsingle-origin coffee nulla assumenda shoreditch et. 
    Nihil anim keffiyeh helvetica, craft beer labore.
    </ng-template>
</ngb-panel>
</ngb-accordion>`
export let accordionTS3 = 
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

    
}`

export let accordionHTML4 = 
`<ngb-accordion [closeOthers]="true" activeIds="static-1">
<ngb-panel id="static-1" cardClass="br-5">
  <ng-template ngbPanelTitle >
    <i class="fa fa-minus-circle mx-1 "></i> 
    Select 1
    </ng-template>
    <ng-template ngbPanelContent>
    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. 
    Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. 
    Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. 
    Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable.
    </ng-template>
</ngb-panel>
<ngb-panel id="static-2" cardClass="mt-2 border-top br-5">
  <ng-template ngbPanelTitle >
    <i class="fa fa-minus-circle mx-1"></i> 
    Select 2
    </ng-template>
    <ng-template ngbPanelContent>
    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. 
    Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. 
    Nihil anim keffiyeh helvetica, craft beer labore.
    </ng-template>
</ngb-panel>
<ngb-panel id="static-3" cardClass="mt-2 border-top br-5">
  <ng-template ngbPanelTitle >
    <i class="fa fa-minus-circle mx-1"></i> 
    Select 3
    </ng-template>
    <ng-template ngbPanelContent>
    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. 
    Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squidsingle-origin coffee nulla assumenda shoreditch et. 
    Nihil anim keffiyeh helvetica, craft beer labore.
    </ng-template>
</ngb-panel>
<ngb-panel id="static-4" cardClass="mt-2 border-top br-5">
  <ng-template ngbPanelTitle >
    <i class="fa fa-minus-circle mx-1"></i> 
    Select 4
    </ng-template>
    <ng-template ngbPanelContent>
    Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. 
    Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squidsingle-origin coffee nulla assumenda shoreditch et. 
    Nihil anim keffiyeh helvetica, craft beer labore.
    </ng-template>
</ngb-panel>
</ngb-accordion>`
export let accordionTS4 = 
`import { Component } from '@angular/core';

@Component({
    selector: 'app-alerts',
    templateUrl: './alerts.component.html',
    styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent { }`

export let accordionHTML5 = 
`<div class="panel-group1" id="accordion1">
<div class="panel panel-default mb-4 overflow-hidden">
    <div class="panel-heading1 ">
        <h4 class="panel-title1">
            <a class="accordion-toggle firstgradient bg-gradient-primary collapsed" (click)="FirstGradient()">Section 1</a>
        </h4>
    </div>
      <div *ngIf="isFirstGradient">
        <div class="panel-collapse">
          <div class="panel-body">
            <p>All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words </p>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                and scrambled.Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure
                him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise</p>
          </div>
        </div>
      </div>
</div>
<div class="panel panel-default mb-4 overflow-hidden">
    <div class="panel-heading1 ">
        <h4 class="panel-title1">
            <a class="accordion-toggle secondgradient bg-gradient-primary collapsed" (click)="SecondGradient()">Section 2</a>
        </h4>
    </div>
      <div *ngIf="isSecondGradient">
        <div class="panel-collapse">
          <div class="panel-body">
            <p>All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words </p>
            <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type
                and scrambled.Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure
                him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise</p>
          </div>
        </div>
      </div>
</div>
</div>`
export let accordionTS5 = 
`import { Component } from '@angular/core';

interface AlertIcon {
    icon: string;
    type: string;
    message: string;
  }

  const AlertWithIcon_one: AlertIcon[] = [{
    icon:'fe fe-download',
    type: 'default',
    message: 'Default! This is a warning alert—check it out ',
  }, {
    icon:'fe fe-check-square',
    type: 'primary',
    message: 'Primary! This is a warning alert—check it out ',
  }, {
    icon:'fe fe-thumbs-up',
    type: 'success',
    message: 'Success! This is a warning alert—check it out ',
  }, {
    icon:'fe fe-bell',
    type: 'warning',
    message: 'Info! This is a warning alert—check it out ',
  }, {
    icon:'fe fe-info',
    type: 'info',
    message: 'Warning! This is a warning alert—check it out ',
  }, {
    icon:'fe fe-slash',
    type: 'danger',
    message: 'Danger! This is a warning alert—check it out that has an icon too!',
  }
  ];

@Component({
    selector: 'app-alerts',
    templateUrl: './alerts.component.html',
    styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent { 
    alertIcon_one!: AlertIcon[]

    constructor() {
    this.alertIcon_one = AlertWithIcon_one
    }
}`
