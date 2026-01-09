export let popHTML1 = 
`<div class="pd-20 bg-gray-200">
    <div class="row row-sm tx-center">
        <div class="col-sm-6 col-lg-3">
            <button type="button" class="btn ripple btn-primary" placement="top"
            ngbPopover="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
            popoverTitle="Popover on top">
            Popover Top
        </button>
        </div>
        <div class="col-sm-6 col-lg-3 mg-t-30 mg-sm-t-0">
            <button type="button" class="btn ripple btn-primary" placement="bottom"
            ngbPopover="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
            popoverTitle="Popover on bottom">
            Popover Bottom
        </button>
        </div>
        <div class="col-sm-6 col-lg-3 mg-t-30 mg-lg-t-0">
            <button type="button" class="btn ripple btn-primary" placement="left"
                ngbPopover="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                popoverTitle="Popover on left">
                Popover Left
            </button>
        </div>
        <div class="col-sm-6 col-lg-3 mg-t-30 mg-lg-t-0">
            <button type="button" class="btn ripple btn-primary" placement="right"
                ngbPopover="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
                popoverTitle="Popover on right">
                Popover Right
            </button>

        </div>
    </div>
</div>`
export let popTS1 = 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent { }`


export let popHTML2 = 
`<div class="row row-sm tx-center">
    <div class="col-sm-6 col-lg-3">
        <button type="button" class="btn ripple btn-primary " placement="top"
        ngbPopover="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
        popoverTitle="Popover on top" popoverClass="popover-head-primary">
        Header Color
    </button>

    </div>
    <div class="col-sm-6 col-lg-3 mg-t-30 mg-sm-t-0">
        <button type="button" class="btn ripple btn-secondary" placement="bottom"
        ngbPopover="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
        popoverTitle="Popover on bottom" popoverClass="popover-head-secondary ">
        Header Color
    </button>
    </div>
</div>`

export let popTS2 = 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent { }`


export let popHTML3 = 
`<div class="row row-sm tx-center">
    <div class="col-sm-6 col-lg-3">
        <button type="button" class="btn ripple btn-primary" placement="top"
        ngbPopover="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
        popoverTitle="Popover on top" popoverClass="popover-primary">
        Header Color
    </button>

    </div>
    <div class="col-sm-6 col-lg-3 mg-t-30 mg-sm-t-0">
        <button type="button" class="btn ripple btn-secondary" placement="top"
        ngbPopover="Vivamus sagittis lacus vel augue laoreet rutrum faucibus."
        popoverTitle="Popover on top" popoverClass="popover-secondary">
        Header Color
    </button>
    </div>
</div>`
export let popTS3 = 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class PopoverComponent { }`

