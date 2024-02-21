import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { IconNamesEnum, NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';

@Component({
  selector: 'app-Imges-Slider',
  standalone: true,
  imports: [CommonModule, NgxBootstrapIconsModule],
  template: `
    <style>
     
      .container-img {
        position: relative;
        overflow: hidden;
        height: 170px;
        width: 100%;
        border-radius: 10px;
        box-shadow: 0 0.3125rem 0.625rem 0 rgba(0, 0, 0, 0.12) !important;
      }

      .slider-image {
        width: 100%; 
        height: 100%; 
        object-fit: cover; 
        border-radius: 10px; 
      }

      .container-img:hover .right-icon {
        right: 20px;
      }

      .container-img:hover .left-icon {
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
    </style>
    
    <div class="container-img">
      <img
        [src]="imageList[currentIndex]"
        alt="Image slider"
        [style.objectFit]="'cover'"
        class="slider-image"
      />
      <span class="left-icon" (click)="previousImg()">
        <i-bs [name]="leftIcon"></i-bs>
      </span>
      <span class="right-icon" (click)="nextImg()">
        <i-bs [name]="righIcon"></i-bs>
      </span>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImgesSlider implements OnInit {
  public iconNames = IconNamesEnum;

  @Input({ required: true }) imageList: readonly string[] | File[];
  currentIndex = 0;
  leftIcon: IconNamesEnum = this.iconNames.ArrowLeftCircleFill;
  righIcon: IconNamesEnum = this.iconNames.ArrowRightCircleFill;
  constructor() {}
  ngOnInit(): void {}

  previousImg() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.imageList.length - 1; 
    }
  }

  nextImg() {
    if (this.currentIndex < this.imageList.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; 
    }
  }
}
