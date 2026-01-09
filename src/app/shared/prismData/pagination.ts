export let pageHTML1 = 
`<div class="pagination-wrapper">
<nav aria-label="Page navigation">
    <ul class="pagination mb-0">
        <li class="page-item">
            <a class="page-link" href="javascript:void(0)">1</a>
        </li>
        <li class="page-item">
            <a class="page-link" href="javascript:void(0)">2</a>
        </li>
        <li class="page-item">
            <a class="page-link" href="javascript:void(0)">3</a>
        </li>
        <li class="page-item">
            <a class="page-link" href="javascript:void(0)">4</a>
        </li>
        <li class="page-item">
            <a class="page-link" href="javascript:void(0)">5</a>
        </li>
        <li class="page-item">
            <a aria-label="Next" class="page-link" href="javascript:void(0)"><i class="fa fa-angle-right"></i></a>
        </li>
    </ul>
</nav>
</div>`
export let pageTS1 = 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent { }`

export let pageHTML2 = 
`<ngb-pagination class="d-flex justify-content-start" [collectionSize]="40" [page]="1">
<ng-template ngbPaginationPrevious>Prev</ng-template>
<ng-template ngbPaginationNext>Next</ng-template>
</ngb-pagination>`
export let pageTS2 = 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent { }`

export let pageHTML3 = 
`<ngb-pagination [collectionSize]="30" [page]="2" [boundaryLinks]="true"></ngb-pagination>
`
export let pageTS3 = 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent { }`

export let pageHTML4 = 
`<div class="row">
<div class="col-md-12 col-lg-6 my-2">
    <nav aria-label="Page navigation">
            <ngb-pagination [collectionSize]="40" [page]="1" [maxSize]="1" [rotate]="true" [boundaryLinks]="true"></ngb-pagination>
    </nav>
    
</div>
<div class="col-md-6 col-lg-6 my-2">
    <nav aria-label="Page navigation example ">
            <ngb-pagination class="d-flex justify-content-start mx-4" [collectionSize]="30" [page]="1">
                <ng-template ngbPaginationPrevious><</ng-template>
                <ng-template ngbPaginationNext>></ng-template>
            </ngb-pagination>
    </nav>
</div>
</div>
`
export let pageTS4 = 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent { }`

export let pageHTML5 = 
`<ngb-pagination class="d-flex justify-content-start" [collectionSize]="40" [page]="1" size="sm">
<ng-template ngbPaginationPrevious>Prev</ng-template>
<ng-template ngbPaginationNext>Next</ng-template>
</ngb-pagination>
`
export let pageHTML6 = 
`<nav aria-label="Page navigation example">
<ngb-pagination class="d-flex justify-content-start" [collectionSize]="30" [page]="1">
    <ng-template ngbPaginationPrevious><</ng-template>
    <ng-template ngbPaginationNext>></ng-template>
</ngb-pagination>
</nav><br>
<nav aria-label="Page navigation example">
<div class="pagination justify-content-center">
    <ngb-pagination class="d-flex justify-content-start" [collectionSize]="30" [page]="1">
        <ng-template ngbPaginationPrevious><</ng-template>
        <ng-template ngbPaginationNext>></ng-template>
    </ngb-pagination>
</div>
</nav><br>
<nav aria-label="Page navigation example">
<div class="pagination justify-content-end">
    <ngb-pagination class="d-flex justify-content-start" [collectionSize]="30" [page]="1">
        <ng-template ngbPaginationPrevious><</ng-template>
        <ng-template ngbPaginationNext>></ng-template>
    </ngb-pagination>
</div>
</nav>
`