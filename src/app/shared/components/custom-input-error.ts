import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-custom-input-error',
  standalone: true,
  imports: [CommonModule],
  template: `
    <style>
      .error {
        color: #f87171;
        font-size: 12px;
      }
    </style>
    <div class="error">
      <ng-content />
    </div>
  `,

  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomInputError {}
