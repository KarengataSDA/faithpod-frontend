export let dropdownHTML1 = 
` <div class="example panel panel-default">
<div class="panel-body p-0 border-0">
  <div class="btn-group mt-2 mb-2" ngbDropdown>
    <button type="button" class="btn btn-default dropdown-toggle me-1" ngbDropdownToggle>
      Action <span class="caret"></span>
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
  <div class="btn-group mt-2 mb-2" ngbDropdown>
    <button type="button" class="btn btn-primary dropdown-toggle me-1" ngbDropdownToggle>
      Action <span class="caret"></span>
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
  <div class="btn-group mt-2 mb-2" ngbDropdown>
    <button type="button" class="btn btn-success dropdown-toggle me-1" ngbDropdownToggle>
      Action <span class="caret"></span>
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
  <div class="btn-group mt-2 mb-2" ngbDropdown>
    <button type="button" class="btn btn-info dropdown-toggle me-1" ngbDropdownToggle>
      Action <span class="caret"></span>
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
  <div class="btn-group mt-2 mb-2" ngbDropdown>
    <button type="button" class="btn btn-info btn-warning dropdown-toggle me-1" ngbDropdownToggle>
      Action <span class="caret"></span>
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
  <div class="btn-group mt-2 mb-2" ngbDropdown>
    <button type="button" class="btn btn-info btn-danger dropdown-toggle me-1" ngbDropdownToggle>
      Action <span class="caret"></span>
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
</div>
</div>`
export let dropdownTS1 = 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent { }`

export let dropdownHTML2 = 
`<div class="example panel panel-default">
<div class="panel-body p-0 border-0">
  
  <div class="btn-group mt-2 mb-2" ngbDropdown>
    <button type="button" class="btn btn-outline-primary dropdown-toggle me-1" ngbDropdownToggle>
      Action <span class="caret"></span>
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
  <div class="btn-group mt-2 mb-2" ngbDropdown>
    <button type="button" class="btn btn-outline-success dropdown-toggle me-1" ngbDropdownToggle>
      Action <span class="caret"></span>
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
  <div class="btn-group mt-2 mb-2" ngbDropdown>
    <button type="button" class="btn btn-outline-info dropdown-toggle me-1" ngbDropdownToggle>
      Action <span class="caret"></span>
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
  <div class="btn-group mt-2 mb-2" ngbDropdown>
      <button type="button" class="btn btn-warning dropdown-toggle me-1" ngbDropdownToggle>
        Action <span class="caret"></span>
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
  <div class="btn-group mt-2 mb-2" ngbDropdown>
    <button type="button" class="btn btn-outline-danger dropdown-toggle me-1" ngbDropdownToggle>
      Action <span class="caret"></span>
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
</div>
</div>`
export let dropdownTS2 = 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent { }`

export let dropdownHTML3 = 
`<div class="example">
<div class="panel-body p-0 border-0">
  <div class="btn-group mt-2 mb-2" ngbDropdown>
    <button type="button" class="btn btn-default-light dropdown-toggle me-1" ngbDropdownToggle>
      Action <span class="caret"></span>
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
  <div class="btn-group mt-2 mb-2" ngbDropdown>
    <button type="button" class="btn btn-primary-light dropdown-toggle me-1" ngbDropdownToggle>
      Action <span class="caret"></span>
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
  <div class="btn-group mt-2 mb-2" ngbDropdown>
    <button type="button" class="btn btn-success-light dropdown-toggle me-1" ngbDropdownToggle>
      Action <span class="caret"></span>
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
  <div class="btn-group mt-2 mb-2" ngbDropdown>
    <button type="button" class="btn btn-info-light dropdown-toggle me-1" ngbDropdownToggle>
      Action <span class="caret"></span>
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
  <div class="btn-group mt-2 mb-2" ngbDropdown>
    <button type="button" class="btn btn-warning-light dropdown-toggle me-1" ngbDropdownToggle>
      Action <span class="caret"></span>
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
  <div class="btn-group mt-2 mb-2" ngbDropdown>
    <button type="button" class="btn btn-danger-light dropdown-toggle me-1" ngbDropdownToggle>
      Action <span class="caret"></span>
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
</div>
</div>`
export let dropdownTS3 = 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent { }`

export let dropdownHTML4 = 
`<div class="example">
<div class="panel-body p-0 border-0">
  <div class="btn-group mt-2 mb-2" ngbDropdown>
    <button type="button" class="btn btn-default-light btn-pill dropdown-toggle me-1" ngbDropdownToggle>
      Action <span class="caret"></span>
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
  <div class="btn-group mt-2 mb-2" ngbDropdown>
    <button type="button" class="btn btn-primary-light btn-pill dropdown-toggle me-1" ngbDropdownToggle>
      Action <span class="caret"></span>
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
  <div class="btn-group mt-2 mb-2" ngbDropdown>
    <button type="button" class="btn btn-success-light btn-pill dropdown-toggle me-1" ngbDropdownToggle>
      Action <span class="caret"></span>
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
  <div class="btn-group mt-2 mb-2" ngbDropdown>
    <button type="button" class="btn btn-info-light btn-pill dropdown-toggle me-1" ngbDropdownToggle>
      Action <span class="caret"></span>
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
  <div class="btn-group mt-2 mb-2" ngbDropdown>
    <button type="button" class="btn btn-warning-light btn-pill dropdown-toggle me-1" ngbDropdownToggle>
      Action <span class="caret"></span>
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
  <div class="btn-group mt-2 mb-2" ngbDropdown>
    <button type="button" class="btn btn-danger-light btn-pill dropdown-toggle me-1" ngbDropdownToggle>
      Action <span class="caret"></span>
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
</div>
</div>`
export let dropdownTS4 = 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent { }`

export let dropdownHTML5 = 
`<div class="example">
<div class="panel-body p-0 border-0">
  <div class="btn-group mt-2 mb-2" ngbDropdown>
    <button type="button" class="btn btn-default btn-pill dropdown-toggle me-1" ngbDropdownToggle>
      Action <span class="caret"></span>
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
  <div class="btn-group mt-2 mb-2" ngbDropdown>
    <button type="button" class="btn btn-primary btn-pill dropdown-toggle me-1" ngbDropdownToggle>
      Action <span class="caret"></span>
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
  <div class="btn-group mt-2 mb-2" ngbDropdown>
    <button type="button" class="btn btn-success btn-pill dropdown-toggle me-1" ngbDropdownToggle>
      Action <span class="caret"></span>
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
  <div class="btn-group mt-2 mb-2" ngbDropdown>
    <button type="button" class="btn btn-info btn-pill dropdown-toggle me-1" ngbDropdownToggle>
      Action <span class="caret"></span>
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
  <div class="btn-group mt-2 mb-2" ngbDropdown>
    <button type="button" class="btn btn-warning btn-pill dropdown-toggle me-1" ngbDropdownToggle>
      Action <span class="caret"></span>
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
  <div class="btn-group mt-2 mb-2" ngbDropdown>
    <button type="button" class="btn btn-danger btn-pill dropdown-toggle me-1" ngbDropdownToggle>
      Action <span class="caret"></span>
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
</div>
</div>`
export let dropdownTS5 = 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent { }`

export let dropdownHTML6 = 
`<div class="example">
<div class="panel-body p-0 border-0">
  <div class="btn-group mt-2 mb-2" ngbDropdown>
    <button type="button" class="btn btn-pill btn-primary">Action</button>
    <button type="button" class="btn btn-pill btn-primary dropdown-toggle px-1 me-1" ngbDropdownToggle>
      <span class="caret"></span>
      <span class="sr-only">Toggle Dropdown</span>
    </button>
    <ul ngbDropdownMenu role="menu">
      <li class="dropdown-plus-title">
        Dropdown
        <b class=" fa fa-angle-up"></b>
      </li>
      <li><a href="javascript:;">Action</a></li>
      <li><a href="javascript:;">Another action</a></li>
      <li><a href="javascript:;">Something else here</a></li>
      <li class="divider"></li>
      <li><a href="javascript:;">Separated link</a></li>
    </ul>
  </div>
  <div class="btn-group mt-2 mb-2" ngbDropdown>
    <button type="button" class="btn btn-pill btn-success">Action</button>
    <button type="button" class="btn btn-pill btn-success dropdown-toggle px-1 me-1" ngbDropdownToggle>
      <span class="caret"></span>
      <span class="sr-only">Toggle Dropdown</span>
    </button>
    <ul ngbDropdownMenu role="menu">
      <li class="dropdown-plus-title">
        Dropdown
        <b class="fa fa-angle-up"></b>
      </li>
      <li><a href="javascript:;">Action</a></li>
      <li><a href="javascript:;">Another action</a></li>
      <li><a href="javascript:;">Something else here</a></li>
      <li class="divider"></li>
      <li><a href="javascript:;">Separated link</a></li>
    </ul>
  </div>
  <div class="btn-group mt-2 mb-2" ngbDropdown>
    <button type="button" class="btn btn-pill btn-info">Action</button>
    <button type="button" class="btn btn-pill btn-info dropdown-toggle px-1 me-1" ngbDropdownToggle>
      <span class="caret"></span>
      <span class="sr-only">Toggle Dropdown</span>
    </button>
    <ul ngbDropdownMenu role="menu">
      <li class="dropdown-plus-title">
        Dropdown
        <b class="fa fa-angle-up"></b>
      </li>
      <li><a href="javascript:;">Action</a></li>
      <li><a href="javascript:;">Another action</a></li>
      <li><a href="javascript:;">Something else here</a></li>
      <li class="divider"></li>
      <li><a href="javascript:;">Separated link</a></li>
    </ul>
  </div>
  <div class="btn-group mt-2 mb-2" ngbDropdown>
    <button type="button" class="btn btn-pill btn-warning">Action</button>
    <button type="button" class="btn btn-warning btn-pill dropdown-toggle px-1 me-1" ngbDropdownToggle>
      <span class="caret"></span>
      <span class="sr-only">Toggle Dropdown</span>
    </button>
    <ul ngbDropdownMenu role="menu">
      <li class="dropdown-plus-title">
        Dropdown
        <b class="fa fa-angle-up"></b>
      </li>
      <li><a href="javascript:;">Action</a></li>
      <li><a href="javascript:;">Another action</a></li>
      <li><a href="javascript:;">Something else here</a></li>
      <li class="divider"></li>
      <li><a href="javascript:;">Separated link</a></li>
    </ul>
  </div>
  <div class="btn-group mt-2 mb-2" ngbDropdown>
    <button type="button" class="btn btn-pill btn-danger">Action</button>
    <button type="button" class="btn btn-pill btn-danger dropdown-toggle px-1 me-1" ngbDropdownToggle>
      <span class="caret"></span>
      <span class="sr-only">Toggle Dropdown</span>
    </button>
    <ul ngbDropdownMenu role="menu">
      <li class="dropdown-plus-title">
        Dropdown
        <b class="fa fa-angle-up"></b>
      </li>
      <li><a href="javascript:;">Action</a></li>
      <li><a href="javascript:;">Another action</a></li>
      <li><a href="javascript:;">Something else here</a></li>
      <li class="divider"></li>
      <li><a href="javascript:;">Separated link</a></li>
    </ul>
  </div>
</div>
</div>`
export let dropdownTS6 = 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent { }`

export let dropdownHTML7 = 
`<div class="example">
<div class="panel-body p-0 border-0">
    <div class="btn-group mt-2 mb-2" ngbDropdown>
        <button type="button" class="btn btn-default">Action</button>
        <button type="button" class="btn btn-default dropdown-toggle px-1 me-1" ngbDropdownToggle>
          <span class="caret"></span>
          <span class="sr-only">Toggle Dropdown</span>
        </button>
        <ul ngbDropdownMenu role="menu">
          <li class="dropdown-plus-title">
            Dropdown
            <b class=" fa fa-angle-up"></b>
          </li>
          <li><a href="javascript:;">Action</a></li>
          <li><a href="javascript:;">Another action</a></li>
          <li><a href="javascript:;">Something else here</a></li>
          <li class="divider"></li>
          <li><a href="javascript:;">Separated link</a></li>
        </ul>
      </div>
  <div class="btn-group mt-2 mb-2" ngbDropdown>
    <button type="button" class="btn btn-primary">Action</button>
    <button type="button" class="btn btn-primary dropdown-toggle px-1 me-1" ngbDropdownToggle>
      <span class="caret"></span>
      <span class="sr-only">Toggle Dropdown</span>
    </button>
    <ul ngbDropdownMenu role="menu">
      <li class="dropdown-plus-title">
        Dropdown
        <b class=" fa fa-angle-up"></b>
      </li>
      <li><a href="javascript:;">Action</a></li>
      <li><a href="javascript:;">Another action</a></li>
      <li><a href="javascript:;">Something else here</a></li>
      <li class="divider"></li>
      <li><a href="javascript:;">Separated link</a></li>
    </ul>
  </div>
  <div class="btn-group mt-2 mb-2" ngbDropdown>
    <button type="button" class="btn btn-success">Action</button>
    <button type="button" class="btn btn-success dropdown-toggle px-1 me-1" ngbDropdownToggle>
      <span class="caret"></span>
      <span class="sr-only">Toggle Dropdown</span>
    </button>
    <ul ngbDropdownMenu role="menu">
      <li class="dropdown-plus-title">
        Dropdown
        <b class="fa fa-angle-up"></b>
      </li>
      <li><a href="javascript:;">Action</a></li>
      <li><a href="javascript:;">Another action</a></li>
      <li><a href="javascript:;">Something else here</a></li>
      <li class="divider"></li>
      <li><a href="javascript:;">Separated link</a></li>
    </ul>
  </div>
  <div class="btn-group mt-2 mb-2" ngbDropdown>
    <button type="button" class="btn btn-info">Action</button>
    <button type="button" class="btn btn-info dropdown-toggle px-1 me-1" ngbDropdownToggle>
      <span class="caret"></span>
      <span class="sr-only">Toggle Dropdown</span>
    </button>
    <ul ngbDropdownMenu role="menu">
      <li class="dropdown-plus-title">
        Dropdown
        <b class="fa fa-angle-up"></b>
      </li>
      <li><a href="javascript:;">Action</a></li>
      <li><a href="javascript:;">Another action</a></li>
      <li><a href="javascript:;">Something else here</a></li>
      <li class="divider"></li>
      <li><a href="javascript:;">Separated link</a></li>
    </ul>
  </div>
  <div class="btn-group mt-2 mb-2" ngbDropdown>
    <button type="button" class="btn btn-warning">Action</button>
    <button type="button" class="btn btn-warning dropdown-toggle px-1 me-1" ngbDropdownToggle>
      <span class="caret"></span>
      <span class="sr-only">Toggle Dropdown</span>
    </button>
    <ul ngbDropdownMenu role="menu">
      <li class="dropdown-plus-title">
        Dropdown
        <b class="fa fa-angle-up"></b>
      </li>
      <li><a href="javascript:;">Action</a></li>
      <li><a href="javascript:;">Another action</a></li>
      <li><a href="javascript:;">Something else here</a></li>
      <li class="divider"></li>
      <li><a href="javascript:;">Separated link</a></li>
    </ul>
  </div>
  <div class="btn-group mt-2 mb-2" ngbDropdown>
    <button type="button" class="btn btn-danger">Action</button>
    <button type="button" class="btn btn-danger dropdown-toggle px-1 me-1" ngbDropdownToggle>
      <span class="caret"></span>
      <span class="sr-only">Toggle Dropdown</span>
    </button>
    <ul ngbDropdownMenu role="menu">
      <li class="dropdown-plus-title">
        Dropdown
        <b class="fa fa-angle-up"></b>
      </li>
      <li><a href="javascript:;">Action</a></li>
      <li><a href="javascript:;">Another action</a></li>
      <li><a href="javascript:;">Something else here</a></li>
      <li class="divider"></li>
      <li><a href="javascript:;">Separated link</a></li>
    </ul>
  </div>
</div>
</div>`
export let dropdownTS7 = 
`import { Component } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss'],
})
export class DropdownComponent { }`

export let dropdownHTML8 =
 `<div class="example">
 <div class="panel-body p-0 border-0">
     <div class="btn-group mt-2 mb-2" ngbDropdown>
         <button type="button" class="btn btn-outline-primary">Action</button>
         <button type="button" class="btn btn-outline-primary dropdown-toggle px-1 me-1" ngbDropdownToggle>
           <span class="caret"></span>
           <span class="sr-only">Toggle Dropdown</span>
         </button>
         <ul ngbDropdownMenu role="menu">
           <li class="dropdown-plus-title">
             Dropdown
             <b class=" fa fa-angle-up"></b>
           </li>
           <li><a href="javascript:;">Action</a></li>
           <li><a href="javascript:;">Another action</a></li>
           <li><a href="javascript:;">Something else here</a></li>
           <li class="divider"></li>
           <li><a href="javascript:;">Separated link</a></li>
         </ul>
       </div>
   <div class="btn-group mt-2 mb-2" ngbDropdown>
     <button type="button" class="btn btn-outline-success">Action</button>
     <button type="button" class="btn btn-outline-success dropdown-toggle px-1 me-1" ngbDropdownToggle>
       <span class="caret"></span>
       <span class="sr-only">Toggle Dropdown</span>
     </button>
     <ul ngbDropdownMenu role="menu">
       <li class="dropdown-plus-title">
         Dropdown
         <b class=" fa fa-angle-up"></b>
       </li>
       <li><a href="javascript:;">Action</a></li>
       <li><a href="javascript:;">Another action</a></li>
       <li><a href="javascript:;">Something else here</a></li>
       <li class="divider"></li>
       <li><a href="javascript:;">Separated link</a></li>
     </ul>
   </div>
   <div class="btn-group mt-2 mb-2" ngbDropdown>
     <button type="button" class="btn btn-outline-info">Action</button>
     <button type="button" class="btn btn-outline-info dropdown-toggle px-1 me-1" ngbDropdownToggle>
       <span class="caret"></span>
       <span class="sr-only">Toggle Dropdown</span>
     </button>
     <ul ngbDropdownMenu role="menu">
       <li class="dropdown-plus-title">
         Dropdown
         <b class="fa fa-angle-up"></b>
       </li>
       <li><a href="javascript:;">Action</a></li>
       <li><a href="javascript:;">Another action</a></li>
       <li><a href="javascript:;">Something else here</a></li>
       <li class="divider"></li>
       <li><a href="javascript:;">Separated link</a></li>
     </ul>
   </div>
   <div class="btn-group mt-2 mb-2" ngbDropdown>
     <button type="button" class="btn btn-outline-warning">Action</button>
     <button type="button" class="btn btn-outline-warning dropdown-toggle px-1 me-1" ngbDropdownToggle>
       <span class="caret"></span>
       <span class="sr-only">Toggle Dropdown</span>
     </button>
     <ul ngbDropdownMenu role="menu">
       <li class="dropdown-plus-title">
         Dropdown
         <b class="fa fa-angle-up"></b>
       </li>
       <li><a href="javascript:;">Action</a></li>
       <li><a href="javascript:;">Another action</a></li>
       <li><a href="javascript:;">Something else here</a></li>
       <li class="divider"></li>
       <li><a href="javascript:;">Separated link</a></li>
     </ul>
   </div>
   <div class="btn-group mt-2 mb-2" ngbDropdown>
     <button type="button" class="btn btn-outline-danger">Action</button>
     <button type="button" class="btn btn-outline-danger dropdown-toggle px-1 me-1" ngbDropdownToggle>
       <span class="caret"></span>
       <span class="sr-only">Toggle Dropdown</span>
     </button>
     <ul ngbDropdownMenu role="menu">
       <li class="dropdown-plus-title">
         Dropdown
         <b class="fa fa-angle-up"></b>
       </li>
       <li><a href="javascript:;">Action</a></li>
       <li><a href="javascript:;">Another action</a></li>
       <li><a href="javascript:;">Something else here</a></li>
       <li class="divider"></li>
       <li><a href="javascript:;">Separated link</a></li>
     </ul>
   </div>
   <div class="btn-group mt-2 mb-2" ngbDropdown>
     <button type="button" class="btn btn-outline-secondary">Action</button>
     <button type="button" class="btn btn-outline-secondary dropdown-toggle px-1 me-1" ngbDropdownToggle>
       <span class="caret"></span>
       <span class="sr-only">Toggle Dropdown</span>
     </button>
     <ul ngbDropdownMenu role="menu">
       <li class="dropdown-plus-title">
         Dropdown
         <b class="fa fa-angle-up"></b>
       </li>
       <li><a href="javascript:;">Action</a></li>
       <li><a href="javascript:;">Another action</a></li>
       <li><a href="javascript:;">Something else here</a></li>
       <li class="divider"></li>
       <li><a href="javascript:;">Separated link</a></li>
     </ul>
   </div>
 </div>
</div>`
export let dropdownHTML9 = `
<div class="example">
                    <div class="panel-body p-0 border-0">
                      <div class="btn-group mt-2 mb-2" ngbDropdown>
                        <button type="button" class="btn btn-primary btn-lg dropdown-toggle me-1" ngbDropdownToggle>
                          Large Dropdown <span class="caret"></span>
                        </button>
                        <ul ngbDropdownMenu role="menu">
                          <li><a href="javascript:;">Action</a></li>
                          <li><a href="javascript:;">Another action</a></li>
                          <li><a href="javascript:;">Something else here</a></li>
                          <li class="divider"></li>
                          <li><a href="javascript:;">Separated link</a></li>
                        </ul>
                      </div>
                      <div class="btn-group mt-2 mb-2" ngbDropdown>
                        <button type="button" class="btn btn-primary dropdown-toggle me-1" ngbDropdownToggle>
                            Default Dropdown <span class="caret"></span>
                        </button>
                        <ul ngbDropdownMenu role="menu">
                          <li><a href="javascript:;">Action</a></li>
                          <li><a href="javascript:;">Another action</a></li>
                          <li><a href="javascript:;">Something else here</a></li>
                          <li class="divider"></li>
                          <li><a href="javascript:;">Separated link</a></li>
                        </ul>
                      </div>
                      <div class="btn-group mt-2 mb-2" ngbDropdown>
                        <button type="button" class="btn btn-primary btn-sm dropdown-toggle me-1" ngbDropdownToggle>
                            Small Dropdown <span class="caret"></span>
                        </button>
                        <ul ngbDropdownMenu role="menu">
                          <li><a href="javascript:;">Action</a></li>
                          <li><a href="javascript:;">Another action</a></li>
                          <li><a href="javascript:;">Something else here</a></li>
                          <li class="divider"></li>
                          <li><a href="javascript:;">Separated link</a></li>
                        </ul>
                      </div>
                    </div>
                  </div>
`
export let dropdownHTML10 = `
<div class="example">
                    <div class="panel-body p-0 border-0">
                        <div class="dropup btn-group mt-2 mb-2 me-2" placement="top-start" ngbDropdown>
                            <button class="btn btn-primary dropdown-toggle" type="button me-2"  ngbDropdownToggle>Dropup
                              <span class="caret"></span></button>
                            <ul ngbDropdownMenu>
                              <li><a href="javascript:;">HTML</a></li>
                              <li><a href="javascript:;">CSS</a></li>
                              <li><a href="javascript:;">JavaScript</a></li>
                              <li class="divider"></li>
                              <li><a href="javascript:;">About Us</a></li>
                            </ul>
                          </div>
                          <div class="dropend btn-group mt-2 mb-2 me-2" placement="right" ngbDropdown>
                            <button class="btn btn-primary dropdown-toggle" type="button me-2"  ngbDropdownToggle>DropEnd
                              <span class="caret"></span></button>
                            <ul ngbDropdownMenu class="dropright">
                              <li><a href="javascript:void(0)">HTML</a></li>
                              <li><a href="javascript:void(0)">CSS</a></li>
                              <li><a href="javascript:void(0)">JavaScript</a></li>
                              <li class="divider"></li>
                              <li><a href="javascript:void(0)">About Us</a></li>
                            </ul>
                          </div>
                          <div class="dropstart btn-group mt-2 mb-2 me-2" placement="left" ngbDropdown>
                            <button class="btn btn-primary dropdown-toggle" type="button me-2"  ngbDropdownToggle>DropStart
                              <span class="caret"></span></button>
                            <ul ngbDropdownMenu class="dropleft translate3d(103px, -68.5px, 0px)">
                              <li><a href="javascript:;">HTML</a></li>
                              <li><a href="javascript:;">CSS</a></li>
                              <li><a href="javascript:;">JavaScript</a></li>
                              <li class="divider"></li>
                              <li><a href="javascript:;">About Us</a></li>
                            </ul>
                          </div>
                    </div>
                  </div>
`
export let dropdownHTML11 = `
<div class="example">
                    <div class="panel-body p-0 border-0">
                      <div class="btn-group mt-2 mb-2" ngbDropdown>
                        <button type="button" class="btn btn-primary dropdown-toggle me-1" ngbDropdownToggle>
                        Dropdown Header <span class="caret"></span>
                        </button>
                        <ul ngbDropdownMenu role="menu">
                          <li><a href="javascript:;">Action</a></li>
                          <li><a href="javascript:;">Another action</a></li>
                          <li><a href="javascript:;">Something else here</a></li>
                          <li class="divider"></li>
                        </ul>
                      </div>
                      <div class="btn-group mt-2 mb-2" ngbDropdown>
                        <button type="button" class="btn btn-primary dropdown-toggle me-1" ngbDropdownToggle>
                            Dropdown Divider <span class="caret"></span>
                        </button>
                        <ul ngbDropdownMenu role="menu">
                          <li><a href="javascript:;">Action</a></li>
                          <li><a href="javascript:;">Another action</a></li>
                          <li><a href="javascript:;">Something else here</a></li>
                          <li class="divider"></li>
                          <li><a href="javascript:;">Separated link</a></li>
                        </ul>
                      </div>
                      <div class="btn-group mt-2 mb-2" ngbDropdown>
                        <button type="button" class="btn btn-primary dropdown-toggle me-1" ngbDropdownToggle>
                            Dropdown Text <span class="caret"></span>
                        </button>
                        <ul ngbDropdownMenu class="p-4 text-muted" role="menu">
                          <li><p>Some example text that's free-flowing within the dropdown menu.
                            And this is more example text.</p></li>
                        </ul>
                      </div>
                      <div class="btn-group mt-2 mb-2" ngbDropdown placement="top-start">
                        <button type="button" class="btn btn-primary dropdown-toggle me-1" ngbDropdownToggle>
                            Dropdown Form <span class="caret"></span>
                        </button>
                        <div ngbDropdownMenu class="form-horizontal-rtl w-260">
                            <form class="card-body pt-3" name="login">
                                <div class="form-group">
                                    <label class="form-label">Mail or Username</label>
                                    <input class="form-control" placeholder="Email" type="email">
                                </div>
                                <div class="form-group">
                                    <label class="form-label">Password</label>
                                    <input class="form-control" placeholder="password" type="password">
                                </div>
                                <div class="form-group">
                                    <label class="custom-control custom-checkbox">
                                            <input type="checkbox" class="custom-control-input" name="example-checkbox1" value="option1">
                                            <span class="custom-control-label">Remeber me</span>
                                        </label>
                                </div>
                                <div class="submit">
                                    <a class="btn btn-secondary btn-block" href="javascript:void(0)">Login</a>
                                </div>
                                <div class="text-center mt-3">
                                    <p class="mb-2"><a href="javascript:void(0)">Forgot Password</a></p>
                                    <p class="text-dark mb-0">Don't have account?<a class="text-primary.ms-1" href="javascript:void(0)">Register</a></p>
                                </div>
                            </form>
                        </div>
                      </div>
                      <div class="btn-group mt-2 mb-2" ngbDropdown>
                        <button type="button" class="btn btn-primary dropdown-toggle me-1" ngbDropdownToggle><i class="fe fe-settings me-1"></i>
                            Dropdown Options <span class="caret"></span>
                        </button>
                        <ul ngbDropdownMenu>
                            <li>
                                <a class="dropdown-item" href="javascript:void(0)">Auto Correct <span class="float-end">yes<i class="fe fe-chevron-right"></i></span></a>
                            </li>
                            <li><a class="dropdown-item" href="javascript:void(0)">Screen Light <span class="float-end me-3"><i class="fe fe-sun"></i></span></a></li>
                            <li>
                                <div class="dropdown-item ps-4" >
                                    <div class="form-group mg-b-10 mb-0">
                                        <label class="custom-switch">
                                            <input type="checkbox" name="custom-switch-checkbox" class="custom-switch-input">
                                            <span class="custom-switch-description mg-l-10">Notification</span>
                                            <span class="custom-switch-indicator ms-5"></span>
                                        </label>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div class="dropdown-item ps-4">
                                    <div class="form-group mg-b-10 mb-0">
                                        <label class="custom-switch">
                                            <input type="checkbox" name="custom-switch-checkbox" class="custom-switch-input" checked="">
                                            <span class="custom-switch-description mg-l-10">Reminders</span>
                                            <span class="custom-switch-indicator ms-5"></span>
                                        </label>
                                    </div>
                                </div>
                            </li>
                        </ul>
                      </div>
                    </div>
                  </div>
`
export let dropdownHTML12 = `
<div class="example panel panel-default">
                <div class="panel-body p-0 border-0">
                  <div class="btn-group mt-2 mb-2" placement="top" ngbDropdown>
                    <button type="button" class="btn btn-facebook btn-pill dropdown-toggle me-1" ngbDropdownToggle>
                      <i class="fa fa-facebook"></i> <span class="caret"></span>
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
                  <div class="btn-group mt-2 mb-2" placement="top" ngbDropdown>
                    <button type="button" class="btn btn-youtube btn-pill dropdown-toggle me-1" ngbDropdownToggle>
                      <i class="fa fa-youtube"></i> <span class="caret"></span>
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
                  <div class="btn-group mt-2 mb-2" placement="top" ngbDropdown>
                    <button type="button" class="btn btn-google btn-pill dropdown-toggle me-1" ngbDropdownToggle>
                      <i class="fa fa-google"></i> <span class="caret"></span>
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
                  <div class="btn-group mt-2 mb-2" placement="top" ngbDropdown>
                    <button type="button" class="btn btn-github btn-pill dropdown-toggle me-1" ngbDropdownToggle>
                      <i class="fa fa-github"></i> <span class="caret"></span>
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
                  <div class="btn-group mt-2 mb-2" placement="top" ngbDropdown>
                    <button type="button" class="btn btn-pinterest btn-pill dropdown-toggle me-2" ngbDropdownToggle>
                      <i class="fa fa-pinterest-p"></i> <span class="caret"></span>
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
                  <div class="btn-group mt-2 mb-2" placement="top" ngbDropdown>
                    <button type="button" class="btn btn-twitter btn-pill dropdown-toggle me-2" ngbDropdownToggle>
                      <i class="fa fa-twitter"></i> <span class="caret"></span>
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
                </div>
              </div>
`
export let dropdownHTML13 = `
<div class="example">
							<div class="row row-xs wd-xl-80p">
								<div class="btn-group mb-2 mt-2">
									<div ngbDropdown class="d-inline-block wd-xl-80p">
										<button type="button" class="btn btn-danger dropdown-toggle" id="dropdownBasic1"
											ngbDropdownToggle><i class="fe fe-mail  "></i></button>
										<div ngbDropdownMenu aria-labelledby="dropdownBasic1">
											<h6
												class="dropdown-header tx-uppercase tx-11 tx-bold tx-inverse tx-spacing-1">
												Dropdown header</h6>
											<button ngbDropdownItem>Action</button>
											<button ngbDropdownItem>Another action</button>
											<button ngbDropdownItem>Something else here</button>
											<a ngbDropdownItem class="dropdown-item"
												href="javascript:void(0);">Separated link</a>
										</div>
									</div>
								</div>
								<div class="btn-group mb-2 mt-2">
									<div ngbDropdown class="d-inline-block wd-xl-80p">
										<button type="button" class="btn btn-info dropdown-toggle" id="dropdownBasic1"
											ngbDropdownToggle><i class="fe fe-more-horizontal "></i></button>
										<div ngbDropdownMenu aria-labelledby="dropdownBasic1">
											<h6
												class="dropdown-header tx-uppercase tx-11 tx-bold tx-inverse tx-spacing-1">
												Dropdown header</h6>
											<button ngbDropdownItem>Action</button>
											<button ngbDropdownItem>Another action</button>
											<button ngbDropdownItem>Something else here</button>
											<a ngbDropdownItem class="dropdown-item"
												href="javascript:void(0);">Separated link</a>
										</div>
									</div>
								</div>
								<div class="btn-group mb-2 mt-2">
									<div ngbDropdown class="d-inline-block wd-xl-80p">
										<button type="button" class="btn btn-secondary dropdown-toggle"
											id="dropdownBasic1" ngbDropdownToggle><i
												class="fe fe-more-vertical "></i></button>
										<div ngbDropdownMenu aria-labelledby="dropdownBasic1">
											<h6
												class="dropdown-header tx-uppercase tx-11 tx-bold tx-inverse tx-spacing-1">
												Dropdown header</h6>
											<button ngbDropdownItem>Action</button>
											<button ngbDropdownItem>Another action</button>
											<button ngbDropdownItem>Something else here</button>
											<a ngbDropdownItem class="dropdown-item"
												href="javascript:void(0);">Separated link</a>
										</div>
									</div>
								</div>
								<div class="btn-group mb-2 mt-2">
									<div ngbDropdown class="d-inline-block wd-xl-80p">
										<button type="button" class="btn btn-outline-primary dropdown-toggle"
											id="dropdownBasic1" ngbDropdownToggle><i
												class="fe fe-settings "></i></button>
										<div ngbDropdownMenu aria-labelledby="dropdownBasic1">
											<h6
												class="dropdown-header tx-uppercase tx-11 tx-bold tx-inverse tx-spacing-1">
												Dropdown header</h6>
											<button ngbDropdownItem>Action</button>
											<button ngbDropdownItem>Another action</button>
											<button ngbDropdownItem>Something else here</button>
											<a ngbDropdownItem class="dropdown-item"
												href="javascript:void(0);">Separated link</a>
										</div>
									</div>
								</div>
							</div>
						</div>
`
export let dropdownHTML14 = `
<div class="example">
<div class="btn-group ms-2  mt-2 mb-2">
    <div ngbDropdown>
        <button class="btn ripple btn-info " ngbDropdownToggle type="button">Dropdown Menu

        </button>
        <div class="tx-13" ngbDropdownMenu>
            <h6 class="dropdown-header tx-uppercase tx-11 tx-bold tx-inverse tx-spacing-1">
                Dropdown
                header</h6>
            <a class="dropdown-item" href="javascript:;">Action</a>
            <a class="dropdown-item" href="javascript:;">Another action</a>
            <a class="dropdown-item" href="javascript:;">Something else here</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="javascript:;">Separated link</a>
        </div>
    </div>
</div>
<div class="btn-group ms-2  mt-2 mb-2">
    <div ngbDropdown>
        <button class="btn ripple btn-primary " ngbDropdownToggle type="button">Dropdown
            Menu

        </button>
        <div class="tx-13" ngbDropdownMenu>
            <h6 class="dropdown-header tx-uppercase tx-11 tx-bold tx-inverse tx-spacing-1">
                Dropdown
                header</h6>
            <a class="dropdown-item" href="javascript:;">Action</a>
            <a class="dropdown-item" href="javascript:;">Another action</a>
            <a class="dropdown-item" href="javascript:;">Something else here</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="javascript:;">Separated link</a>
        </div>
    </div>
</div>
<div class="btn-group ms-2  mt-2 mb-2">
    <div ngbDropdown>
        <button class="btn ripple btn-danger " ngbDropdownToggle type="button">Dropdown Menu

        </button>
        <div class="tx-13" ngbDropdownMenu>
            <h6 class="dropdown-header tx-uppercase tx-11 tx-bold tx-inverse tx-spacing-1">
                Dropdown
                header</h6>
            <a class="dropdown-item" href="javascript:;">Action</a>
            <a class="dropdown-item" href="javascript:;">Another action</a>
            <a class="dropdown-item" href="javascript:;">Something else here</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="javascript:;">Separated link</a>
        </div>
    </div>
</div>
<div class="btn-group ms-2  mt-2 mb-2">
    <div ngbDropdown>
        <button class="btn ripple btn-warning " ngbDropdownToggle type="button">Dropdown
            Menu

        </button>
        <div class="tx-13" ngbDropdownMenu>
            <h6 class="dropdown-header tx-uppercase tx-11 tx-bold tx-inverse tx-spacing-1">
                Dropdown
                header</h6>
            <a class="dropdown-item" href="javascript:;">Action</a>
            <a class="dropdown-item" href="javascript:;">Another action</a>
            <a class="dropdown-item" href="javascript:;">Something else here</a>
            <div class="dropdown-divider"></div>
            <a class="dropdown-item" href="javascript:;">Separated link</a>
        </div>
    </div>
</div>
</div>
`