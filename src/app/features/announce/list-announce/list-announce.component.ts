import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnnounceService } from 'src/app/core/service/announce.service';

@Component({
  selector: 'app-list-announce',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list-announce.component.html',
  styleUrl: './list-announce.component.scss'
})
export class ListAnnounceComponent {
service:AnnounceService=inject(AnnounceService)
constructor(){
  this.service.getAllAnnonces().subscribe(console.log)
}

}
