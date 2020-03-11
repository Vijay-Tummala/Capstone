import { MapserviceService } from './mapservice.service';
import { EmergencyContactComponent } from './emergency-contact/emergency-contact.component';
import { AddUserComponent } from './add-user/add-user.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ApplicationRef } from '@angular/core';
import { HttpModule } from '@angular/http';
import {RouterModule} from '@angular/router';
import {appRoutes} from './app.routes';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { MyDatePickerModule } from 'mydatepicker';
import { NgDatepickerModule } from 'ng2-datepicker';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { MapComponent } from './map/map.component';
import { AppRiskComponent } from './risks/app-risk/app-risk.component';
import { ReadRisksComponent } from './risks/read-risks/read-risks.component';
import { CreateRiskComponent } from './risks/create-risk/create-risk.component';
import { ReadOneRiskComponent } from './risks/read-one-risk/read-one-risk.component';
import { UpdateRiskComponent } from './risks/update-risk/update-risk.component';
import { DeleteRiskComponent } from './risks/delete-risk/delete-risk.component';
import { AppTripRiskComponent } from './triprisks/app-triprisk/app-triprisk.component';
import { ReadTripRisksComponent } from './triprisks/read-triprisks/read-triprisks.component';
import { CreateTripRiskComponent } from './triprisks/create-triprisk/create-triprisk.component';
import { ReadOneTripRiskComponent } from './triprisks/read-one-triprisk/read-one-triprisk.component';
import { UpdateTripRiskComponent } from './triprisks/update-triprisk/update-triprisk.component';
import { DeleteTripRiskComponent } from './triprisks/delete-triprisk/delete-triprisk.component';

import { TaskCreateComponent } from './task/task-create/task-create.component';
import { ReadTaskComponent } from './task/read-task/read-task.component';
import { AppTaskComponent } from './task/app-task/app-task.component';
import { DeleteTaskComponent } from './task/delete-task/delete-task.component';
import { UpdateTaskComponent } from './task/update-task/update-task.component';
import { ReadOneTaskComponent } from './task/read-one-task/read-one-task.component';

import {AngularFireModule} from 'angularfire2';
import {AngularFireDatabaseModule} from 'angularfire2/database';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { environment } from '../environments/environment';
import { AuthService } from './shared/auth/auth.service';
import { SignupComponent } from './signup/signup.component';
import { ViewTripDataComponent } from './view-trip-data/view-trip-data.component';
import { EditTripDataComponent } from './edit-trip-data/edit-trip-data.component';

import { HttpClientModule } from '@angular/common/http';
import {CdkTableModule} from '@angular/cdk/table';
import 'hammerjs';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  
} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LandingpageComponent,
    MapComponent,
    AppRiskComponent,
    ReadRisksComponent,
    CreateRiskComponent,
    ReadOneRiskComponent,
    UpdateRiskComponent,
    DeleteRiskComponent,
    AppTripRiskComponent,
    ReadTripRisksComponent,
    CreateTripRiskComponent,
    ReadOneTripRiskComponent,
    UpdateTripRiskComponent,
    DeleteTripRiskComponent,
    TaskCreateComponent,
    ReadTaskComponent,
    AppTaskComponent,
    DeleteTaskComponent,
    UpdateTaskComponent,
    ReadOneTaskComponent,
    SignupComponent,
    ViewTripDataComponent,
    EditTripDataComponent,
    EmergencyContactComponent,
    AddUserComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpModule,
    HttpClientModule,
    FormsModule,
	  ReactiveFormsModule,
    BrowserAnimationsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDXMIcq6eTSTVeuhxApRpzIJb7en6yjP0A'
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MyDatePickerModule,
    NgDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,



    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
 
  ],
  exports: [
  
    CdkTableModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatNativeDateModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
  providers: [AuthService, MapserviceService, AddUserComponent],
  
  bootstrap: [AppComponent]
  
})
export class AppModule { }









