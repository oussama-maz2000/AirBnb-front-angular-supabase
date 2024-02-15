import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import spinners from 'node_modules/cli-spinners';
@Component({
  selector: 'spinner',
  standalone: true,
  imports: [CommonModule],
  template: `
    <style>
      .spinner {
        border: 4px solid rgba(0, 0, 0, 0.1);
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border-left-color: #09f;
        animation: spin 1s ease infinite;
      }
      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
      .spinner-overlay {
        position: fixed; 
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center; 
        align-items: center;
        z-index: 9999; 
      }
    </style>
    <div class="spinner-overlay">
      <div class="spinner">
      </div>
    </div>
  `,
})
export class Spinner {
  constructor() {}

  static showSpinner() {
    spinners.dots9;
  }
}
