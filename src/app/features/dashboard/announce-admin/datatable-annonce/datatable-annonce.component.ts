import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridOptions } from 'ag-grid-community';
import { AnnounceService } from 'src/app/core/service/announce.service';
import { Annonce } from 'src/app/core/model/annonce.type';
import { UpsertAnnounceDialogComponent } from '../upsert-announce/upsert-announce-dialog.component';
import { DialogService } from '@ngneat/dialog';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DeleteAnnonceComponent } from '../delete-annonce/delete-annonce.component';
import { Store, select } from '@ngrx/store';
import { AnnonceActions } from 'src/app/store/actions/annonce-action';
import { getAnnonces } from 'src/app/store/selectors/annonce-selectors';
import { SettingsActions } from 'src/app/store/actions/settings-actions';
@Component({
  selector: 'app-datatable-annonce',
  standalone: true,
  imports: [CommonModule, AgGridAngular, MatDialogModule],
  templateUrl: './datatable-annonce.component.html',
  styleUrl: './datatable-annonce.component.scss',
})
export class DatatableAnnonceComponent implements OnInit {
  public rowData: Annonce[];
  gridOptions: GridOptions;

  ngOnInit(): void {
    this.gridOptions = {
      onRowDoubleClicked: (event) => {
        this.showDisplayDataComponent(event.data);
      },
    };
  }

  // Column Definitions: Defines & controls grid columns.
  colDefs: ColDef[] = [
    {
      field: 'id',
      cellStyle: { color: 'white', 'background-color': '#ff385c' },
      width: 70,
      pinned: 'left',
      headerName:"ID"
    },
    {
      field: 'estate',
      /* cellStyle: (params) => {
        if (params.value === 'House') {
          return { white: 'red', backgroundColor: '#5cb25d' };
        } else return { white: 'red', backgroundColor: '#027788' };
      }, */
      width: 130,
    },
    { field: 'type', width: 100 },
    { field: 'price', headerName: 'Price DZD', width: 150 },
    { field: 'piece', width: 150 },
    { field: 'surface', headerName: 'Surface m²', width: 150 },
    { field: 'willaya', width: 170 },
    { field: 'details.juridical', headerName: 'Juridcal', width: 250 },
    { field: 'Delete', width: 90, cellRenderer: DeleteAnnonceComponent },
    { field: 'Update', width: 90 },
  ];

  private dialogService = inject(DialogService);

  showDisplayDataComponent(data: any) {
    this.dialogService.open(UpsertAnnounceDialogComponent, {
      height: '600px',
      width: '600px',

      data: data,
    });
  }

  newAnnonce() {
    this.route.navigate(['dashboard/upsert-announce']);
  }

  constructor(private route: Router, private store: Store) {
    this.store.dispatch(AnnonceActions.getAnnonces());
    this.store.dispatch(SettingsActions.loading({ loading: true }));
    this.store.select(getAnnonces).subscribe((data: Annonce[]) => {
      this.rowData = data;
    });
  }
}
