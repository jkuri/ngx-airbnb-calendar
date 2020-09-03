import {
  Directive,
  ViewContainerRef,
  ComponentFactoryResolver,
  ComponentFactory,
  HostListener,
  ElementRef,
  ComponentRef
} from '@angular/core';
import { AirbnbCalendarComponent } from './airbnb-calendar.component';

@Directive({
  selector: '[airbnb-calendar]'
})
export class AirbnbCalendarDirective {
  component: ComponentRef<AirbnbCalendarComponent>;
  componentFactory: ComponentFactory<AirbnbCalendarComponent>;

  constructor(private cfr: ComponentFactoryResolver, private vc: ViewContainerRef, private el: ElementRef) {
    this.componentFactory = this.cfr.resolveComponentFactory(AirbnbCalendarComponent);
    this.vc.clear();
    this.component = this.vc.createComponent(this.componentFactory);
  }

  @HostListener('focus', ['$event.target']) onFocus(): void {
    this.component.instance.isOpened = true;
  }

  @HostListener('document:click', ['$event']) onBlurClick(e: MouseEvent): void {
    if (!this.component.instance.isOpened) {
      return;
    }

    const input = this.el.nativeElement;
    if (!input) {
      return;
    }

    if (e.target === input || input.contains(e.target)) {
      return;
    }

    const container = this.el.nativeElement.parentElement.querySelector('.airbnb-calendar-container');
    if (
      container &&
      container !== e.target &&
      !(e.target as HTMLElement).classList.contains('day') &&
      !container.contains(e.target)
    ) {
      this.component.instance.isOpened = false;
    }
  }
}
