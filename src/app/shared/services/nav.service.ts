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

  filterMenuItems(userPermissions: string[], userRoles: string[] = []): void {
    const isSuperAdmin = userRoles.includes('super_admin');
    const filteredItems = this.MENUITEMS.filter(menu => {
      if (!menu.permissions || menu.permissions.length === 0) {
        return true;
      }
      // super_admin sees everything
      if (isSuperAdmin) {
        return true;
      }
      return menu.permissions.some(permission => userPermissions.includes(permission));
    });
    this.items.next(filteredItems);
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
      headTitle: 'Announcements',
      permissions: ['can view announcements']
    },
     {
      title: 'Announcements',
      selected: false,
      icon: 'briefcase',
      type: 'sub',
      Menusub: true,
      active: false,
      permissions: ['can view announcements'],
      children: [
        {
          path: '/pages/announcements',
          title: 'Announcements',
          type: 'link',
          selected: false,
          permissions: ['can view announcements']
        }
      ]
    },
    {
      headTitle: 'MEMBERSHIP',
      permissions: ['view members', 'view membership types']
    },
    {
      title: 'Members',
      selected: false,
      icon: 'users',
      type: 'sub',
      Menusub: true,
      active: false,
      permissions: ['view members'],
      children: [
        {
          path: '/pages/members',
          title: 'Members List',
          type: 'link',
          selected: false,
          permissions: ['view members']
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
      permissions: ['view membership types'],
      children: [

        {
          path: '/pages/memberships',
          title: 'Membership Type',
          type: 'link',
          selected: false,
          permissions: ['view membership types']
        }
      ],
    },
    {
      headTitle: 'TREASURY',
      permissions: ['view contribution types']
    },
    {
      title: 'Categories',
      selected: false,
      icon: 'pie-chart',
      type: 'sub',
      Menusub: true,
      active: false,
      permissions: ['view contribution types'],
      children: [
        {
          path: '/pages/treasury/collection-categories',
          title: 'Categories',
          type: 'link',
          selected: false,
          permissions: ['view contribution types']
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
      permissions: ['view contribution types'],
      children: [
        {
          path: '/pages/treasury/collections',
          title: 'Date Categories',
          type: 'link',
          selected: false,
          permissions: ['view contribution types']

        },
        {
          path: '/pages/treasury/all-collections',
          title: 'All Contributions',
          type: 'link',
          selected: false,
          permissions: ['view contribution types']

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
      permissions: ['view contribution types'],
      children: [
        {
          path: '/pages/treasury/paybill-transactions',
          title: 'Paybill Collection',
          type: 'link',
          selected: false,
          // permissions: ['view contribution types']

        },
      ],
    },
    {
      headTitle: 'POPULATION GROUPS',
      permissions: ['view population groups']
    },
    {
      title: 'Groups',
      selected: false,
      icon: 'users',
      type: 'sub',
      Menusub: true,
      active: false,
      permissions: ['view population groups'],
      children: [
        {
          path: '/pages/groups',
          title: 'Groups',
          type: 'link',
          selected: false,
          permissions: ['view population groups']
        }
      ],
    },
    {
      headTitle: 'Prayercell',
      permissions: ['view prayer cells']
    },
    {
      title: 'Prayercells',
      selected: false,
      icon: 'map',
      type: 'sub',
      Menusub: true,
      active: false,
      permissions: ['view prayer cells'],
      children: [
        {
          path: '/pages/prayercells',
          title: 'Prayercells',
          type: 'link',
          selected: false,
          permissions: ['view prayer cells']
        }
      ]
    },
    {
      headTitle: 'Messages',
      permissions: ['view messages']
    },
    {
      title: 'Messages',
      selected: false,
      icon: 'mail',
      type: 'sub',
      Menusub: true,
      active: false,
      permissions: ['view messages'],
      children: [
        {
          path: '/pages/messages',
          title: 'Messages',
          type: 'link',
          selected: false,
          permissions: ['view messages']
        },
        {
          path: '/pages/messages/birthday-wishes',
          title: 'Birthday Wishes',
          type: 'link',
          selected: false,
          permissions: ['view messages']
        }
      ]
    },
    {
      headTitle: 'Hymns',
      permissions: []
    },
    {
      title: 'Hymns',
      selected: false,
      icon: 'music',
      type: 'sub',
      Menusub: true,
      active: false,
      permissions: [],
      children: [
        {
          path: '/pages/hymns',
          title: 'All Hymns',
          type: 'link',
          selected: false,
          permissions: []
        },
        {
          path: '/pages/hymns/languages',
          title: 'Languages',
          type: 'link',
          selected: false,
          permissions: []
        },
        {
          path: '/pages/hymns/favorites',
          title: 'My Favorites',
          type: 'link',
          selected: false,
          permissions: []
        }
      ]
    },
    {
      headTitle: 'Settings',
      permissions: ['view roles', 'edit members']
    },
    {
      title: 'Roles',
      selected: false,
      icon: 'settings',
      type: 'sub',
      Menusub: true,
      active: false,
      permissions: ['view roles'],
      children: [
        {
          path: '/pages/roles',
          title: 'Roles',
          type: 'link',
          selected: false,
          permissions: ['view roles']
        }
      ]
    },
    {
      title: 'Activity Log',
      selected: false,
      icon: 'activity',
      type: 'sub',
      Menusub: true,
      active: false,
      permissions: ['edit members'],
      children: [
        {
          path: '/pages/settings/activity-log',
          title: 'Member Activity Log',
          type: 'link',
          selected: false,
          permissions: ['edit members']
        }
      ]
    },
    {
      title: 'Branding',
      selected: false,
      icon: 'image',
      type: 'sub',
      Menusub: true,
      active: false,
      permissions: ['view roles'],
      children: [
        {
          path: '/pages/settings/branding',
          title: 'Branding',
          type: 'link',
          selected: false,
          permissions: ['view roles']
        }
      ]
    },
    {
      title: 'App Settings',
      selected: false,
      icon: 'settings',
      type: 'sub',
      Menusub: true,
      active: false,
      permissions: ['view roles'],
      children: [
        {
          path: '/pages/settings/app-settings',
          title: 'App Settings',
          type: 'link',
          selected: false,
          permissions: ['view roles']
        }
      ]
    },

  ];

  // Array
  items = new BehaviorSubject<Menu[]>(this.MENUITEMS);
}
