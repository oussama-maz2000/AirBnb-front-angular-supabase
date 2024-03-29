import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
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
        border-radius: 10px;
        background-size: cover;
        background: no-repeat center center;
        box-shadow: 0 0.3125rem 0.625rem 0 rgba(0, 0, 0, 0.12) !important;
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
    <div
      class="container-img"
      [style.background-image]="'url(' + imageList[currentIndex] + ')'"
      [style.box-shadow]="'0 .3125rem .625rem 0 rgba(0,0,0,.16)!important'"
      [ngStyle]="{
      'background-size': 'cover',
      'background-repeat': 'no-repeat',
      
    }"
    >
      <span class="left-icon" (click)="previousImg()"
        ><i-bs [name]="leftIcon"></i-bs
      ></span>
      <span class="right-icon" (click)="nextImg()"
        ><i-bs [name]="righIcon"></i-bs
      ></span>
    </div>
  `,
})
export class ImgesSlider implements OnInit {
  public iconNames = IconNamesEnum;

  @Input({ required: true }) imageList: string[];
  currentIndex = 0;
  leftIcon: IconNamesEnum = this.iconNames.ArrowLeftCircleFill;
  righIcon: IconNamesEnum = this.iconNames.ArrowRightCircleFill;
  constructor() {}
  ngOnInit(): void {
    console.log(this.imageList);
  }

  previousImg() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    } else {
      this.currentIndex = this.imageList.length - 1; // Loop back to the last image
    }
  }

  nextImg() {
    if (this.currentIndex < this.imageList.length - 1) {
      this.currentIndex++;
    } else {
      this.currentIndex = 0; // Loop back to the first image
    }
  }
}
