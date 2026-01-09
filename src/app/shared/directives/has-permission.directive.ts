import { Directive, Input, OnDestroy, OnInit, TemplateRef, ViewContainerRef } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { Subscription } from "rxjs";

@Directive({
    selector: '[appHasPermission]',
    standalone: false
})

export class HasPermissionDirective implements OnInit, OnDestroy {
    private permission: string; 
    private subscription: Subscription

    @Input() 
    set appHasPermission(permission: string) {
        this.permission = permission
        this.updateView()
    }

    constructor(
        private templateRef: TemplateRef<any>,
        private viewContainerRef: ViewContainerRef,
        private authService: AuthService
    ){}

    ngOnInit(): void {
        this.subscription = this.authService.currentUser$.subscribe((user) => {
            this.updateView()
        })
    }

    ngOnDestroy(): void {
        if(this.subscription) {
        this.subscription.unsubscribe()
        }
    }

    private updateView() {
        this.viewContainerRef.clear()
        if(this.authService.hasPermission(this.permission)) {
           
            this.viewContainerRef.createEmbeddedView(this.templateRef)
        }  else {
       
        }
    }
}