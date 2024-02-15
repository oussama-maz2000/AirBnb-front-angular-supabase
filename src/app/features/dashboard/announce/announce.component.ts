import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UpsertDialogData } from '../../../core/model/upsert-dialog-data';
import { UpsertAnnounceDialogComponent } from './upsert-announce/upsert-announce-dialog.component';
import { DialogService } from '@ngneat/dialog';
import { AnnounceImmo } from '../../../core/model/announce-immo';
import { of } from 'rxjs';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'real-estate-ad-app',
  templateUrl: './announce.component.html',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ReactiveFormsModule],
})
export class AnnounceComponent {
  public realEstateAd: AnnounceImmo = {
    prpType: 'TEST',
    annType: 'LOCATION',
    jrcType: 'str ing',
    etatType: 'Bon état',
    address: '10 rue de test 05000',
    willaya: 'Batna',
  };
  private dialogService = inject(DialogService);

  constructor(private router: Router) {}
  openUpsertUserDialog(
    action: UpsertDialogData<AnnounceImmo>['action'],
    currentValue?: UpsertDialogData<AnnounceImmo>['currentValue']
  ) {
    /* this.dialogService.open(UpsertAnnounceDialogComponent, {
      height: '500px',
      width: '800px',
      data: {
        action,
        currentValue,
        actions$: {
          add: (realEstateAd: AnnounceImmo) => of('add'),
          edit: (realEstateAd: AnnounceImmo) => of('edit'),
        },
      },
    }); */
  }
  goToUpsert() {
    this.router.navigate(['dashboard/upsert-announce']);
  }
}
