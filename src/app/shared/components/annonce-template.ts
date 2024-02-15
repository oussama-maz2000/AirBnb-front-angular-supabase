import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Annonce } from 'src/app/core/model/annonce.type';
import { logResponse } from 'src/app/core/decorators/log-response.decorator';
import { ImgesSlider } from './imges-slider';

@Component({
  selector: 'app-annonce-template',
  standalone: true,
  imports: [CommonModule,ImgesSlider],
  template: `
    <style>
      .heart-like {
        position: absolute;
        top: -20px;
        right: 20px;
        color: whitesmoke;
        transition: 0.3s;
        cursor: pointer;
      }

      .heart-like:hover {
        color: red;
      }

      .div-container-img-anc {
        position: relative;
        overflow: hidden;
        height: 200px;
        border-radius: 10px;
        background-size: cover;
        background: no-repeat center center;
        box-shadow: 0 0.3125rem 0.625rem 0 rgba(0, 0, 0, 0.12) !important;
      }

      .div-container-img-anc:hover .heart-like {
        top: 5px;
      }

      .div-container-img-anc:hover .right-icon {
        right: 20px;
      }

      .div-container-img-anc:hover .left-icon {
        left: 20px;
      }

      .right-icon {
        position: absolute;
        top: 50%;
        right: -220px;
        color: whitesmoke;
        cursor: pointer;
        transition: 0.3s;
      }

      .left-icon {
        position: absolute;
        top: 50%;
        left: -220px;
        color: whitesmoke;
        cursor: pointer;
        transition: 0.3s;
      }

      .type,
      .willaya {
        font-family: 'Poppins', sans-serif;
        font-size: 15px;
        font-weight: 500;
        color: rgb(16, 15, 15);
        padding-left: 5px;
      }

      p {
        margin-top: 0px;
        margin-bottom: 0px;
      }

      .p-surface,
      .surface,
      .temps {
        font-family: 'Poppins', sans-serif;
        font-size: 15px;
        font-weight: 300;
        color: rgb(75, 73, 73);
        padding-left: 5px;
      }

      .prix {
        font-family: 'Poppins', sans-serif;
        font-size: 16px;
        font-weight: 400;
        color: #222831;
        padding-left: 5px;
      }

      .col-sm-4.col-md-3 {
        cursor: pointer;
      }

      .text-center {
        font-family: var(--bs-font-monospace);
        font-weight: 600;
        color: #222831;
      }

      .mbtn {
        color: #f53939;
        border: 1px solid #f53939;
        border-radius: 0.5rem;
        background-color: transparent;
        transition: all 0.15s ease-in;
      }
      .mbtn:hover {
        background-color: #f53939;
        color: white;
      }
    </style>
    <div style="cursor: pointer" (click)="trackFn()">
     <app-Imges-Slider [imageList]='images'></app-Imges-Slider>
      <div>
        <p class="mt-2">
          <span class="type">{{ annonce.type }}</span>
          <span class="willaya">, {{ annonce.willaya }}</span>
        </p>
        <p>
          <span class="p-surface">{{ annonce.surface }}</span>
        </p>
        <p class="p-surface">
          Surface <span class="surface">{{ annonce.surface }} m²</span>
        </p>
        <p class="prix">
          {{ annonce.price }} DA<span
            class="temps"
            *ngIf="annonce.type == 'rent'"
            >par mois</span
          >
        </p>
        <button
          type="button"
          class="btn btn-outline-primary btn-sm mb-0 mt-1 mbtn"
        >
          View Details
        </button>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateAnnonce {
  @Input() annonce: Annonce;
  images:readonly string[] ;
  currentIndex = 0;

  constructor() {
  }

  ngOnInit(): void {
   this.images=(this.annonce.images as string[])
  }

  previousImg() {
    this.currentIndex--;
  }
  nextImg() {
    this.currentIndex++;
  }


trackFn(){
  console.log(this.annonce);
  return this.annonce.id;
}

}
