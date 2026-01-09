import { fromEvent } from 'rxjs';

export function switcherArrowFn() {
  let slideLeft: any = document.querySelector('.slide-left');
  let slideRight: any = document.querySelector('.slide-right');

  fromEvent(slideLeft, 'click').subscribe(() => {
    slideClick();
  });
  fromEvent(slideRight, 'click').subscribe(() => {
    slideClick();
  });

  // used to remove is-expanded class and remove class on clicking arrow buttons
  function slideClick() {
    let slide = document.querySelectorAll<HTMLElement>('.slide');
    let slideMenu = document.querySelectorAll<HTMLElement>('.slide-menu');
    slide.forEach((element, index) => {
      if (element.classList.contains('is-expanded') == true) {
        element.classList.remove('is-expanded');
      }
    });
    slideMenu.forEach((element, index) => {
      if (element.classList.contains('open') == true) {
        element.classList.remove('open');
        element.style.display = 'none';
      }
    });
  }

  checkHoriMenu();

  fromEvent(slideLeft, 'click').subscribe(() => {

    let menuNav: any = document.querySelector<HTMLElement>('.side-menu');
    let mainContainer1: any =
      document.querySelector<HTMLElement>('.main-sidemenu');
    let marginLeftValue = Math.ceil(Number(window.getComputedStyle(menuNav).marginLeft.split('px')[0]));
    let marginRightValue = Math.ceil(Number(window.getComputedStyle(menuNav).marginRight.split('px')[0]));
    let mainContainer1Width = mainContainer1.offsetWidth;
    if (menuNav.scrollWidth > mainContainer1.offsetWidth) {
      if (!document.body.classList.contains('rtl')) {
        if ( marginLeftValue < 0 && !(Math.abs(marginLeftValue) < mainContainer1Width)) {
          menuNav.style.marginRight = 0;
          menuNav.style.marginLeft = Number(menuNav.style.marginLeft.split('px')[0]) + Math.abs(mainContainer1Width) + 'px';
          slideRight.classList.remove('d-none');
        } else if (marginLeftValue >= 0) {
          menuNav.style.marginLeft = '0px';
          slideLeft.classList.add('d-none');
          slideRight.classList.remove('d-none');
        } else {
          menuNav.style.marginLeft = '0px';
          slideLeft.classList.add('d-none');
          slideRight.classList.remove('d-none');
        }
      } else {
        if ( marginRightValue < 0 && !(Math.abs(marginRightValue) < mainContainer1Width)) {
          menuNav.style.marginLeft = 0;
          menuNav.style.marginRight = Number(menuNav.style.marginRight.split('px')[0]) + Math.abs(mainContainer1Width) + 'px';
          slideRight.classList.remove('d-none');
        } else if (marginRightValue >= 0) {
          menuNav.style.marginRight = '0px';
          slideLeft.classList.add('d-none');
          slideRight.classList.remove('d-none');
        } else {
          menuNav.style.marginRight = '0px';
          slideLeft.classList.add('d-none');
          slideRight.classList.remove('d-none');
        }
      }
    }

    slideClick();
    return;
    //
  });
  fromEvent(slideRight, 'click').subscribe(() => {
    let menuNav: any = document.querySelector<HTMLElement>('.side-menu');
    let mainContainer1: any = document.querySelector<HTMLElement>('.main-sidemenu');

    let marginLeftValue = Math.ceil(Number(window.getComputedStyle(menuNav).marginLeft.split('px')[0]));
    let marginRightValue = Math.ceil(Number(window.getComputedStyle(menuNav).marginRight.split('px')[0]));
    let check = menuNav.scrollWidth - mainContainer1.offsetWidth;
    let mainContainer1Width = mainContainer1.offsetWidth;

    if (menuNav.scrollWidth > mainContainer1.offsetWidth) {
      if (!document.body.classList.contains('rtl')) {
        if (Math.abs(check) > Math.abs(marginLeftValue)) {
          menuNav.style.marginRight = 0;
          if (!(Math.abs(check) > Math.abs(marginLeftValue) + mainContainer1Width)) {
            mainContainer1Width = Math.abs(check) - Math.abs(marginLeftValue);
            slideRight.classList.add('d-none');
          }
          menuNav.style.marginLeft = Number(menuNav.style.marginLeft.split('px')[0]) - Math.abs(mainContainer1Width) + 'px';
          slideLeft.classList.remove('d-none');
        }
      } else {
        if (Math.abs(check) > Math.abs(marginRightValue)) {
          menuNav.style.marginLeft = 0;
          if (!(Math.abs(check) > Math.abs(marginRightValue) + mainContainer1Width)) {
            mainContainer1Width = Math.abs(check) - Math.abs(marginRightValue);
            slideRight.classList.add('d-none');
          }
          menuNav.style.marginRight = Number(menuNav.style.marginRight.split('px')[0]) - Math.abs(mainContainer1Width) + 'px';
          slideLeft.classList.remove('d-none');
        }
      }
    }

    slideClick();
    return;
  });
}
export function checkHoriMenu() {

  let menuNav: any = document.querySelector<HTMLElement>('.side-menu');
  let mainContainer1: any = document.querySelector<HTMLElement>('.main-sidemenu');
  let slideLeft: HTMLElement | any = document.querySelector('.slide-left');
  let slideRight: HTMLElement | any = document.querySelector('.slide-right');
  let marginLeftValue = Math.ceil(Number(window.getComputedStyle(menuNav).marginLeft.split('px')[0]));
  let marginRightValue = Math.ceil(Number(window.getComputedStyle(menuNav).marginRight.split('px')[0]));
  let check = menuNav.scrollWidth - mainContainer1.offsetWidth;


  setTimeout(()=>{

      // Show/Hide the arrows
    if (menuNav.scrollWidth > mainContainer1.offsetWidth) {
      slideRight.classList.remove('d-none');
      slideLeft.classList.add('d-none');
    }
    else{
      slideRight.classList.add('d-none');
      slideLeft.classList.add('d-none');
      menuNav.style.marginLeft = '0px';
      menuNav.style.marginRight = '0px';
    }
    if(marginLeftValue == 0 || marginRightValue == 0){
      slideLeft.classList.add('d-none');
    }
    else{
      slideLeft.classList.remove('d-none');
    }
    //
    if(!document.body.classList.contains('rtl')){

      // LTR check the width and adjust the menu in screen
      if (menuNav.scrollWidth > mainContainer1.offsetWidth){
        if(Math.abs(check) < Math.abs(marginLeftValue)){
          menuNav.style.marginLeft = -check + 'px';
          slideLeft.classList.remove('d-none');
          slideRight.classList.add('d-none');
        }
      }
    }
    else{
      // RTL check the width and adjust the menu in screen
      if (menuNav.scrollWidth > mainContainer1.offsetWidth){
        if(Math.abs(check) < Math.abs(marginRightValue)){
          menuNav.style.marginRight = -check + 'px';
          slideLeft.classList.remove('d-none');
          slideRight.classList.add('d-none');
        }
      }
    }
    if(marginLeftValue != 0 || marginRightValue !=0 ){
      slideLeft.classList.remove('d-none');
    }
  }, 500)

}

