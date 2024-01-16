import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-span-error',
  standalone: true,
  imports: [CommonModule],
  template: `
    <style>
      .space-error-msg {
        display: inline-block;
      }
      .error-message {
        color: rgb(197, 42, 42);
        font-size: 12px;
        font-family: arial;
      }
    </style>
    <span class="space-error-msg">
      <span>{{ errorMesg }} </span>
    </span>
  `,
})
export class CustomSpanError {
  @Input({ required: true }) errorMesg: string;
}
