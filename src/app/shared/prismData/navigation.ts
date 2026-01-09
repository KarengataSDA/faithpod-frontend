export let navHTML1 = 
`<ul ngbNav #nav="ngbNav" [activeId]="1" class="nav1 br-7">
<li [ngbNavItem]="1" class="nav-item1">
  <a ngbNavLink>Active</a>
  <ng-template ngbNavContent></ng-template>
</li>
<li [ngbNavItem]="2" class="nav-item1">
  <a ngbNavLink>Link</a>
  <ng-template ngbNavContent></ng-template>
</li>
<li [ngbNavItem]="3" class="nav-item1">
  <a ngbNavLink>Link</a>
  <ng-template ngbNavContent></ng-template>
</li>
<li [ngbNavItem]="4" [disabled]="true" class="nav-item1">
  <a ngbNavLink>Disabled</a>
  <ng-template ngbNavContent></ng-template>
</li>
</ul>`
export let navTS1 = 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent { }`

export let navHTML2 = 
`<ul ngbNav #nav3="ngbNav" [activeId]="1" class="nav1 nav-column flex-column br-7">
<li [ngbNavItem]="1" class="nav-item1">
  <a ngbNavLink>Active</a>
  <ng-template ngbNavContent></ng-template>
</li>
<li [ngbNavItem]="2" class="nav-item1">
  <a ngbNavLink>Link</a>
  <ng-template ngbNavContent></ng-template>
</li>
<li [ngbNavItem]="3" class="nav-item1">
  <a ngbNavLink>Link</a>
  <ng-template ngbNavContent></ng-template>
</li>
<li [ngbNavItem]="4" [disabled]="true" class="nav-item1">
  <a ngbNavLink>Disabled</a>
  <ng-template ngbNavContent></ng-template>
</li>
</ul>
<div [ngbNavOutlet]="nav3"></div>`
export let navTS2 = 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent { }`

export let navHTML3 = 
`<ul ngbNav #nav="ngbNav" [activeId]="1" class="nav1 br-7">
<li [ngbNavItem]="1" class="nav-item m-2">
  <a ngbNavLink class="btn btn-primary text-white">Active</a>
  <ng-template ngbNavContent></ng-template>
</li>
<li [ngbNavItem]="10">
  <div class="btn-group mt-2 mb-2" ngbDropdown>
    <button type="button" class="btn me-1 text-primary" ngbDropdownToggle>
      Dropdown <span class="caret"></span>
    </button>
    <ul ngbDropdownMenu role="menu">
      <li class="dropdown-plus-title">
        Dropdown
        <b class="fa fa-angle-up" aria-hidden="true"></b>
      </li>
      <li><a href="javascript:;">Action</a></li>
      <li><a href="javascript:;">Another action</a></li>
      <li><a href="javascript:;">Something else here</a></li>
      <li class="divider"></li>
      <li><a href="javascript:;">Separated link</a></li>
    </ul>
  </div>
</li>
<li [ngbNavItem]="3" class="nav-item m-2">
  <a ngbNavLink>Link</a>
  <ng-template ngbNavContent></ng-template>
</li>
<li [ngbNavItem]="4" [disabled]="true" class="nav-item m-2">
  <a ngbNavLink>Disabled</a>
  <ng-template ngbNavContent></ng-template>
</li>
</ul>
<div [ngbNavOutlet]="nav"></div>`
export let navTS3 = 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent { }`

export let navHTML4 = 
`<ul ngbNav #nav4="ngbNav" [activeId]="3" class="nav-pills nav-pills-circle">
<li [ngbNavItem]="1">
  <a class="border py-3 px-5 m-2" ngbNavLink><span class="nav-link-icon d-block"><i class="fe fe-home"></i> Home</span></a>
  <ng-template ngbNavContent></ng-template>
</li>
<li [ngbNavItem]="2">
  <a class="border py-3 px-5 m-2" ngbNavLink><span class="nav-link-icon d-block"><i class="fe fe-unlock"></i> Lock </span></a>
  <ng-template ngbNavContent></ng-template>
</li>
<li [ngbNavItem]="3">
  <a class="border py-3 px-5 m-2" ngbNavLink><span class="nav-link-icon d-block"><i class="fe fe-play"></i> Videos</span></a>
  <ng-template ngbNavContent></ng-template>
</li>
<li [ngbNavItem]="4">
  <a class="border py-3 px-5 m-2" ngbNavLink><span class="nav-link-icon d-block"><i class="fe fe-layers"></i> Severs</span></a>
  <ng-template ngbNavContent></ng-template>
</li>
<li [ngbNavItem]="5">
  <a class="border py-3 px-5 m-2" ngbNavLink><span class="nav-link-icon d-block"><i class="fe fe-image"></i> Gallery </span></a>
  <ng-template ngbNavContent></ng-template>
</li>
</ul>
<div [ngbNavOutlet]="nav4"></div>`
export let navTS4 = 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent { }`

export let navHTML5 = 
`<ul ngbNav #nav5="ngbNav" [activeId]="3" class="nav-pills nav-pills-circle">
<li [ngbNavItem]="1">
  <a class=" border w-8 h-8 text-center br-100 m-2" ngbNavLink><span class="nav-link-icon d-block text-center mx-auto"><i class="fe fe-home fs-20"></i></span></a>
  <ng-template ngbNavContent></ng-template>
</li>
<li [ngbNavItem]="2">
  <a class=" border w-8 h-8 text-center br-100 m-2" ngbNavLink><span class="nav-link-icon d-block text-center mx-auto"><i class="fe fe-unlock fs-20"></i></span></a>
  <ng-template ngbNavContent></ng-template>
</li>
<li [ngbNavItem]="3">
  <a class=" border w-8 h-8 text-center br-100 m-2" ngbNavLink><span class="nav-link-icon d-block text-center mx-auto"><i class="fe fe-play fs-20"></i></span></a>
  <ng-template ngbNavContent></ng-template>
</li>
<li [ngbNavItem]="4">
  <a class=" border w-8 h-8 text-center br-100 m-2" ngbNavLink><span class="nav-link-icon d-block text-center mx-auto"><i class="fe fe-layers fs-20"></i></span></a>
  <ng-template ngbNavContent></ng-template>
</li>
<li [ngbNavItem]="5">
  <a class=" border w-8 h-8 text-center br-100 m-2" ngbNavLink><span class="nav-link-icon d-block text-center mx-auto"><i class="fe fe-image fs-20"></i> </span></a>
  <ng-template ngbNavContent></ng-template>
</li>
</ul>
<div [ngbNavOutlet]="nav5"></div>`
export let navTS5 = 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent { }`

export let navHTML6 = 
` <ul ngbNav #nav6="ngbNav" [activeId]="1" class="nav1 colored bg-primary br-7">
<li [ngbNavItem]="1" class="nav-item1">
  <a ngbNavLink class="nav-link text-white active">Active</a>
  <ng-template ngbNavContent></ng-template>
</li>
<li [ngbNavItem]="2" class="nav-item1">
  <a ngbNavLink class="nav-link text-white active">Link</a>
  <ng-template ngbNavContent></ng-template>
</li>
<li [ngbNavItem]="3" class="nav-item1">
  <a ngbNavLink class="nav-link text-white active">Link</a>
  <ng-template ngbNavContent></ng-template>
</li>
<li [ngbNavItem]="4" [disabled]="true" class="nav-item1">
  <a ngbNavLink class="nav-link disabled text-white-50">Disabled</a>
  <ng-template ngbNavContent></ng-template>
</li>
</ul>
<div [ngbNavOutlet]="nav6"></div>
<ul ngbNav #nav7="ngbNav" [activeId]="1" class="nav1 bg-info mt-4 br-7">
<li [ngbNavItem]="1" class="nav-item1">
  <a ngbNavLink  ngbNavLink class="nav-link text-white active">Active</a>
  <ng-template ngbNavContent></ng-template>
</li>
<li [ngbNavItem]="2" class="nav-item1">
  <a ngbNavLink ngbNavLink class="nav-link text-white active">Link</a>
  <ng-template ngbNavContent></ng-template>
</li>
<li [ngbNavItem]="3" class="nav-item1">
  <a ngbNavLink ngbNavLink class="nav-link text-white active">Link</a>
  <ng-template ngbNavContent></ng-template>
</li>
<li [ngbNavItem]="4" [disabled]="true" class="nav-item1">
  <a ngbNavLink class="nav-link disabled text-white-50">Disabled</a>
  <ng-template ngbNavContent></ng-template>
</li>
</ul>
<div [ngbNavOutlet]="nav7"></div>
<ul ngbNav #nav8="ngbNav" [activeId]="1" class="nav1 colored bg-success mt-4 br-7">
<li [ngbNavItem]="1" class="nav-item1">
  <a ngbNavLink class="nav-link text-white active" class="nav-link text-white active" class="nav-link text-white active">Active</a>
  <ng-template ngbNavContent></ng-template>
</li>
<li [ngbNavItem]="2" class="nav-item1">
  <a ngbNavLink class="nav-link text-white active" class="nav-link text-white active" class="nav-link text-white active">Link</a>
  <ng-template ngbNavContent></ng-template>
</li>
<li [ngbNavItem]="3"  class="nav-item1">
  <a ngbNavLink class="nav-link text-white active" class="nav-link text-white active" class="nav-link text-white active">Link</a>
  <ng-template ngbNavContent></ng-template>
</li>
<li [ngbNavItem]="4" [disabled]="true" class="nav-item1">
  <a ngbNavLink class="nav-link disabled text-white-50">Disabled</a>
  <ng-template ngbNavContent></ng-template>
</li>
</ul>
<div [ngbNavOutlet]="nav10"></div>
<ul ngbNav #nav8="ngbNav" [activeId]="1" class="nav1 colored bg-danger mt-4 br-7">
<li [ngbNavItem]="1" class="nav-item1">
  <a ngbNavLink class="nav-link text-white active" class="nav-link text-white active" class="nav-link text-white active">Active</a>
  <ng-template ngbNavContent></ng-template>
</li>
<li [ngbNavItem]="2" class="nav-item1">
  <a ngbNavLink class="nav-link text-white active" class="nav-link text-white active" class="nav-link text-white active">Link</a>
  <ng-template ngbNavContent></ng-template>
</li>
<li [ngbNavItem]="3"  class="nav-item1">
  <a ngbNavLink class="nav-link text-white active" class="nav-link text-white active" class="nav-link text-white active">Link</a>
  <ng-template ngbNavContent></ng-template>
</li>
<li [ngbNavItem]="4" [disabled]="true" class="nav-item1">
  <a ngbNavLink class="nav-link disabled text-white-50">Disabled</a>
  <ng-template ngbNavContent></ng-template>
</li>
</ul>
<div [ngbNavOutlet]="nav8"></div>
<ul ngbNav #nav9="ngbNav" [activeId]="1" class="nav1 colored bg-secondary mt-4 br-7">
<li [ngbNavItem]="1" class="nav-item1">
  <a ngbNavLink class="nav-link text-white active">Active</a>
  <ng-template ngbNavContent></ng-template>
</li>
<li [ngbNavItem]="2" class="nav-item1">
  <a ngbNavLink class="nav-link text-white active">Link</a>
  <ng-template ngbNavContent></ng-template>
</li>
<li [ngbNavItem]="3" class="nav-item1">
  <a ngbNavLink class="nav-link text-white active">Link</a>
  <ng-template ngbNavContent></ng-template>
</li>
<li [ngbNavItem]="4" [disabled]="true" class="nav-item1">
  <a ngbNavLink class="nav-link disabled text-white-50">Disabled</a>
  <ng-template ngbNavContent></ng-template>
</li>
</ul>
<div [ngbNavOutlet]="nav9"></div>
<ul ngbNav #nav10="ngbNav" [activeId]="1" class="nav1 colored bg-warning mt-4 br-7">
<li [ngbNavItem]="1" class="nav-item1">
  <a ngbNavLink class="nav-link text-white active" class="nav-link text-white active">Active</a>
  <ng-template ngbNavContent></ng-template>
</li>
<li [ngbNavItem]="2" class="nav-item1">
  <a ngbNavLink class="nav-link text-white active" class="nav-link text-white active">Link</a>
  <ng-template ngbNavContent></ng-template>
</li>
<li [ngbNavItem]="3" class="nav-item1">
  <a ngbNavLink class="nav-link text-white active" class="nav-link text-white active">Link</a>
  <ng-template ngbNavContent></ng-template>
</li>
<li [ngbNavItem]="4" [disabled]="true" class="nav-item1">
  <a ngbNavLink class="nav-link disabled text-white-50">Disabled</a>
  <ng-template ngbNavContent></ng-template>
</li>
</ul>
`
export let navTS6 = 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent { }`

export let navHTML7 = 
`<div class="p-3 bg-light border">
    <nav ngbNav #nav1="ngbNav" class=" main-nav-line flex-column flex-md-row">
        <ng-container ngbNavItem>
            <a ngbNavLink>Home</a>
        </ng-container>
        <ng-container ngbNavItem>
            <a ngbNavLink>About</a>
        </ng-container>
        <ng-container ngbNavItem>
            <a ngbNavLink>Pages</a>
        </ng-container>
        <ng-container ngbNavItem>
            <a ngbNavLink>Custom</a>
        </ng-container>
    </nav>
</div>`
export let navTS7 = 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent { }`

export let navHTML8 = 
`<div class="border">
    <div class="bg-gray-100 nav-bg">
        <nav ngbNav #nav9="ngbNav" class="nav-tabs">
            <ng-container ngbNavItem>
                <a ngbNavLink>Home</a>
                <ng-template ngbNavContent>
                    <p>	Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo
                        minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis
                        dolor repellendus.</p>
                </ng-template>
            </ng-container>									
            <ng-container ngbNavItem>
                <a ngbNavLink>About</a>
                <ng-template ngbNavContent>
                    <p>At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis
                        praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias
                        excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui
                        officia deserunt mollitia animi, id est laborum et dolorum fuga.</p>
                </ng-template>
            </ng-container>
            <ng-container ngbNavItem>
                <a ngbNavLink>Contact</a>
                <ng-template ngbNavContent>
                    <p>	Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus
                        maiores alias consequatur aut perferendis doloribus asperiores repellat.</p>
                </ng-template>
            </ng-container>
            
        </nav>

    </div>
    <div class="card-body tab-content">
        <div class="tab-pane active show">
            <div [ngbNavOutlet]="nav9"></div>
        </div>
    </div>
</div>`
export let navTS8 = 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent { }`
