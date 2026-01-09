import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-error-layout',
    templateUrl: './error-layout.component.html',
    styleUrls: ['./error-layout.component.scss'],
    standalone: false
})
export class ErrorLayoutComponent implements OnInit {

  constructor() { 
    if (localStorage.getItem('KarengataDarkTheme') !== null) {
      document.querySelector('body')?.classList.add('dark-mode');
    }
    if (localStorage.getItem('KarengataTransparentTheme') !== null) {
      document.querySelector('body')?.classList.add('transparent-mode');
    }
    if (localStorage.getItem('KarengataLightTheme') !== null) {
      document.querySelector('body')?.classList.add('light-mode');
    }
    if (localStorage.getItem('KarengataBgImage') !== null) {
      document.querySelector('body')?.classList.add('transparent-mode');
      document
        .querySelector('.app-header')
        ?.classList.add(
          'hor-header',
          'fixed-header',
          'visible-title',
          'stickyClass'
        );
      document.querySelector('body')?.classList.remove('light-mode');
      let BgImage: any = localStorage.getItem('KarengataBgImage');
      document.querySelector('body')?.classList.add(BgImage);
    }
  }

  ngOnInit(): void {
    
  }

}
