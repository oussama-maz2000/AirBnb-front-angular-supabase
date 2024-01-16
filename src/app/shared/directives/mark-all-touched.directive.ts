import {Directive, HostListener, Self} from "@angular/core";
import {ControlContainer} from "@angular/forms";

@Directive({
  selector: 'form[formGroup]',
  standalone: true
})
export class MarkAllTouchedDirective {
  @HostListener('submit')
  public onSubmit(): void {
    this.container?.control?.markAllAsTouched();
  }

  constructor(
    @Self() private container: ControlContainer
  ) {}
}
