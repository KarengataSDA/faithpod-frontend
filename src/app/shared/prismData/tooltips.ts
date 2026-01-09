export let tooltipHTML1 = 
`<div class="row  text-center">
<div class="col-sm-6 col-xl-3 mt-2 mb-2">
    <button class="btn btn-primary" placement="top" ngbTooltip="Tooltip on top">Hover me</button>
</div>
<div class="col-sm-6 col-xl-3  mt-2 mb-2">
    <button class="btn btn-primary" placement="bottom" ngbTooltip="Tooltip on Bottom">Hover me</button>
</div>
<div class="col-sm-6 col-xl-3  mt-2 mb-2">
    <button class="btn btn-primary" placement="left" ngbTooltip="Tooltip on left">Hover me</button>
</div>
<div class="col-sm-6 col-xl-3  mt-2 mb-2">
    <button class="btn btn-primary" placement="right" ngbTooltip="Tooltip on right">Hover me</button>
</div>
</div>`
export let tooltipTS1 = 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent { }`


export let tooltipHTML2 = 
`<div class="row  text-center">
<div class="col-sm-6 col-xl-3  mt-2 mb-2">
    <button class="btn btn-primary"placement="top" tooltipClass="tooltip-primary" ngbTooltip="Tooltip on top">Hover me</button>
</div>
<div class="col-sm-6 col-xl-3  mt-2 mb-2">
    <button class="btn btn-secondary" placement="bottom" tooltipClass="tooltip-secondary" ngbTooltip="Tooltip on bottom">Hover me</button>
</div>
<div class="col-sm-6 col-xl-3  mt-2 mb-2">
    <button class="btn btn-danger" placement="left" tooltipClass="tooltip-danger" ngbTooltip="Tooltip on left">Hover me</button>
</div>
<div class="col-sm-6 col-xl-3  mt-2 mb-2">
    <button class="btn btn-info" placement="right" tooltipClass="tooltip-info" ngbTooltip="Tooltip on right">Hover me</button>
</div>
</div>`
export let tooltipTS2 = 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss']
})
export class TooltipComponent { }`
export let tooltipHTML3 = 
`<div class="row row-sm text-center">
<div class="col-sm-6 col-xl-3  mt-2 mb-2">
    <button class="btn btn-primary"container="button" ngbPopover="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." placement="top" popover-color="default" toggle="popover" popoverTitle="Popover top" >Click me</button>
</div>
<div class="col-sm-6 col-xl-3  mt-2 mb-2">
    <button class="btn btn-success" container="button" ngbPopover="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." placement="left" popover-color="default" toggle="popover" popoverTitle="Popover Left" >Click me</button>
</div>
<div class="col-sm-6 col-xl-3  mt-2 mb-2">
    <button class="btn btn-danger" container="button" ngbPopover="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." placement="right" popover-color="default" toggle="popover" popoverTitle="Popover Right" >Click me</button>
</div>
<div class="col-sm-6 col-xl-3  mt-2 mb-2">
    <button class="btn btn-warning" container="button" ngbPopover="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." placement="bottom" popover-color="default" toggle="popover" popoverTitle="Popover Bottom" >Click me</button>
</div>
</div>
`
export let tooltipHTML4 = 
`<div class="row row-sm text-center">
<div class="col-sm-6 col-lg-3 mt-2 mb-2 text-center">
    <button class="btn btn-primary" container="button" ngbPopover="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." placement="top" popoverClass="popover-head-primary" popoverTitle="Popover top" >Click me</button>
</div>
<div class="col-sm-6 col-lg-3 mt-2 mb-2text-center">
    <button class="btn btn-secondary" container="button" ngbPopover="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." placement="bottom" popoverClass="popover-head-secondary" popoverTitle="Popover bottom" >Click me</button>
</div>
</div>
`
export let tooltipHTML5 = 
`<div class="row row-sm text-center">
<div class="col-sm-6 col-lg-3  mt-2 mb-2">
    <button class="btn btn-primary" container="button" ngbPopover="Vivamus sagittis lacus vel augue laoreet rutrum faucibus." placement="top" popoverClass="popover-primary" popoverTitle="Popover top">Click me</button>
</div>
<div class="col-sm-6 col-lg-3  mt-2 mb-2">
    <button class="btn btn-secondary" container="button" ngbPopover="Vivamus sagittis lacus vel augue." placement="top" popoverClass="popover-secondary" popoverTitle="Popover top" >Click me</button>
</div>
</div>
`
