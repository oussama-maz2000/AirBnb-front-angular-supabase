import { CommonModule } from "@angular/common";
import { Component, inject } from "@angular/core";
import { DialogRef } from "@ngneat/dialog";

@Component({
    selector:'confirm-custom-dialog',
    template:`
    <div class="container-fluid">
        <h5 class="h5 text-center pt-3">Confirmation</h5>
        <p class="text-center text-wrap">Are you sure ?</p>
<div class="text-center mt-2">
   <button (click)="onConfirm()" class="btn bg-danger btn-sm text-white">delete</button>
</div>
    </div>
    `,
    standalone: true,
    imports: [
        CommonModule,
        
        
      ],
})

export class ConfirmationComponent{
    private dialogRef: DialogRef = inject(DialogRef);
    onConfirm(){
        this.dialogRef.close(true)
    }
}