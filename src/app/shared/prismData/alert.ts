export let alertHTML1 = 
`<ngb-alert class="" [type]="alert.type" (closed)="close(alert)" *ngFor="let alert of alerts">
{{ alert.message }}
</ngb-alert>`

export let alertTS1 = 
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
    alerts: Alert[] = basicALERTS;

    close(alert: Alert){
        this.alerts.splice(this.alerts.indexOf(alert), 1);
    }
}`

export let alertHTML2 = 
`<div class="example">
<ngb-alert type="primary">
  <strong>Well done!</strong> You successfully read <a href="javascript:void(0);" class="alert-link">this
    important alert message.</a>
    <button type="button" class="btn-close"><i class="fe fe-x"></i></button>
</ngb-alert>
<ngb-alert type="secondary">
  <strong>Well done!</strong> You successfully read <a href="javascript:void(0);" class="alert-link">this
    important alert message.</a>
    <button type="button" class="btn-close"><i class="fe fe-x"></i></button>
</ngb-alert>
<ngb-alert type="success">
  <strong>Well done!</strong> You successfully read <a href="javascript:void(0);" class="alert-link">this
    important alert message.</a>
    <button type="button" class="btn-close"><i class="fe fe-x"></i></button>
</ngb-alert>
<ngb-alert type="info">
  <strong>Heads up!</strong> This<a href="javascript:void(0);" class="alert-link">needs your attention,</a> but it's not super important 
    <button type="button" class="btn-close"><i class="fe fe-x"></i></button>
</ngb-alert>
<ngb-alert type="warning">
  <strong>Warning!</strong> Better check yourself, you're <a href="javascript:void(0);" class="alert-link">not looking too good.</a>
    <button type="button" class="btn-close"><i class="fe fe-x"></i></button>
</ngb-alert>
<ngb-alert type="danger">
  <strong>Oh snap! Change a few things up</strong> and try submitting  <a href="javascript:void(0);" class="alert-link">
    important dark alert message.</a>
    <button type="button" class="btn-close"><i class="fe fe-x"></i></button>
</ngb-alert>
</div>`
export let alertTS2 = 
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

export let alertHTML3 = 
`<div class="example">
<ngb-alert type="success">
    <button type="button" class="btn-close"><i class="fe fe-x"></i></button>
    <i class="fa fa-check-circle-o me-2" aria-hidden="true"></i> Well done! You successfully read this
    important  message.
</ngb-alert>
<ngb-alert type="info">
    <button type="button" class="btn-close"><i class="fe fe-x"></i></button>
    <i class="fa fa-bell-o me-2" aria-hidden="true"></i>Heads up! This
    alert needs your attention,   super important.
</ngb-alert>
<ngb-alert type="warning">
    <button type="button" class="btn-close"><i class="fe fe-x"></i></button>
    <i class="fa fa-exclamation me-2" aria-hidden="true"></i> Warning!
    Better check yourself, you're not looking  good.
</ngb-alert>
<ngb-alert type="danger">
    <button type="button" class="btn-close"><i class="fe fe-x"></i></button>
    <i class="fa fa-frown-o me-2" aria-hidden="true"></i>Oh snap!Change
    a few things up and try submitting again.
</ngb-alert>
</div>>`
export let alertTS3 = 
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

export let alertHTML4 = 
`<div class="example">
<ngb-alert type="primary" class="alert alert-avatar alert-dismissible">
    <img class="avatar brround cover-image me-2" src="./assets/images/users/14.jpg"/>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
    <button type="button" class="btn-close"><i class="fe fe-x"></i></button>
</ngb-alert>

<ngb-alert type="success" class="alert alert-avatar alert-dismissible">
  <img class="avatar brround cover-image me-2" src="./assets/images/users/5.jpg"/>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
  <button type="button" class="btn-close"><i class="fe fe-x"></i></button>
</ngb-alert>

<ngb-alert type="warning" class="alert alert-avatar alert-dismissible">
  <img class="avatar brround cover-image me-2" src="./assets/images/users/15.jpg"/>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
  <button type="button" class="btn-close"><i class="fe fe-x"></i></button>
</ngb-alert>

<ngb-alert type="danger" class="alert alert-avatar alert-dismissible">
  <img class="avatar brround cover-image" src="./assets/images/users/6.jpg"/>
  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
  <button type="button" class="btn-close"><i class="fe fe-x"></i></button>
</ngb-alert>
</div>`
export let alertTS4 = 
`import { Component } from '@angular/core';

@Component({
    selector: 'app-alerts',
    templateUrl: './alerts.component.html',
    styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent { }`

export let alertHTML5 = 
`<div class="example">
<ngb-alert [type]="alert.type" (closed)="close(alert)" *ngFor="let alert of alertIcon_one" [dismissible]="false">
    <span class="alert-inner--icon me-2"><i class="{{alert.icon}}"></i></span>
    <span class="alert-inner--text">{{ alert.message }}</span>
</ngb-alert>
</div>`
export let alertTS5 = 
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

export let alertHTML6 = 
`<div class="example">
<ngb-alert [type]="alert.type" (closed)="closeIconAlert(alert)" *ngFor="let alert of alertIcon">
    <span class="alert-inner--icon me-2"><i class="{{alert.icon}}"></i></span>
  <span class="alert-inner--text">{{ alert.message }}</span>
  <button type="button" class="btn-close"><i class="fe fe-x"></i></button>
</ngb-alert>
</div>`
export let alertTS6 = 
`import { Component, OnInit } from '@angular/core';

interface AlertIcon {
    icon: string;
    type: string;
    message: string;
  }
  
  const AlertWithIcon: AlertIcon[] = [{
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
export class AlertsComponent implements OnInit {

    alertIcon!: AlertIcon[]

    constructor() { 
    this.alertIcon = AlertWithIcon
    }
 }`

export let alertHTML7 = 
`<div class="text-wrap mb-4">

<ngb-alert type="success">
    <p class="py-3 px-5 mb-0 border-bottom border-bottom-success-light">
      <span class=""><svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" viewBox="0 0 24 24"><path fill="#13bfa6" d="M10.3125,16.09375a.99676.99676,0,0,1-.707-.293L6.793,12.98828A.99989.99989,0,0,1,8.207,11.57422l2.10547,2.10547L15.793,8.19922A.99989.99989,0,0,1,17.207,9.61328l-6.1875,6.1875A.99676.99676,0,0,1,10.3125,16.09375Z"/><path fill="#71d8c9" d="M12,2A10,10,0,1,0,22,12,10.01146,10.01146,0,0,0,12,2Zm5.207,7.61328-6.1875,6.1875a.99963.99963,0,0,1-1.41406,0L6.793,12.98828A.99989.99989,0,0,1,8.207,11.57422l2.10547,2.10547L15.793,8.19922A.99989.99989,0,0,1,17.207,9.61328Z"/></svg></span>
      <strong> Success Message</strong>
    </p>
    <p class="py-3 px-5">You successfully read this important alert message.</p>
    <button type="button" class="btn-close"><i class="fe fe-x"></i></button>
</ngb-alert>
<ngb-alert type="info">
    <p class="py-3 px-5 mb-0 border-bottom border-bottom-info-light">
        <span class=""><svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" viewBox="0 0 24 24"><path fill="#70a9ee" d="M20.05713,22H3.94287A3.02288,3.02288,0,0,1,1.3252,17.46631L9.38232,3.51123a3.02272,3.02272,0,0,1,5.23536,0L22.6748,17.46631A3.02288,3.02288,0,0,1,20.05713,22Z"/><circle cx="12" cy="17" r="1" fill="#1170e4"/><path fill="#1170e4" d="M12,14a1,1,0,0,1-1-1V9a1,1,0,0,1,2,0v4A1,1,0,0,1,12,14Z"/></svg></span>
        <strong> Info Message</strong>
    </p>
    <p class="py-3 px-5">This alert needs your attention, but it's not super important.</p>
    <button type="button" class="btn-close"><i class="fe fe-x"></i></button>
  </ngb-alert>
  <ngb-alert type="warning">
    <p class="py-3 px-5 mb-0 border-bottom border-bottom-info-light">
        <span class=""><svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" viewBox="0 0 24 24"><path fill="#fad383" d="M15.728,22H8.272a1.00014,1.00014,0,0,1-.707-.293l-5.272-5.272A1.00014,1.00014,0,0,1,2,15.728V8.272a1.00014,1.00014,0,0,1,.293-.707l5.272-5.272A1.00014,1.00014,0,0,1,8.272,2H15.728a1.00014,1.00014,0,0,1,.707.293l5.272,5.272A1.00014,1.00014,0,0,1,22,8.272V15.728a1.00014,1.00014,0,0,1-.293.707l-5.272,5.272A1.00014,1.00014,0,0,1,15.728,22Z"/><circle cx="12" cy="16" r="1" fill="#f7b731"/><path fill="#f7b731" d="M12,13a1,1,0,0,1-1-1V8a1,1,0,0,1,2,0v4A1,1,0,0,1,12,13Z"/></svg></span>
        <strong> Warning Message</strong>
    </p>
    <p class="py-3 px-5">This alert needs your attention, but it's not super important.</p>
    <button type="button" class="btn-close"><i class="fe fe-x"></i></button>
  </ngb-alert>
  <ngb-alert type="danger">
    <p class="py-3 px-5 mb-0 border-bottom border-bottom-info-light">
        <span class=""><svg xmlns="http://www.w3.org/2000/svg" height="40" width="40" viewBox="0 0 24 24"><path fill="#f07f8f" d="M20.05713,22H3.94287A3.02288,3.02288,0,0,1,1.3252,17.46631L9.38232,3.51123a3.02272,3.02272,0,0,1,5.23536,0L22.6748,17.46631A3.02288,3.02288,0,0,1,20.05713,22Z"/><circle cx="12" cy="17" r="1" fill="#e62a45"/><path fill="#e62a45" d="M12,14a1,1,0,0,1-1-1V9a1,1,0,0,1,2,0v4A1,1,0,0,1,12,14Z"/></svg></span>
        <strong> Danger Message</strong>
    </p>
    <p class="py-3 px-5">This alert needs your attention, but it's not super important.</p>
    <button type="button" class="btn-close"><i class="fe fe-x"></i></button>
  </ngb-alert>
</div>`
export let alertTS7 = 
`import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-alerts',
    templateUrl: './alerts.component.html',
    styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit { }`

export let alertHTML8 = 
`<ngb-alert type="default">
    <span class="alert-inner--icon"><i class="fe fe-download mr-1"></i></span>
    <span class="alert-inner--text"><strong>Default!</strong> This is a warning alert—check it
        out that has an icon too!</span>
</ngb-alert>
<ngb-alert type="primary">
    <span class="alert-inner--icon"><i class="fe fe-check-square mr-1"></i></span>
    <span class="alert-inner--text"><strong>Primary!</strong> This is a warning alert—check it
        out that has an icon too!</span>
</ngb-alert>
<ngb-alert type="success">
    <span class="alert-inner--icon"><i class="fe fe-thumbs-up mr-1"></i></span>
    <span class="alert-inner--text"><strong>Success!</strong> This is a warning alert—check it
        out that has an icon too!</span>
</ngb-alert>
<ngb-alert type="info">
    <span class="alert-inner--icon"><i class="fe fe-bell mr-1"></i></span>
    <span class="alert-inner--text"><strong>Info!</strong> This is a warning alert—check it out
        that has an icon too!</span>
</ngb-alert>
<ngb-alert type="warning">
    <span class="alert-inner--icon"><i class="fe fe-info mr-1"></i></span>
    <span class="alert-inner--text"><strong>Warning!</strong> This is a warning alert—check it
        out that has an icon too!</span>
</ngb-alert>
<ngb-alert type="danger">
    <span class="alert-inner--icon"><i class="fe fe-slash mr-1"></i></span>
    <span class="alert-inner--text"><strong>Danger!</strong> This is a warning alert—check it
        out that has an icon too!</span>
</ngb-alert>`
export let alertTS8 = 
`import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-alerts',
    templateUrl: './alerts.component.html',
    styleUrls: ['./alerts.component.scss']
})
export class AlertsComponent implements OnInit { }`