import { Injectable, OnDestroy } from '@angular/core';
import { Subject, BehaviorSubject, fromEvent } from 'rxjs';
import { takeUntil, debounceTime } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

// Menu
export interface Menu {
  headTitle?: string;
  headTitle2?: string;
  path?: any;
  title?: string;
  icon?: string;
  type?: string;
  badgeValue?: string;
  badgeClass?: string;
  active?: boolean;
  selected?: boolean;
  bookmark?: boolean;
  children?: Menu[];
  Menusub?: boolean;
  target?: boolean;
  items?: any;
  permissions?: string[];
}
@Injectable({
  providedIn: 'root',
})
export class NavService implements OnDestroy {
  private unsubscriber: Subject<any> = new Subject();
  public screenWidth: BehaviorSubject<number> = new BehaviorSubject(
    window.innerWidth
  );

  // Collapse Sidebar
  public collapseSidebar: boolean = window.innerWidth < 991 ? true : false;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.setScreenWidth(window.innerWidth);
    fromEvent(window, 'resize')
      .pipe(debounceTime(1000), takeUntil(this.unsubscriber))
      .subscribe((evt: any) => {
        this.setScreenWidth(evt.target.innerWidth);
        if (evt.target.innerWidth < 991) {
          this.collapseSidebar = true;
        }
      });
    if (window.innerWidth < 991) {
      // Detect Route change sidebar close
      this.router.events.subscribe((event) => {
        this.collapseSidebar = true;
      });
    }
  }

  filterMenuItems(userPermissions: string[]): void {
    const filteredItems = this.MENUITEMS.filter(menu => {
      if (!menu.permissions || menu.permissions.length === 0) {
        return true
      }

      return menu.permissions.some(permission => userPermissions.includes(permission))
    });
    this.items.next(filteredItems)
  }

  ngOnDestroy() {
    this.unsubscriber.next;
    this.unsubscriber.complete();
  }

  private setScreenWidth(width: number): void {
    this.screenWidth.next(width);
  }

  MENUITEMS: Menu[] = [
    {
      headTitle: 'MAIN',
    },
    {
      title: 'Dashboard',
      selected: false,
      icon: 'home',
      active: false,
      path: '/dashboard',
      type: 'link',
      permissions: []
    },
    {
      headTitle: 'MEMBERSHIP',
      permissions: ['can_view_users', 'can_view_membershiptypes']
    },
    {
      title: 'Members',
      selected: false,
      icon: 'users',
      type: 'sub',
      Menusub: true,
      active: false,
      permissions: ['can_view_users'],
      children: [
        {
          path: '/pages/members',
          title: 'Members List',
          type: 'link',
          selected: false,
          permissions: ['can_view_users']
        }
      ],
    },
    {
      title: 'Membership Type',
      selected: false,
      icon: 'user',
      type: 'sub',
      Menusub: true,
      active: false,
      permissions: ['can_view_membershiptypes'],
      children: [

        {
          path: '/pages/memberships',
          title: 'Membership Type',
          type: 'link',
          selected: false,
          permissions: ['can_view_membershiptypes']
        }
      ],
    },
    {
      headTitle: 'TREASURY',
      permissions: ['can_view_contributions']
    },
    {
      title: 'Categories',
      selected: false,
      icon: 'pie-chart',
      type: 'sub',
      Menusub: true,
      active: false,
      permissions: ['can_view_categories'],
      children: [
        {
          path: '/pages/treasury/collection-categories',
          title: 'Categories',
          type: 'link',
          selected: false,
          permissions: ['can_view_categories']
        }
      ],
    },
    {
      title: 'Contributions',
      selected: false,
      icon: 'layers',
      type: 'sub',
      Menusub: true,
      active: false,
      permissions: ['can_view_contributions'],
      children: [
        {
          path: '/pages/treasury/collections',
          title: 'Date Categories',
          type: 'link',
          selected: false,
          permissions: ['can_view_contributions']

        },
        {
          path: '/pages/treasury/all-collections',
          title: 'All Contributions',
          type: 'link',
          selected: false,
          permissions: ['can_view_contributions']

        },
      ],
    },
    {
      title: 'Paybill Collection',
      selected: false,
      icon: 'credit-card',
      type: 'sub',
      Menusub: true,
      active: false,
      permissions: ['can_view_contributions'],
      children: [
        {
          path: '/pages/treasury/paybill-transactions',
          title: 'Paybill Collection',
          type: 'link',
          selected: false,
          // permissions: ['can_view_contributions']

        },
         {
          path: '/pages/treasury/dashboard-monitor',
          title: 'Dashboard Monitor',
          type: 'link',
          selected: false,

        },
      ],
    },
    {
      headTitle: 'POPULATION GROUPS',
      permissions: ['can_view_groups']
    },
    {
      title: 'Groups',
      selected: false,
      icon: 'users',
      type: 'sub',
      Menusub: true,
      active: false,
      permissions: ['can_view_groups'],
      children: [
        {
          path: '/pages/groups',
          title: 'Groups',
          type: 'link',
          selected: false,
          permissions: ['can_view_groups']
        }
      ],
    },
    {
      headTitle: 'Prayercell',
      permissions: ['can_view_prayercells']
    },
    {
      title: 'Prayercells',
      selected: false,
      icon: 'map',
      type: 'sub',
      Menusub: true,
      active: false,
      permissions: ['can_view_prayercells'],
      children: [
        {
          path: '/pages/prayercells',
          title: 'Prayercells',
          type: 'link',
          selected: false,
          permissions: ['can_view_prayercells']
        }
      ]
    },
    {
      headTitle: 'Settings',
      permissions: ['can_view_roles']
    },
    {
      title: 'Roles',
      selected: false,
      icon: 'settings',
      type: 'sub',
      Menusub: true,
      active: false,
      permissions: ['can_view_roles'],
      children: [
        {
          path: '/pages/roles',
          title: 'Roles',
          type: 'link',
          selected: false,
          permissions: ['can_view_roles']
        }
      ]
    },

  ];

  // Array
  items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
}
