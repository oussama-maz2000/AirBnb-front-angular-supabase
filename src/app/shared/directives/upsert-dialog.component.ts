import {Directive, inject, OnInit} from "@angular/core";
import {HotToastService} from "@ngneat/hot-toast";
import {loadingFor} from "@ngneat/loadoff";
import {DialogRef} from "@ngneat/dialog";
import {FormGroup} from "@angular/forms";

@Directive()
export abstract class UpsertDialogComponent<T extends Record<string, any>> implements OnInit{

  private toast = inject(HotToastService);
  loader = loadingFor('upsert');
  ref = inject(DialogRef);

  abstract get form(): FormGroup;

  abstract getMessages(): Record<string, string>;

  get action() {
    return this.ref.data.action;
  }

  ngOnInit() {
    if (this.ref.data.action === 'edit') {
      this.form.patchValue(this.ref.data.currentValue);
    }
  }

  upsert() {
    console.log(this.form);
    console.log(this.ref)
    console.log(this.ref.data)
    console.log(this.ref.data.actions$)
    console.log(this.action)
    console.log(this.getMessages())
    if (this.form.invalid) return;

    this.ref.data.actions$[this.action](this.form.getRawValue())
      .pipe(this.loader.upsert.track())
      .subscribe(() => {
        this.ref.close();
        this.toast.success(this.getMessages()[this.action]);
      });
  }

}
