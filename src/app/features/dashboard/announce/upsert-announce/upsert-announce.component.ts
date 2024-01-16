import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
('ngx-bootstrap-icons');
import { NgxDropzoneModule } from 'ngx-dropzone';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { getLng } from 'src/app/store/selectors/settings-selectors';
import { map } from 'rxjs';
import { NgSelectModule } from '@ng-select/ng-select';
import { willaya } from 'src/app/core/model/lists-data';
import { CustomInputError } from 'src/app/shared/components/custom-input-error';
import { CustomSpanError } from 'src/app/shared/components/custom-span-error';
import { ImgesSlider } from 'src/app/shared/components/imges-slider';
import { dropdowns, Dropdown } from 'src/app/core/model/dropdown';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  standalone: true,
  templateUrl: './upsert-announce.component.html',
  styleUrls: ['upsert-announce.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxDropzoneModule,
    TranslateModule,
    NgSelectModule,
    CustomSpanError,
    CustomInputError,
    ImgesSlider,
  ],
})
export class UpsertAnnounceComponent implements OnInit {
  public lang: string;
  public files: File[] = [];
  public rootForm: FormGroup;
  public informationPropertyForm!: FormGroup;
  public characteristicsForm!: FormGroup;
  public detailsForm!: FormGroup;
  public imagesForm!: FormGroup;
  public willays!: string[];
  public InformationFormValidation: boolean = false;
  public imagesFormValidation: boolean = false;
  public dropdowns: Dropdown[] = dropdowns;
  private toast = inject(HotToastService);
  constructor(
    private store: Store<State>,
    private translateService: TranslateService,
    private router: Router
  ) {
    this.store
      .select(getLng)
      .pipe(
        map((data: string) => {
          this.lang = data;
          this.translateService.use(data);
        })
      )
      .subscribe();
    translateService.setDefaultLang(this.lang);
    this.willays = willaya;
  }

  ngOnInit(): void {
    this.initInformationForm();
    this.initCharacteristicsForm();
    this.initDetailsForm();
    this.initImagesForm();
    this.rootForm = new FormGroup({
      informationProperty: this.informationPropertyForm,
      characteristics: this.characteristicsForm,
      details: this.detailsForm,
      images: this.imagesForm,
    });
  }

  getMessages() {
    return {
      add: `User was added successfully`,
      edit: `User was updated successfully`,
    };
  }

  toggleDropdown(index: number) {
    this.dropdowns[index].isOpen = !this.dropdowns[index].isOpen;
  }

  onSelect(event: any): void {
    let newFiles = [];
    for (const file of event.addedFiles) {
      let fileExists = this.files.some(
        (existingFile) => existingFile.name === file.name
      );

      if (
        (file.type === 'image/jpeg' ||
          file.type === 'image/webp' ||
          file.type === 'image/png') &&
        !fileExists
      ) {
        this.files.push(file);
        this.images.push(new FormControl(file));
        newFiles.push(file);
      }
    }
    this.onFileSelected(newFiles);
  }
  onRemove(event: any) {
    const indexToRemove = this.files.findIndex(
      (file) => file.name === event.name
    );

    if (indexToRemove !== -1) {
      this.files.splice(indexToRemove, 1);
      this.images.removeAt(indexToRemove);
      this.imageUrlList.splice(indexToRemove, 1);
    }
  }

  imageUrlList: string[] = [];

  onFileSelected(newFiles: any[]): void {
    newFiles.forEach((file) => {
      if (file.type.match('image,*')) {
        const reader = new FileReader();
        reader.onload = (e: ProgressEvent<FileReader>) => {
          this.imageUrlList.push(e.target?.result as string);
        };
        reader.onerror = (e) => {
          console.error('error reading file ', e);
        };
        reader.readAsDataURL(file);
      }
    });
  }

  initInformationForm(): void {
    this.informationPropertyForm = new FormGroup({
      estate: new FormControl(null, Validators.required),
      annonce: new FormControl(null, Validators.required),
      address: new FormControl(null, Validators.required),
      willaya: new FormControl(null, Validators.required),
      codePostal: new FormControl(null, Validators.required),
      description: new FormControl(),
      juridical: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
    });
  }

  initCharacteristicsForm(): void {
    this.characteristicsForm = new FormGroup({
      publicService: new FormControl(null),
      publicUtility: new FormControl(null),
      hygiene: new FormControl(null),
      cadreSituation: new FormControl(null),
      airContioning: new FormControl(null),
      heating: new FormControl(null),
      city: new FormControl(null),
      kitchen: new FormControl(null),
    });
  }

  initDetailsForm(): void {
    this.detailsForm = new FormGroup({
      piece: new FormControl(null),
      floor: new FormControl(null),
      facade: new FormControl(null),
      surface: new FormControl(null),
      stateProperty: new FormControl(null),
      furnished: new FormControl(null),
      negotiable: new FormControl(null),
    });
  }

  initImagesForm(): void {
    this.imagesForm = new FormGroup({
      images: new FormArray([], [Validators.required]),
    });
  }

  onSubmit() {
    this.InformationFormValidation = true;
    this.imagesFormValidation = true;
    console.log(this.rootForm.value);

  
  }

  get juridical() {
    return this.informationPropertyForm.get('juridical');
  }

  get codePostal() {
    return this.informationPropertyForm.get('codePostal');
  }
  get willaya() {
    return this.informationPropertyForm.get('willaya');
  }

  get address() {
    return this.informationPropertyForm.get('address');
  }

  get annonce() {
    return this.informationPropertyForm.get('annonce');
  }

  get estate() {
    return this.informationPropertyForm.get('estate');
  }

  get price() {
    return this.informationPropertyForm.get('price');
  }

  get images() {
    return this.imagesForm.get('images') as FormArray;
  }

  resetImagesForm(): void {
    this.images.reset();
    this.files.length = 0;
    this.imageUrlList.length = 0;
  }
}
