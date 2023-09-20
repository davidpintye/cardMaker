import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { BackComponent } from './cards/back/back.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatTabsModule } from "@angular/material/tabs";
import { MatSliderModule } from "@angular/material/slider";
import { MatRippleModule } from "@angular/material/core";
import { MatCardModule } from "@angular/material/card";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatListModule } from "@angular/material/list";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatProgressBar, MatProgressBarModule } from "@angular/material/progress-bar";
import { DragDropModule } from "@angular/cdk/drag-drop";

import { AppComponent } from './app.component';
import { CardsComponent } from './cards/cards.component';
import { PanelComponent } from './panel/panel.component';
import { CardEditorComponent } from './card-editor/card-editor.component';
import { CardPrinterComponent } from './card-printer/card-printer.component';
import { DisplaysCardsComponent } from './displays-cards/displays-cards.component';
import { ScaleDirective } from './directives/scale.directive';
import { FigureCardsComponent } from './cards/figure-cards/figure-cards.component';
import { FigureOptionsDirective } from './directives/figure-options.directive';
import { NumberCardsComponent } from './cards/number-cards/number-cards.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideDatabase,getDatabase } from '@angular/fire/database';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthComponent } from './auth/auth.component';
import { SignupComponent } from './auth/signup/signup.component';
import { OthersComponent } from './cards/others/others.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AuthComponent,
    AppComponent,
    CardsComponent,
    PanelComponent,
    BackComponent,
    CardEditorComponent,
    CardPrinterComponent,
    DisplaysCardsComponent,
    ScaleDirective,
    FigureCardsComponent,
    FigureOptionsDirective,
    NumberCardsComponent,
    MainComponent,
    LoginComponent,
    SignupComponent,
    OthersComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatRippleModule,
    MatSliderModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    DragDropModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore())
  ],
  providers: [{ provide: FIREBASE_OPTIONS, useValue: environment.firebase }],
  bootstrap: [AppComponent]
})
export class AppModule { }
