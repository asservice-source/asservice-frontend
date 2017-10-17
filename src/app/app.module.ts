import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DataTablesModule } from 'angular-datatables';
import { Ng2CompleterModule } from "ng2-completer";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { HttpModule } from '@angular/http';
import 'rxjs/add/operator/map';

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { MainHeaderComponent } from './main/main-header/main-header.component';
import { MainLeftSideComponent } from './main/main-left-side/main-left-side.component';
import { MainContentComponent } from './main/main-content/main-content.component';
import { MainFooterComponent } from './main/main-footer/main-footer.component';
import { MainControlSidebarComponent } from './main/main-control-sidebar/main-control-sidebar.component';
import { AdminComponent } from './admin/admin.component';
import { AdminHeaderComponent } from './admin/admin-header/admin-header.component';
import { AdminLeftSideComponent } from './admin/admin-left-side/admin-left-side.component';
import { AdminContentComponent } from './admin/admin-content/admin-content.component';
import { AdminFooterComponent } from './admin/admin-footer/admin-footer.component';
import { AdminControlSidebarComponent } from './admin/admin-control-sidebar/admin-control-sidebar.component';
import { AdminDashboard1Component } from './admin/admin-dashboard1/admin-dashboard1.component';
import { ContentComponent } from './content/content.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SurveyPregnantComponent } from './surveys/pregnant/survey-pregnant.component';
import { SurveyPregnantAddComponent } from './surveys/pregnant/pregnant-add/survey-pregnant-add.component';
import { SurveyPregnantDetailComponent } from './surveys/pregnant/pregnant-detail/survey-pregnant-detail.component';
import { SurverDiedComponent } from './surveys/died/survey-died.component';
import { SurveyPatientComponent } from './surveys/patient/survey-patient.component';
import { SurveyMetabolicComponent } from './surveys/metabolic/survey-metabolic.component';
import { SurveyDiedAddComponent } from './surveys/died/died-add/survey-died-add.component';
import { SurveyMetabolicModalComponent } from './surveys/metabolic/Survey-metabolic-modal/survey-metabolic-modal.component';
import { SurveyMosquitoComponent } from './surveys/mosquito/survey-mosquito.component';
import { SurveyPersonalComponent, SurveyPersonalButtonEditComponent } from './surveys/personal/survey-personal/personal.component';
import { SurveyPersonalDetailComponent, SurveyPersonalDetailButtonEditComponent } from './surveys/personal/survey-personal-detail/personal-detail.component';
import { SurveyPersonalDetailModalComponent } from './surveys/personal/survey-personal-detail-modal/survey-personal-detail-modal.component';
import { SurveyCancerComponent, SurveyCancerButtonEditComponent } from './surveys/cancer/survey-cancer/survey-cancer.component';
import { SurveyCancerModalComponent } from './surveys/cancer/survey-cancer-modal/survey-cancer-modal.component';
import { SurveyHeadFilterComponent } from './survey-head-filter/survey-head-filter.component';
import { FilterComponent } from './filter/filter.component';
import { FindPersonComponent } from './find-person/find-person.component';
import { ActionCustomViewComponent } from './action-custom-table/action-custom-view.component'
import { SumpregnantComponent } from './summary/sumpregnant/sumpregnant.component';
import { LoadingComponent } from './loading/loading.component';
import { FilterPersonalComponent } from './filter-personal/filter-personal.component';
import { FiindPersonMemberListComponent } from './find-person/find-person-member-list/member-list.component';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    MainHeaderComponent,
    MainLeftSideComponent,
    MainContentComponent,
    MainFooterComponent,
    MainControlSidebarComponent,
    ContentComponent,
    NotfoundComponent,
    LoginComponent,
    RegisterComponent,
    FindPersonComponent,
    FilterComponent,
    SurveyPregnantComponent,
    SurveyPregnantAddComponent,
    SurveyPregnantDetailComponent,
    SurverDiedComponent,
    SurveyPatientComponent,
    SurveyMetabolicComponent,
    SurveyMetabolicModalComponent,
    SurveyDiedAddComponent,
    SurveyMosquitoComponent,
    SurveyPersonalDetailComponent,
    SurveyCancerComponent,
    SurveyCancerButtonEditComponent,
    SurveyCancerModalComponent,
    SurveyPersonalComponent,
    SurveyPersonalButtonEditComponent,
    SurveyPersonalDetailModalComponent,
    SurveyPersonalDetailButtonEditComponent,
    SurveyHeadFilterComponent,
    SumpregnantComponent,
    LoadingComponent,
    ActionCustomViewComponent,
    FilterPersonalComponent,
    FiindPersonMemberListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AdminModule,
    HttpModule,
    ReactiveFormsModule,
    DataTablesModule,
    Ng2CompleterModule,
    Ng2SmartTableModule
  ],
  entryComponents: [
    ActionCustomViewComponent,
    SurveyPersonalButtonEditComponent,
    SurveyPersonalDetailButtonEditComponent,
    SurveyCancerButtonEditComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
