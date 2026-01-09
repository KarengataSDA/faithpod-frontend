export let tabsHTML1 = 
`<div class="panel panel-primary">
<div class="tab-menu-heading">
    <div class="tabs-menu ">
        <!-- Tabs -->
        <ul ngbNav #nav="ngbNav" [activeId]="1" class="panel-tabs">
            <li class="me-2 mb-1" [ngbNavItem]="1">
              <a ngbNavLink>Tab 1</a>
              <ng-template ngbNavContent>
                <p>page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like</p>
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et</p>
              </ng-template>
            </li>
            <li class="me-2 mb-1" [ngbNavItem]="2">
              <a ngbNavLink>Tab 2</a>
              <ng-template ngbNavContent>
                <div class="tab-pane">
                    <p>Et sanctus accusam tempor diam est rebum duo sadipscing, sit diam sed rebum sea at eos. Et dolores dolor invidunt kasd, consetetur eirmod sed ipsum et lorem magna takimata. Et tempor takimata eirmod amet amet.</p>
                    <p>Clita sit dolores clita et clita et. Labore dolores ut eos sit dolor sanctus labore. Dolore lorem sanctus ut dolore tempor sed amet elitr.</p>
                </div>
              </ng-template>
            </li>
            <li class="me-2 mb-1" [ngbNavItem]="3">
              <a ngbNavLink>Tab 3</a>
              <ng-template ngbNavContent>
                <div class="tab-pane">
                    <p>Sea ea sit sadipscing no dolore elitr kasd gubergren et, dolore aliquyam sit magna aliquyam. Eirmod ut dolor sed vero. Lorem nonumy lorem sed sanctus diam aliquyam, et ipsum consetetur.</p>
                    <p>Est stet ipsum et aliquyam eos et ipsum diam duo clita. Sed eirmod sadipscing amet sadipscing nonumy magna aliquyam elitr voluptua,.</p>
                </div>
              </ng-template>
            </li>
            <li class="me-2 mb-1" [ngbNavItem]="4">
              <a ngbNavLink>Tab 4</a>
              <ng-template ngbNavContent>
                <div class="tab-pane">
                    <p>No voluptua tempor est nonumy clita eirmod vero duo, tempor ipsum eirmod est nonumy et accusam vero. Et erat takimata dolores elitr,.</p>
                    <p>Ut ea et et accusam labore sadipscing accusam eirmod dolor et, tempor rebum est sit sadipscing nonumy invidunt lorem accusam invidunt, accusam duo.</p>
                </div>
              </ng-template>
            </li>
          </ul>             
    </div>
</div>
<div class="panel-body tabs-menu-body">
    <div [ngbNavOutlet]="nav"></div>
</div>
</div `
export let tabsTS1 = 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class tabsComponent {
  TabStyle4:any

 }`

export let tabsHTML2 = 
`<div class="panel panel-primary">
<div class="tab-menu-heading">
    <div class="tabs-menu1 ">
        <!-- Tabs -->
        <ul ngbNav #nav1="ngbNav" [activeId]="5" class="panel-tabs">
            <li class="" [ngbNavItem]="5">
              <a ngbNavLink>Tab 1</a>
              <ng-template ngbNavContent>
                <p>page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like</p>
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et</p>
              </ng-template>
            </li>
            <li class="" [ngbNavItem]="6">
              <a ngbNavLink>Tab 2</a>
              <ng-template ngbNavContent>
                <div class="tab-pane">
                    <p>Et sanctus accusam tempor diam est rebum duo sadipscing, sit diam sed rebum sea at eos. Et dolores dolor invidunt kasd, consetetur eirmod sed ipsum et lorem magna takimata. Et tempor takimata eirmod amet amet.</p>
                    <p>Clita sit dolores clita et clita et. Labore dolores ut eos sit dolor sanctus labore. Dolore lorem sanctus ut dolore tempor sed amet elitr.</p>
                </div>
              </ng-template>
            </li>
            <li class="" [ngbNavItem]="7">
              <a ngbNavLink>Tab 3</a>
              <ng-template ngbNavContent>
                <div class="tab-pane">
                    <p>Sea ea sit sadipscing no dolore elitr kasd gubergren et, dolore aliquyam sit magna aliquyam. Eirmod ut dolor sed vero. Lorem nonumy lorem sed sanctus diam aliquyam, et ipsum consetetur.</p>
                    <p>Est stet ipsum et aliquyam eos et ipsum diam duo clita. Sed eirmod sadipscing amet sadipscing nonumy magna aliquyam elitr voluptua,.</p>
                </div>
              </ng-template>
            </li>
            <li class="" [ngbNavItem]="8">
              <a ngbNavLink>Tab 4</a>
              <ng-template ngbNavContent>
                <div class="tab-pane">
                    <p>No voluptua tempor est nonumy clita eirmod vero duo, tempor ipsum eirmod est nonumy et accusam vero. Et erat takimata dolores elitr,.</p>
                    <p>Ut ea et et accusam labore sadipscing accusam eirmod dolor et, tempor rebum est sit sadipscing nonumy invidunt lorem accusam invidunt, accusam duo.</p>
                </div>
              </ng-template>
            </li>
          </ul>             
    </div>
</div>
<div class="panel-body tabs-menu-body">
    <div [ngbNavOutlet]="nav1"></div>
</div>
</div>`
export let tabsTS2 = 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class tabsComponent { }`

export let tabsHTML3 = 
`<div class="panel panel-primary">
<div class="tab-menu-heading tab-menu-heading-boxed">
    <div class="tabs-menu tabs-menu-boxed ">
        <!-- Tabs -->
        <ul ngbNav #nav4="ngbNav" [activeId]="1" class="panel-tabs">
            <li class="" [ngbNavItem]="1">
              <a ngbNavLink>Tab 1</a>
              <ng-template ngbNavContent>
                <p>page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like</p>
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et</p>
              </ng-template>
            </li>
            <li class="" [ngbNavItem]="2">
              <a ngbNavLink>Tab 2</a>
              <ng-template ngbNavContent>
                <div class="tab-pane">
                    <p>Et sanctus accusam tempor diam est rebum duo sadipscing, sit diam sed rebum sea at eos. Et dolores dolor invidunt kasd, consetetur eirmod sed ipsum et lorem magna takimata. Et tempor takimata eirmod amet amet.</p>
                    <p>Clita sit dolores clita et clita et. Labore dolores ut eos sit dolor sanctus labore. Dolore lorem sanctus ut dolore tempor sed amet elitr.</p>
                </div>
              </ng-template>
            </li>
            <li class="" [ngbNavItem]="3">
              <a ngbNavLink>Tab 3</a>
              <ng-template ngbNavContent>
                <div class="tab-pane">
                    <p>Sea ea sit sadipscing no dolore elitr kasd gubergren et, dolore aliquyam sit magna aliquyam. Eirmod ut dolor sed vero. Lorem nonumy lorem sed sanctus diam aliquyam, et ipsum consetetur.</p>
                    <p>Est stet ipsum et aliquyam eos et ipsum diam duo clita. Sed eirmod sadipscing amet sadipscing nonumy magna aliquyam elitr voluptua,.</p>
                </div>
              </ng-template>
            </li>
            <li class="" [ngbNavItem]="4">
              <a ngbNavLink>Tab 4</a>
              <ng-template ngbNavContent>
                <div class="tab-pane">
                    <p>No voluptua tempor est nonumy clita eirmod vero duo, tempor ipsum eirmod est nonumy et accusam vero. Et erat takimata dolores elitr,.</p>
                    <p>Ut ea et et accusam labore sadipscing accusam eirmod dolor et, tempor rebum est sit sadipscing nonumy invidunt lorem accusam invidunt, accusam duo.</p>
                </div>
              </ng-template>
            </li>
          </ul>             
    </div>
</div>
<div class="panel-body tabs-menu-body">
    <div [ngbNavOutlet]="nav4"></div>
</div>
</div>`
export let tabsTS3 = 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class tabsComponent { }`

export let tabsHTML4 = 
`<div class="panel panel-primary">
<div class="tab-menu-heading tab-menu-heading-boxed">
    <div class="tabs-menu tabs-menu-border ">
        <!-- Tabs -->
        <ul ngbNav #nav2="ngbNav" [activeId]="1" class="panel-tabs">
            <li class="" [ngbNavItem]="1">
              <a ngbNavLink>Tab 1</a>
              <ng-template ngbNavContent>
                <p>page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like</p>
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et</p>
              </ng-template>
            </li>
            <li class="" [ngbNavItem]="2">
              <a ngbNavLink>Tab 2</a>
              <ng-template ngbNavContent>
                <div class="tab-pane">
                    <p>Et sanctus accusam tempor diam est rebum duo sadipscing, sit diam sed rebum sea at eos. Et dolores dolor invidunt kasd, consetetur eirmod sed ipsum et lorem magna takimata. Et tempor takimata eirmod amet amet.</p>
                    <p>Clita sit dolores clita et clita et. Labore dolores ut eos sit dolor sanctus labore. Dolore lorem sanctus ut dolore tempor sed amet elitr.</p>
                </div>
              </ng-template>
            </li>
            <li class="" [ngbNavItem]="3">
              <a ngbNavLink>Tab 3</a>
              <ng-template ngbNavContent>
                <div class="tab-pane">
                    <p>Sea ea sit sadipscing no dolore elitr kasd gubergren et, dolore aliquyam sit magna aliquyam. Eirmod ut dolor sed vero. Lorem nonumy lorem sed sanctus diam aliquyam, et ipsum consetetur.</p>
                    <p>Est stet ipsum et aliquyam eos et ipsum diam duo clita. Sed eirmod sadipscing amet sadipscing nonumy magna aliquyam elitr voluptua,.</p>
                </div>
              </ng-template>
            </li>
            <li class="" [ngbNavItem]="4">
              <a ngbNavLink>Tab 4</a>
              <ng-template ngbNavContent>
                <div class="tab-pane">
                    <p>No voluptua tempor est nonumy clita eirmod vero duo, tempor ipsum eirmod est nonumy et accusam vero. Et erat takimata dolores elitr,.</p>
                    <p>Ut ea et et accusam labore sadipscing accusam eirmod dolor et, tempor rebum est sit sadipscing nonumy invidunt lorem accusam invidunt, accusam duo.</p>
                </div>
              </ng-template>
            </li>
          </ul>             
    </div>
</div>
<div class="panel-body tabs-menu-body">
    <div [ngbNavOutlet]="nav2"></div>
</div>
</div>`
export let tabsTS4 = 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class tabsComponent { }`

export let tabsHTML5 = 
`<div class="panel panel-primary">
<div class="tab-menu-heading">
    <div class="tabs-menu">
        <!-- Tabs -->
        <ul ngbNav #nav3="ngbNav" [activeId]="1" class="nav panel-tabs panel-secondary">
            <li [ngbNavItem]="1">
              <a ngbNavLink class=""><i class="fe fe-user me-1"></i>Tab 1</a>
              <ng-template ngbNavContent>
                <p>page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like</p>
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et</p>
              </ng-template>
            </li>
            <li [ngbNavItem]="2">
              <a ngbNavLink class=""><i class="fe fe-calendar me-1"></i>Tab 2</a>
              <ng-template ngbNavContent>
                <div class="tab-pane">
                    <p>Et sanctus accusam tempor diam est rebum duo sadipscing, sit diam sed rebum sea at eos. Et dolores dolor invidunt kasd, consetetur eirmod sed ipsum et lorem magna takimata. Et tempor takimata eirmod amet amet.</p>
                    <p>Clita sit dolores clita et clita et. Labore dolores ut eos sit dolor sanctus labore. Dolore lorem sanctus ut dolore tempor sed amet elitr.</p>
                </div>
              </ng-template>
            </li>
            <li [ngbNavItem]="3">
              <a ngbNavLink class=""><i class="fe fe-settings me-1"></i>Tab 3</a>
              <ng-template ngbNavContent>
                <div class="tab-pane">
                    <p>Sea ea sit sadipscing no dolore elitr kasd gubergren et, dolore aliquyam sit magna aliquyam. Eirmod ut dolor sed vero. Lorem nonumy lorem sed sanctus diam aliquyam, et ipsum consetetur.</p>
                    <p>Est stet ipsum et aliquyam eos et ipsum diam duo clita. Sed eirmod sadipscing amet sadipscing nonumy magna aliquyam elitr voluptua,.</p>
                </div>
              </ng-template>
            </li>
            <li [ngbNavItem]="4">
              <a ngbNavLink class=""><i class="fe fe-bell me-1"></i>Tab 4</a>
              <ng-template ngbNavContent>
                <div class="tab-pane">
                    <p>No voluptua tempor est nonumy clita eirmod vero duo, tempor ipsum eirmod est nonumy et accusam vero. Et erat takimata dolores elitr,.</p>
                    <p>Ut ea et et accusam labore sadipscing accusam eirmod dolor et, tempor rebum est sit sadipscing nonumy invidunt lorem accusam invidunt, accusam duo.</p>
                </div>
              </ng-template>
            </li>
          </ul>             
    </div>
</div>
<div class="panel-body tabs-menu-body">
    <div [ngbNavOutlet]="nav3"></div>
</div>
</div>`
export let tabsTS5 = 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class tabsComponent { }`

export let tabsHTML6 = 
`<div class="panel panel-primary">
<div class="tab-menu-heading">
    <div class="tabs-menu">
        <!-- Tabs -->
        <ul ngbNav #nav6="ngbNav" [activeId]="1" class="nav panel-tabs panel-danger">
            <li [ngbNavItem]="1">
              <a ngbNavLink class=""><i class="fe fe-user me-1"></i>Tab 1</a>
              <ng-template ngbNavContent>
                <p>page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like</p>
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et</p>
              </ng-template>
            </li>
            <li [ngbNavItem]="2">
              <a ngbNavLink class=""><i class="fe fe-calendar me-1"></i>Tab 2</a>
              <ng-template ngbNavContent>
                <div class="tab-pane">
                    <p>Et sanctus accusam tempor diam est rebum duo sadipscing, sit diam sed rebum sea at eos. Et dolores dolor invidunt kasd, consetetur eirmod sed ipsum et lorem magna takimata. Et tempor takimata eirmod amet amet.</p>
                    <p>Clita sit dolores clita et clita et. Labore dolores ut eos sit dolor sanctus labore. Dolore lorem sanctus ut dolore tempor sed amet elitr.</p>
                </div>
              </ng-template>
            </li>
            <li [ngbNavItem]="3">
              <a ngbNavLink class=""><i class="fe fe-settings me-1"></i>Tab 3</a>
              <ng-template ngbNavContent>
                <div class="tab-pane">
                    <p>Sea ea sit sadipscing no dolore elitr kasd gubergren et, dolore aliquyam sit magna aliquyam. Eirmod ut dolor sed vero. Lorem nonumy lorem sed sanctus diam aliquyam, et ipsum consetetur.</p>
                    <p>Est stet ipsum et aliquyam eos et ipsum diam duo clita. Sed eirmod sadipscing amet sadipscing nonumy magna aliquyam elitr voluptua,.</p>
                </div>
              </ng-template>
            </li>
            <li [ngbNavItem]="4">
              <a ngbNavLink class=""><i class="fe fe-bell me-1"></i>Tab 4</a>
              <ng-template ngbNavContent>
                <div class="tab-pane">
                    <p>No voluptua tempor est nonumy clita eirmod vero duo, tempor ipsum eirmod est nonumy et accusam vero. Et erat takimata dolores elitr,.</p>
                    <p>Ut ea et et accusam labore sadipscing accusam eirmod dolor et, tempor rebum est sit sadipscing nonumy invidunt lorem accusam invidunt, accusam duo.</p>
                </div>
              </ng-template>
            </li>
          </ul>             
    </div>
</div>
<div class="panel-body tabs-menu-body">
    <div [ngbNavOutlet]="nav6"></div>
</div>
</div>`
export let tabsHTML7 = 
`<div class="panel panel-primary">
<div class="tab-menu-heading">
    <div class="tabs-menu">
        <!-- Tabs -->
        <ul ngbNav #nav7="ngbNav" [activeId]="1" class="nav panel-tabs panel-success">
            <li [ngbNavItem]="1">
              <a ngbNavLink class=""><i class="fe fe-user me-1"></i>Tab 1</a>
              <ng-template ngbNavContent>
                <p>page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like</p>
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et</p>
              </ng-template>
            </li>
            <li [ngbNavItem]="2">
              <a ngbNavLink class=""><i class="fe fe-calendar me-1"></i>Tab 2</a>
              <ng-template ngbNavContent>
                <div class="tab-pane">
                    <p>Et sanctus accusam tempor diam est rebum duo sadipscing, sit diam sed rebum sea at eos. Et dolores dolor invidunt kasd, consetetur eirmod sed ipsum et lorem magna takimata. Et tempor takimata eirmod amet amet.</p>
                    <p>Clita sit dolores clita et clita et. Labore dolores ut eos sit dolor sanctus labore. Dolore lorem sanctus ut dolore tempor sed amet elitr.</p>
                </div>
              </ng-template>
            </li>
            <li [ngbNavItem]="3">
              <a ngbNavLink class=""><i class="fe fe-settings me-1"></i>Tab 3</a>
              <ng-template ngbNavContent>
                <div class="tab-pane">
                    <p>Sea ea sit sadipscing no dolore elitr kasd gubergren et, dolore aliquyam sit magna aliquyam. Eirmod ut dolor sed vero. Lorem nonumy lorem sed sanctus diam aliquyam, et ipsum consetetur.</p>
                    <p>Est stet ipsum et aliquyam eos et ipsum diam duo clita. Sed eirmod sadipscing amet sadipscing nonumy magna aliquyam elitr voluptua,.</p>
                </div>
              </ng-template>
            </li>
            <li [ngbNavItem]="4">
              <a ngbNavLink class=""><i class="fe fe-bell me-1"></i>Tab 4</a>
              <ng-template ngbNavContent>
                <div class="tab-pane">
                    <p>No voluptua tempor est nonumy clita eirmod vero duo, tempor ipsum eirmod est nonumy et accusam vero. Et erat takimata dolores elitr,.</p>
                    <p>Ut ea et et accusam labore sadipscing accusam eirmod dolor et, tempor rebum est sit sadipscing nonumy invidunt lorem accusam invidunt, accusam duo.</p>
                </div>
              </ng-template>
            </li>
          </ul>             
    </div>
</div>
<div class="panel-body tabs-menu-body">
    <div [ngbNavOutlet]="nav7"></div>
</div>
</div>`
export let tabsHTML8 = 
`<div class="panel panel-primary">
<div class="tab-menu-heading">
    <div class="tabs-menu">
        <!-- Tabs -->
        <ul ngbNav #nav8="ngbNav" [activeId]="1" class="nav panel-tabs panel-info">
            <li [ngbNavItem]="1">
              <a ngbNavLink class=""><i class="fe fe-user me-1"></i>Tab 1</a>
              <ng-template ngbNavContent>
                <p>page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like</p>
                <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et</p>
              </ng-template>
            </li>
            <li [ngbNavItem]="2">
              <a ngbNavLink class=""><i class="fe fe-calendar me-1"></i>Tab 2</a>
              <ng-template ngbNavContent>
                <div class="tab-pane">
                    <p>Et sanctus accusam tempor diam est rebum duo sadipscing, sit diam sed rebum sea at eos. Et dolores dolor invidunt kasd, consetetur eirmod sed ipsum et lorem magna takimata. Et tempor takimata eirmod amet amet.</p>
                    <p>Clita sit dolores clita et clita et. Labore dolores ut eos sit dolor sanctus labore. Dolore lorem sanctus ut dolore tempor sed amet elitr.</p>
                </div>
              </ng-template>
            </li>
            <li [ngbNavItem]="3">
              <a ngbNavLink class=""><i class="fe fe-settings me-1"></i>Tab 3</a>
              <ng-template ngbNavContent>
                <div class="tab-pane">
                    <p>Sea ea sit sadipscing no dolore elitr kasd gubergren et, dolore aliquyam sit magna aliquyam. Eirmod ut dolor sed vero. Lorem nonumy lorem sed sanctus diam aliquyam, et ipsum consetetur.</p>
                    <p>Est stet ipsum et aliquyam eos et ipsum diam duo clita. Sed eirmod sadipscing amet sadipscing nonumy magna aliquyam elitr voluptua,.</p>
                </div>
              </ng-template>
            </li>
            <li [ngbNavItem]="4">
              <a ngbNavLink class=""><i class="fe fe-bell me-1"></i>Tab 4</a>
              <ng-template ngbNavContent>
                <div class="tab-pane">
                    <p>No voluptua tempor est nonumy clita eirmod vero duo, tempor ipsum eirmod est nonumy et accusam vero. Et erat takimata dolores elitr,.</p>
                    <p>Ut ea et et accusam labore sadipscing accusam eirmod dolor et, tempor rebum est sit sadipscing nonumy invidunt lorem accusam invidunt, accusam duo.</p>
                </div>
              </ng-template>
            </li>
          </ul>             
    </div>
</div>
<div class="panel-body tabs-menu-body">
    <div [ngbNavOutlet]="nav8"></div>
</div>
</div>`
export let tabsHTML9 = 
`<div class="tab_wrapper second_tab right_side">
<ul ngbNav #nav12="ngbNav" [(activeId)]="TabStyle4"  class="nav panel-tabs panel-primary">
    <li [ngbNavItem]="1" class="tab_content"><a ngbNavLink >Tab 1</a>
        <ng-template ngbNavContent>
            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to
                using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web
                sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like) It is a long established fact that a reader will be distracted by the readable
                content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
                Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years,
                sometimes by accident, sometimes on purpose (injected humour and the like).</p>
        </ng-template>
    </li>
    <li [ngbNavItem]="2" class="tab_content"><a ngbNavLink>Tab 2</a>
        <ng-template ngbNavContent>
            <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in
                Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections
                1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,
                "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years
                old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature,
                discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics,
                very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
        </ng-template>
    </li>
    <li [ngbNavItem]="3"><a ngbNavLink>Tab 3</a>
        <ng-template ngbNavContent>
            <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to
                using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web
                sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like) It is a long established fact that a reader will be distracted by the readable
                content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
                Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years,
                sometimes by accident, sometimes on purpose (injected humour and the like).</p>
        </ng-template>
    </li>
    <li [ngbNavItem]="4"><a ngbNavLink>Tab 4</a>
        <ng-template ngbNavContent>
            <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in
                Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections
                1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,
                "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years
                old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature,
                discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics,
                very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
        </ng-template>
    </li>
    <li [ngbNavItem]="5"><a ngbNavLink>Tab 5</a>
        <ng-template ngbNavContent>
            <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage
                of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator
                on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition,
                injected humour, or non-characteristic words etc. There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look
                even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined
                chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The
                generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.</p>
        </ng-template>
    </li>
    <li [ngbNavItem]="6"><a ngbNavLink>Tab 6</a>
        <ng-template ngbNavContent>
            <p>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in
                Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections
                1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum,
                "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32. Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years
                old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature,
                discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics,
                very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.</p>
        </ng-template>
    </li>
</ul>

<div [ngbNavOutlet]="nav12"  class="panel-body content_wrapper "></div>
</div>`