import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
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
import { SurveyPregnantListComponent } from './surveys/pregnant/survey-pregnant-list/survey-pregnant-list.component';
import { SurveyPregnantFormComponent } from './surveys/pregnant/survey-pregnant-form/survey-pregnant-form.component';
import { SurverDiedComponent } from './surveys/died/survey-died.component';
import { SurveyPatientListComponent } from './surveys/patient/survey-patient-list/survey-patient-list.component';
import { SurveyPatientFormComponent } from './surveys/patient/survey-patient-form/survey-patient-form.component';
import { SurveyMetabolicListComponent } from './surveys/metabolic/survey-metabolic-list/survey-metabolic-list.component';
import { SurveyMetabolicFormComponent } from './surveys/metabolic/survey-metabolic-form/survey-metabolic-form.component';
import { SurveyDiedAddComponent } from './surveys/died/died-add/survey-died-add.component';
import { SurveyMosquitoListComponent } from './surveys/mosquito/survey-mosquito-list/survey-mosquito-list.component';
import { SurveyMosquitoFormComponent } from './surveys/mosquito/survey-mosquito-form/survey-mosquito-form.component';
import { SurveyPersonalHomeListComponent, SurveyPersonalHomeListButtonEditComponent } from './surveys/personal/survey-personal-home-list/survey-personal-home-list.component';
import { SurveyPersonalMemberListComponent, SurveyPersonalMemberListButtonEditComponent } from './surveys/personal/survey-personal-member-list/survey-personal-member-list.component';
import { SurveyPersonalMemberFormComponent } from './surveys/personal/survey-personal-member-form/survey-personal-member-form.component';
import { SurveyCancerListComponent, SurveyCancerListButtonEditComponent } from './surveys/cancer/survey-cancer-list/survey-cancer-list.component';
import { SurveyCancerFormComponent } from './surveys/cancer/survey-cancer-form/survey-cancer-form.component';
import { SurveyHeadFilterComponent } from './survey-head-filter/survey-head-filter.component';
import { FilterComponent } from './filter/filter.component';
import { FindPersonComponent } from './find-person/find-person.component';
import { ActionCustomViewComponent } from './action-custom-table/action-custom-view.component'
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
    SurveyPregnantListComponent,
    SurveyPregnantFormComponent,
    SurverDiedComponent,
    SurveyPatientListComponent,
    SurveyMetabolicListComponent,
    SurveyMetabolicFormComponent,
    SurveyDiedAddComponent,
    SurveyMosquitoListComponent,
    SurveyCancerListComponent,
    SurveyCancerListButtonEditComponent,
    SurveyCancerFormComponent,
    SurveyPersonalHomeListComponent,
    SurveyPersonalHomeListButtonEditComponent,
    SurveyPersonalMemberListComponent,
    SurveyPersonalMemberListButtonEditComponent,
    SurveyPersonalMemberFormComponent,
    SurveyHeadFilterComponent,
    LoadingComponent,
    ActionCustomViewComponent,
    FilterPersonalComponent,
    FiindPersonMemberListComponent,
    SurveyMosquitoFormComponent,
    SurveyPatientFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AdminModule,
    HttpModule,
    ReactiveFormsModule,
    Ng2CompleterModule,
    Ng2SmartTableModule
  ],
  entryComponents: [
    ActionCustomViewComponent,
    SurveyPersonalHomeListButtonEditComponent,
    SurveyPersonalMemberListButtonEditComponent,
    SurveyCancerListButtonEditComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
