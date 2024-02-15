import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconNamesEnum, NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';
import { Annonce } from 'src/app/core/model/annonce.type';
import { DialogService } from '@ngneat/dialog';
import { ConfirmationComponent } from 'src/app/shared/components/confirm-dialog';
import { Store } from '@ngrx/store';
import { SettingsActions } from 'src/app/store/actions/settings-actions';
import { AnnounceService } from 'src/app/core/service/announce.service';
import { catchError, concatMap, from, map, of, tap } from 'rxjs';
import { AnnonceActions } from 'src/app/store/actions/annonce-action';
@Component({
  selector: 'app-delete-annonce',
  standalone: true,
  imports: [CommonModule,NgxBootstrapIconsModule],
  template: `
    <div class="text-center">
      <!-- <span>{{ cellValue }}</span
      >&nbsp; -->
      <i-bs [name]="deleteIcon" style="color: red;" (click)="delete()"></i-bs
      >
</div>
  `,
})
export class DeleteAnnonceComponent implements ICellRendererAngularComp{
  public iconNames = IconNamesEnum;
  public cellValue!: string;
  deleteIcon:IconNamesEnum=this.iconNames.Trash3Fill
  public params!: ICellRendererParams;
  private dialogService = inject(DialogService);

  delete(){
    const { node } = this.params;
    const data:Annonce = node.data;
    
   const dialogRef= this.dialogService.open(ConfirmationComponent, {
      height: '150px',
      width: '200px',
      data: data
    });
    dialogRef.afterClosed$.subscribe(value=>{
      /* if(value)[
        this.store.dispatch(SettingsActions.loading({loading:true})),

      ] */
      

console.log(data);
this.store.dispatch(SettingsActions.loading({loading:true}))
this.store.dispatch(AnnonceActions.deleteAnnonce({id:<number>data.id}))








      const imageUrlLists=[
        "https://yarlrybrsqapllwioing.supabase.co/storage/v1/object/public/ANNOUNCE_IMAGES/292649c2-bb56-4aa7-a7c1-469b3a0d043c?t=2024-02-01T11%3A07%3A08.286Z",
        "https://yarlrybrsqapllwioing.supabase.co/storage/v1/object/public/ANNOUNCE_IMAGES/57ad5280-7b61-4d5b-bbe0-e3a2723fc445",
      "https://yarlrybrsqapllwioing.supabase.co/storage/v1/object/public/ANNOUNCE_IMAGES/2a2dd821-6b42-4b54-81c7-1310f88d1f5d?t=2024-02-01T11%3A07%3A21.500Z",
       "https://yarlrybrsqapllwioing.supabase.co/storage/v1/object/public/ANNOUNCE_IMAGES/23499841-b530-4c36-9eef-aba79f529721?t=2024-01-31T14%3A22%3A50.166Z",
      "https://yarlrybrsqapllwioing.supabase.co/storage/v1/object/public/ANNOUNCE_IMAGES/36823808-9639-4481-97b8-88b1ff1dd4e8?t=2024-02-01T11%3A07%3A38.093Z"]
      
      /* if(value){
         this.service.deleteAnnonce(<number>data.id).subscribe(value=>{console.log(value);
        }) 
        this.service.deleteImages(imageUrlLists).subscribe(value=>{console.log(value)})

      } */
  /*     const resultList:string[]=[]
      imageUrlLists.map(element=>resultList.push(element.replace('public/','')))
this.service.deleteImages(resultList).pipe(concatMap((el)=>{
  console.log("FROM MAP FUNCTION");
  
  console.log(el.body)
return of()
}),catchError((err)=>{
  console.log("FROM CATCH ERROR ");
  
  console.log(err.error)
  return of();
})).subscribe() */
    
const resultList:string[] = [];
/* imageUrlLists.forEach(element => resultList.push(element.replace('public/', '')));

from(resultList).pipe(
  concatMap(el => {
    return this.service.deleteImages([el]).pipe(
      tap((response:any) => console.log('FROM MAP FUNCTION: ',response[0].body.message)),
      catchError(err => {
        console.log('FROM CATCH ERROR: ',err.error.message);
        return of(); 
      })
    );
  })
).subscribe(); */


})
  }
  agInit(params: ICellRendererParams): void {
    this.params = params;
    
  }
  refresh(params: ICellRendererParams) {
    // set value into cell again
    
    return true;
  }



constructor(private store:Store,private service:AnnounceService){}

}
