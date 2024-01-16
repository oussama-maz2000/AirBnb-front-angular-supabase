import {Component, OnInit} from "@angular/core";
import {CommonModule} from "@angular/common";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {NgxBootstrapIconsModule} from "ngx-bootstrap-icons";
import {LottieModule} from "ngx-lottie";
import {RouterModule} from "@angular/router";
import {Store} from "@ngrx/store";
import {State} from "../../../store";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatSnackBarModule,
    NgxBootstrapIconsModule,
    LottieModule,
    RouterModule,
  ],
  providers: []
})
export class SettingsComponent implements OnInit{

  constructor(private store: Store<State>,
              private translateService: TranslateService) {
    translateService.setDefaultLang('fr');
    translateService.use('fr');
  }

  ngOnInit(): void {
  }

}
