import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/shared/models/user';
import { Auth } from 'src/app/components/classes/auth';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Menu, NavService } from 'src/app/shared/services/nav.service';
import { SwitcherService } from 'src/app/shared/services/switcher.service';

@Component({
    selector: 'app-content-layout',
    templateUrl: './content-layout.component.html',
    styleUrls: ['./content-layout.component.scss'],
    standalone: false
})
export class ContentLayoutComponent implements OnInit {
  public menuItems!: Menu[];
  user: User

  constructor(
    public SwitcherService: SwitcherService,
    private router: Router,
    private authService: AuthService,
    public navServices: NavService,
  ) {
    this.navServices.items.subscribe((menuItems: any) => {
      this.menuItems = menuItems;
    });
  }
  ngOnInit() {
    this.authService.user().subscribe(
      user => {
        this.user = user;
        Auth.userEmitter.emit(this.user);
      },
      () => this.router.navigate(['/auth/login'])
    )
  }

  toggleSwitcherBody() {
    this.SwitcherService.emitChange(false);
  }

  ngOnDestroy(){
    location.reload()
  }

  scrolled: boolean = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrolled = window.scrollY > 74;
  }


}
