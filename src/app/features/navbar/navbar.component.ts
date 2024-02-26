import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconNamesEnum, NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';

@Component({
  selector: 'navbar',
  standalone: true,
  imports: [CommonModule,NgxBootstrapIconsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  public iconNames = IconNamesEnum;
  globeIcon: IconNamesEnum = this.iconNames.Globe;

}
