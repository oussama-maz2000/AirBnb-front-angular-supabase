import {Component, inject} from "@angular/core";
import {CommonModule} from "@angular/common";
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {AnnounceImmo} from "../../../../core/model/announce-immo";
import {UpsertDialogComponent} from "../../../../shared/directives/upsert-dialog.component";

@Component({
  standalone: true,
  templateUrl: './upsert-announce-dialog.component.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule]
})
export class UpsertAnnounceDialogComponent extends UpsertDialogComponent<AnnounceImmo> {

  form = inject(FormBuilder).nonNullable.group({
    prpType: ['', Validators.required],
    annType: ['', Validators.required],
    jrcType: ['', Validators.required],
    etatType: ['', Validators.required],
    address: ['', Validators.required],
    willaya: ['', Validators.required],
  });

  getMessages() {
    return {
      add: `User was added successfully`,
      edit: `User was updated successfully`,
    };
  }

}
