export let toastHTML1 = 
`<ngb-toast *ngIf="show" [autohide]="false" (hidden)="show=false">
                            
<ng-template ngbToastHeader>
	<div class="me-auto d-flex justify-content-between w-100">
		<div class="d-flex">
			<img src="./assets/images/brand/main-logo.svg" class="rounded me-2" alt="img" height="16">
			<strong class="tx-14 mg-b-0 mg-r-auto">Bootstrap</strong>
		</div>
		<div class="d-flex ms-auto">
			<small class="text-muted me-2 lh-lg">11 mins ago</small>
			<button class="btn btn-close ms-0">
				<span aria-hidden="true">×</span>
			</button>
		</div>
	</div>
</ng-template>
Hello, world! This is a toast message.
</ngb-toast>`
export let toastTS1 = 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
	show=true
	show1=true
	show2=true
	show3=true
	show4=true
	show5=true
	show6=true
	show7=true
	show8=true
	show9=true
	show10=true
	liveShow= false
 
	LiveShow = ()=>{
	  this.liveShow = true
	}
 
	hidden = ()=>{
	 this.show9=false
	}
 
	contentClose(){
	  this.show10=false
	}
 
}`

export let toastHTML2 = 
` <ngb-toast *ngIf="show1" [autohide]="false" (hidden)="show1=false">
<ng-template ngbToastHeader>
  <div class="me-auto d-flex justify-content-between w-100">
	<div class="d-flex">
	  <img src="./assets/images/brand/main-logo.svg" class="rounded me-2" alt="img" height="16">
	  <strong class="tx-14 mg-b-0 mg-r-auto">Bootstrap</strong>
	</div>
	<div class="d-flex">
		<small class="text-muted me-2 lh-lg">11 mins ago</small>
		<button class="btn btn-close ms-0">
			<span aria-hidden="true">×</span>
		</button>
	</div>      
  </div>

</ng-template>
Hello, world! This is a toast message.
</ngb-toast>`
export let toastTS2 = 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  show1 = true;
}`
export let PLACEMENT_HTML = `
<div class="text-wrap  mb-3">
						<div class="example">
							<div class="ht-150 pos-relative mb-3">
								<div class="demo-static-toast pos-absolute t-10">
									<ngb-toast *ngIf="show3" [autohide]="false" (hidden)="show3=false">
									  <ng-template ngbToastHeader>
										<h6 class="tx-14 mg-b-0 mg-r-auto">Notification</h6><small class="text-muted me-3">11 mins ago</small>
									  </ng-template>
									  Hello, world! This is a toast message.
									</ngb-toast>
								</div>
							</div>
						</div>
					</div>
					<div class="text-wrap  mb-3">
						<div class="example">
							<div class="demo-static-toast d-flex justify-content-center align-items-center">
								<ngb-toast *ngIf="show5" [autohide]="false" (hidden)="show4=false">
									<ng-template ngbToastHeader>
									  <h6 class="tx-14 mg-b-0 mg-r-auto">Notification</h6><small class="text-muted me-3">11 mins ago</small>
									</ng-template>
									Hello, world! This is a toast message.
								  </ngb-toast>
							</div>
						</div>
					</div>
					<div class="text-wrap ">
						<div class="example">
							<div class="ht-150 pos-relative">
								<div class="demo-static-toast pos-absolute b-10 r-10">
									<ngb-toast *ngIf="show4" [autohide]="false" (hidden)="show4=false">
										<ng-template ngbToastHeader>
										  <h6 class="tx-14 mg-b-0 mg-r-auto">Notification</h6><small class="text-muted me-3">11 mins ago</small>
										</ng-template>
										Hello, world! This is a toast message.
									</ngb-toast>
								</div>
							</div>
						</div>
					</div>
`

export let PLACEMENT_TS = `
import { Component } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  show3 = true;
  show4 = true;
  show4 = true;
`

export let toastHTML3 = 
` <ngb-toast *ngIf="show9" [autohide]="false">
<div class="align-items-center show" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false">
	<div class="d-flex">
		<div class="toast-body">
			Hello, world! This is a toast message.
		</div>
		<button aria-label="Close" class="btn-close fs-20 ms-auto mt-2 pe-2" data-bs-dismiss="toast" (click)="hidden()"><span aria-hidden="true"><i class="fe fe-x fs-18"></i></span></button>
	</div>
</div>
</ngb-toast>`
export let toastTS3 = 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  show2 = true;
  show3 = true;
}`

export let toastHTML4 = 
`<div class="row">
<div class="col-md-6">
	<ngb-toast *ngIf="show9" class="bg-primary" [autohide]="false">
		<div class="align-items-center show" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false">
			<div class="d-flex">
				<div class="text-white">
					Hello, world! This is a toast message.
				</div>
				<button aria-label="Close" class="btn-close fs-20 ms-auto text-white  pe-2" data-bs-dismiss="toast" (click)="hidden()"><span aria-hidden="true"><i class="fe fe-x fs-18"></i></span></button>
			</div>
		</div>
	</ngb-toast>
</div>
<div class="col-md-6 mt-2 mt-md-0">
	<ngb-toast *ngIf="show9" class="bg-secondary" [autohide]="false">
		<div class="align-items-center show" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false">
			<div class="d-flex">
				<div class="text-white">
					Hello, world! This is a toast message.
				</div>
				<button aria-label="Close" class="btn-close fs-20 ms-auto text-white  pe-2" data-bs-dismiss="toast" (click)="hidden()"><span aria-hidden="true"><i class="fe fe-x fs-18"></i></span></button>
			</div>
		</div>
	</ngb-toast>
</div>
<div class="col-md-6 mt-2">
	<ngb-toast *ngIf="show9" class="bg-success" [autohide]="false">
		<div class="align-items-center show" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false">
			<div class="d-flex">
				<div class="text-white">
					Hello, world! This is a toast message.
				</div>
				<button aria-label="Close" class="btn-close fs-20 ms-auto text-white pe-2" data-bs-dismiss="toast" (click)="hidden()"><span aria-hidden="true"><i class="fe fe-x fs-18"></i></span></button>
			</div>
		</div>
	</ngb-toast>
</div>
<div class="col-md-6 mt-2">
	<ngb-toast *ngIf="show9" class="bg-danger" [autohide]="false">
		<div class="align-items-center show" role="alert" aria-live="assertive" aria-atomic="true" data-bs-autohide="false">
			<div class="d-flex">
				<div class="text-white">
					Hello, world! This is a toast message.
				</div>
				<button aria-label="Close" class="btn-close fs-20 ms-auto text-white  pe-2" data-bs-dismiss="toast" (click)="hidden()"><span aria-hidden="true"><i class="fe fe-x fs-18"></i></span></button>
			</div>
		</div>
	</ngb-toast>
</div>
</div>`
export let toastTS4 = 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent {
  
  isclose = true;

  close() {
    this.isclose = false;
    setTimeout(() => this.isclose = true, 3000);
  }
}`

export let toastHTML5 = 
`<div class="p-4 bg-light border">
<div class="my-3">
	<ngb-toast *ngIf="show7" [autohide]="false" (hidden)="show7=false">
		<ng-template ngbToastHeader>
		  <div class="me-auto d-flex justify-content-between w-100">
			<div class="d-flex">
			  <img src="./assets/images/brand/main-logo.svg" class="rounded me-2" alt="img" height="16">
			  <strong class="tx-14 mg-b-0 mg-r-auto">Bootstrap</strong>
			</div>
			<div class="d-flex ms-auto">
				<small class="text-muted me-2 lh-lg">just now</small>
				<button class="btn btn-close ms-0">
					<span aria-hidden="true">×</span>
				</button>
			</div>
				
		  </div>

		</ng-template>
		See? Just like this.
	</ngb-toast>
</div>
	<ngb-toast *ngIf="show8" [autohide]="false" (hidden)="show8=false">
		<ng-template ngbToastHeader>
		  <div class="me-auto d-flex justify-content-between w-100">
			<div class="d-flex">
			  <img src="./assets/images/brand/main-logo.svg" class="rounded me-2" alt="img" height="16">
			  <strong class="tx-14 mg-b-0 mg-r-auto">Bootstrap</strong>
			</div>
			<div class="d-flex ms-auto">
				<small class="text-muted me-2 lh-lg">2 mins ago</small>
				<button class="btn btn-close ms-0">
					<span aria-hidden="true">×</span>
				</button>
			</div>
		  </div>

		</ng-template>
		Heads up, toasts will stack automatically
	</ngb-toast>
</div>`
export let toastTS5 = 
`import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {

  show5 = false;
  autohide: boolean = true;

}`
export let tostHTML6 = `
<ngb-toast *ngIf="show6" [autohide]="false" (hidden)="show6=false">
                            <ng-template ngbToastHeader>
                              <div class="me-auto d-flex justify-content-between w-100">
                                <div class="d-flex">
                                  <img src="./assets/images/brand/main-logo.svg" class="rounded me-2" alt="img" height="16">
                                  <strong class="tx-14 mg-b-0 mg-r-auto">Bootstrap</strong>
                                </div>
                                <div class="d-flex ms-auto">
                                    <small class="text-muted me-2 lh-lg">11 mins ago</small>
                                    <button class="btn btn-close ms-0">
                                        <span aria-hidden="true">×</span>
                                    </button>
                                </div>
                              </div>

                            </ng-template>
                            Hello, world! This is a toast message.
                        </ngb-toast>
`

export let toastTS6 = `
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
show5 = true;
show6 = true;
show7 = true;
show8 = true;
}
`