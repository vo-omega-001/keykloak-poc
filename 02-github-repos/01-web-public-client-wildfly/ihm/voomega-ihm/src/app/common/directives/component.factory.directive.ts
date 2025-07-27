import {ComponentFactoryResolver, Directive, ViewContainerRef, Input, Type, OnInit} from '@angular/core';


@Directive({
    selector: '[appComponentFactory]',
})
export class ComponentFactoryDirective implements OnInit {

  constructor(public viewContainerRef: ViewContainerRef,
              public componentFactoryResolver: ComponentFactoryResolver) {}

  @Input() componentToLoad!: Type<any>;
  @Input() dataToLoad: any;

  ngOnInit() {
    const componentFactory =
      this.componentFactoryResolver.resolveComponentFactory(this.componentToLoad);
    this.viewContainerRef.clear();
    const componentRef =
      this.viewContainerRef.createComponent(
        componentFactory,
        undefined,
        this.viewContainerRef.parentInjector);
    if (this.dataToLoad) {
        (componentRef.instance).data = this.dataToLoad;
    }
  }
}
