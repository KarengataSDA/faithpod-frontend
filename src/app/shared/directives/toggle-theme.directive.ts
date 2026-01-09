import { Directive, HostListener } from '@angular/core';

@Directive({
    selector: '[appToggleTheme]',
    standalone: false
})
export class ToggleThemeDirective {
  private body:HTMLBodyElement | any = document.querySelector('body');
  constructor() { }

  @HostListener('click') toggleTheme(){

    if (this.body != !this.body) {
      this.body.classList.toggle('dark-mode');
      this.body.classList.remove('bg-img1');
      this.body.classList.remove('bg-img2');
      this.body.classList.remove('bg-img3');
      this.body.classList.remove('bg-img4');
      if(this.body.classList.contains('dark-mode')){
        localStorage.setItem('KarengataDarkTheme', 'true')
        let DarkBtn : any = document.querySelector("#myonoffswitch2")
        DarkBtn.checked = true
      }else{
        localStorage.removeItem('KarengataDarkTheme')
        let DarkBtn : any = document.querySelector("#myonoffswitch1")
        DarkBtn.checked = true
      }
    }
  }
}
