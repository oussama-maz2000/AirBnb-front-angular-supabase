import { Component, OnInit } from '@angular/core';

import { FormControl, FormGroup, Validators } from '@angular/forms';
import { willaya } from 'src/app/core/model/lists-data';
import { Agence } from 'src/app/core/model/agence.model';

@Component({
  selector: 'app-add-agence',
  templateUrl: './add-agence.component.html',
  styleUrl: './add-agence.component.scss',
})
export class AddAgenceComponent implements OnInit {
  agenceForm: FormGroup;
  willaya: string[];

  ngOnInit(): void {
    this.createAgenceForm();
    this.willaya = willaya;
  }

  onSubmit() {
    let agence: Agence = {
      agenceName: this.agenceForm.get('name')?.value,
      agenceEmail: this.agenceForm.get('email')?.value,
      agenceDetails: {
        agencePhone: this.agenceForm.get('details')?.get('phone')?.value,
        agenceType: this.agenceForm.get('details')?.get('type')?.value,
        agenceWillaya: this.agenceForm.get('details')?.get('willaya')?.value,
        agenceAddress: this.agenceForm.get('details')?.get('address')?.value,
      },
    };
    console.log(this.agenceForm.value);
  }

  createAgenceForm() {
    this.agenceForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      details: new FormGroup({
        phone: new FormControl('', [Validators.required]),
        type: new FormControl(1, [Validators.required]),
        willaya: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required]),
      }),
    });
  }
}
