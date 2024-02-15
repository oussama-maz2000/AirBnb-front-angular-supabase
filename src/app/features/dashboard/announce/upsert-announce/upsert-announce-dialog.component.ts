import {Component, Inject, Input, OnInit, Optional, inject} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";

import { DialogRef } from "@ngneat/dialog";
import { ImgesSlider } from "src/app/shared/components/imges-slider";

@Component({
  standalone: true,
  templateUrl: './upsert-announce-dialog.component.html',


  imports: [CommonModule, FormsModule, ReactiveFormsModule,ImgesSlider]
})
export class UpsertAnnounceDialogComponent implements OnInit{
ref: DialogRef = inject(DialogRef);

ngOnInit(): void {
  console.log(this.ref.data);
}

}
