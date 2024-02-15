import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
('ngx-bootstrap-icons');
import { NgxDropzoneModule } from 'ngx-dropzone';
import { Store, select } from '@ngrx/store';
import { State } from 'src/app/store';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router } from '@angular/router';
import { getLng, getLoad } from 'src/app/store/selectors/settings-selectors';
import { combineLatest, distinctUntilChanged, filter, first, map, take } from 'rxjs';
import { NgSelectModule } from '@ng-select/ng-select';
import { willaya } from 'src/app/core/model/lists-data';
import { CustomInputError } from 'src/app/shared/components/custom-input-error';
import { CustomSpanError } from 'src/app/shared/components/custom-span-error';
import { ImgesSlider } from 'src/app/shared/components/imges-slider';
import { dropdowns, Dropdown } from 'src/app/core/model/dropdown';
import { HotToastService } from '@ngneat/hot-toast';
import { Annonce } from 'src/app/core/model/annonce.type';
import { Spinner } from 'src/app/shared/components/spinner';
import { QuillModule } from 'ngx-quill';
import { SettingsActions } from 'src/app/store/actions/settings-actions';
import { AnnonceActions } from 'src/app/store/actions/annonce-action';
import { getErrAnnonce, getSucAnnonce } from 'src/app/store/selectors/annonce-selectors';

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
    Spinner,
    QuillModule,
  ],
})
export class UpsertAnnounceComponent implements OnInit {
  public lang: string;
  public files: File[] = [];
  public willays!: string[];
  public requiredInformation: boolean = false;
  imageUrlList: string[] = [];

  public dropdowns: Dropdown[] = dropdowns;
  private toast = inject(HotToastService);
  public annonceForm: FormGroup;
  public quillConfig = {
    toolbar: {
      container: [
        ['bold', 'italic', 'underline', 'strike'],
        ['code-block'],
        [{ header: 1 }, { header: 2 }],
        [{ list: 'ordered' }, { list: 'bullet' }],
        ['clean'],
      ],
    },
  };
  

  ngOnInit(): void {
    this.initAnnonceForm();
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

  
  onSubmit() {
    this.requiredInformation = true;
    if(!this.annonceForm.invalid && this.files.length>0){
      const annonce=this.annonceForm.value as Annonce
      this.store.dispatch(AnnonceActions.insertAnnonce({annonce:annonce}))
      this.store.dispatch(SettingsActions.loading({loading:true}))
       
    }

   this.store.pipe(
    select(getSucAnnonce),
    filter(suc => suc !== null && suc !== undefined), 
  ).subscribe((suc:any) => {
   
    this.toast.success(suc, {
      theme: 'snackbar',
      position: 'bottom-center',
    });
    setTimeout(()=>{
      this.route.navigate(['/dashboard/announce']);
    },1500)
  }); 
  

  this.store.pipe(
    select(getErrAnnonce),
    
    
  ).subscribe((err:any) => {
    if(err){
    this.toast.error(err, {
      theme: 'snackbar',
      position: 'bottom-center',
    })};
    
  }); 
  }

  onClick(inputValue:HTMLInputElement) {
   console.log(inputValue.value);
   
    

this.annonceForm.patchValue({
  estate:     'House',
  type:    'sale'   ,
  willaya:   'Batna' ,
  codePostal: 500,
  price:    200  ,
  piece:    'f2'  ,
  surface:  100  ,
  details:{
    address: 'hello world',
    juridical:'AADL'
  }
})


  }

  getField(field: string) {
    if(field==="address" || field==="juridical"){
      return this.annonceForm.get("details")?.get(field)
    }
    return this.annonceForm.get(field);
  }

  get images() {
    return this.annonceForm.get('images') as FormArray;
  }

  resetImagesForm(): void {
    this.images.reset();
    this.files.length = 0;
    this.imageUrlList.length = 0;
  }

  getTranslatedItems(dropdown: any) {
    return dropdown.items.map((item: any) => ({
      ...item,
      name: this.translateService.instant(
        'UPSERT_ANNOUNCE_SCREEN.CHARACTERISTICS_FORM.' +
          dropdown.label_upper_choice +
          item.id
      ),
      value: item.name,
    }));
  }

  initAnnonceForm() {
    this.annonceForm = this.formBuilder.group({
      estate: [null, Validators.required],
      type: [null, Validators.required],
      willaya: [null, Validators.required],
      codePostal: [null, Validators.required],
      price: [null, Validators.required],
      images: this.formBuilder.array([], Validators.required),
      piece: [null, Validators.required],
      surface: [null, Validators.required],
      details: this.formBuilder.group({
        address: [null, Validators.required],
        juridical: [null, Validators.required],
        description:[null],
        publicService: [null],
        publicUtility: [null],
        hygiene: [null],
        cadreSituation: [null], 
        airContioning: [null],
        heating: [null],
        city: [null],
        kitchen: [null],
        floor: [null],
        facade: [null],
        stateProperty: [null],
        furnished: [null],
        negotiable: [null],
      }),
    });
  }


  constructor(
    private store: Store<State>,
    private translateService: TranslateService,
    private route: Router,
    private formBuilder: FormBuilder,
    
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

  
}




