import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgModule } from '@angular/core';
import { Ng2CompleterModule } from "ng2-completer";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { HttpModule } from '@angular/http';
import { AgmCoreModule } from '@agm/core';
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
import { RegisterComponent } from './register/register/register.component';
import { SurveyPregnantListComponent } from './surveys/pregnant/survey-pregnant-list/survey-pregnant-list.component';
import { SurveyPregnantFormComponent } from './surveys/pregnant/survey-pregnant-form/survey-pregnant-form.component';
import { SurverDiedListComponent } from './surveys/died/survey-died-list/survey-died-list.component';
import { SurveyDiedFormComponent } from './surveys/died/survey-died-form/survey-died-form.component';
import { SurveyPatientListComponent } from './surveys/patient/survey-patient-list/survey-patient-list.component';
import { SurveyPatientFormComponent } from './surveys/patient/survey-patient-form/survey-patient-form.component';
import { SurveyMetabolicListComponent } from './surveys/metabolic/survey-metabolic-list/survey-metabolic-list.component';
import { SurveyMetabolicFormComponent } from './surveys/metabolic/survey-metabolic-form/survey-metabolic-form.component';
import { SurveyMosquitoListComponent } from './surveys/mosquito/survey-mosquito-list/survey-mosquito-list.component';
import { SurveyMosquitoFormComponent } from './surveys/mosquito/survey-mosquito-form/survey-mosquito-form.component';
import { SurveyPersonalHomeListComponent, SurveyPersonalHomeListButtonEditComponent } from './surveys/personal/survey-personal-home-list/survey-personal-home-list.component';
import { SurveyPersonalMemberListComponent, SurveyPersonalMemberListButtonEditComponent } from './surveys/personal/survey-personal-member-list/survey-personal-member-list.component';
import { SurveyPersonalMemberFormComponent } from './surveys/personal/survey-personal-member-form/survey-personal-member-form.component';
import { SurveyCancerListComponent } from './surveys/cancer/survey-cancer-list/survey-cancer-list.component';
import { SurveyCancerFormComponent } from './surveys/cancer/survey-cancer-form/survey-cancer-form.component';
import { FilterHeadMosquitoComponent } from './filter/filter-head-mosquito/filter-head-mosquito.component';
import { FilterFindPersonComponent, FilterFindPersonButtonChooseComponent } from './filter/filter-find-person/filter-find-person.component';
import { FilterHeadSurveyComponent } from './filter/filter-head-survey/filter-head-survey.component';
import { FilterPersonalComponent } from './filter/filter-personal/filter-personal.component';
import { ActionCustomViewComponent, ActionCustomView_2_Component } from './action-custom-table/action-custom-view.component'
import { OnlyNumberDirective } from './directives/onlynumber.directive';
import { AutofocusDirective } from './directives/autofocus.directive';
import { InputValidateDirective } from './directives/inputvalidate.directive';
import { ManagementStaffUserFormComponent } from './managements/staff/manage-staff-user/form/management-staff-user-form.component';
import { ManagementStaffUserListComponent } from './managements/staff/manage-staff-user/list/management-staff-user-list.component';
import { ManagementStaffVillageListComponent } from './managements/staff/manage-village/list/management-staff-village-list.component';
import { ManagementStaffVillageFormComponent } from './managements/staff/manage-village/form/management-staff-village-form.component';
// import { MyDatePickerModule } from 'mydatepicker';
import { MyDatePickerModule } from 'mydatepicker-thai';
import { RegisterActiveComponent } from './register/register-active/register-active.component';
import { ManagementHomeComponent, ViewChildTableHomeManagement } from './managements/osm/management-home/list/management-home.component';
import { ManagementHomeFormComponent } from './managements/osm/management-home/form/management-home-form.component';
import { LoadingComponent} from './ng2-loading/ass-loading.component'
import { LoadingConfigService } from './ng2-loading/ass-loading.service';
import { FilterFindMosquitoComponent , SelectHomeListButton} from './filter/filter-find-mosquito/filter-find-mosquito.component';
import { ManagementHomeMemberComponent } from "./managements/osm/management-home-member/list/management-home-member.component";
import { ManagementHomeMemberFormComponent } from './managements/osm/management-home-member/form/management-home-member-form.component';
import { TestService } from './service/test.service';
import { UserService } from './service/user.service';

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
    FilterHeadMosquitoComponent,
    FilterFindPersonComponent,
    FilterFindPersonButtonChooseComponent,
    FilterHeadSurveyComponent,
    FilterPersonalComponent,
    SurveyPregnantListComponent,
    SurveyPregnantFormComponent,
    SurverDiedListComponent,
    SurveyPatientListComponent,
    SurveyMetabolicListComponent,
    SurveyMetabolicFormComponent,
    SurveyDiedFormComponent,
    SurveyMosquitoListComponent,
    SurveyCancerListComponent,
    SurveyCancerFormComponent,
    SurveyPersonalHomeListComponent,
    SurveyPersonalHomeListButtonEditComponent,
    SurveyPersonalMemberListComponent,
    SurveyPersonalMemberListButtonEditComponent,
    SurveyPersonalMemberFormComponent,
    SurveyMosquitoFormComponent,
    SurveyPatientFormComponent,
    ActionCustomViewComponent,
    ActionCustomView_2_Component,
    OnlyNumberDirective,
    AutofocusDirective,
    InputValidateDirective,
    ManagementStaffUserFormComponent,
    ManagementStaffUserListComponent,
    ManagementStaffVillageListComponent,
    ManagementStaffVillageFormComponent,
    RegisterActiveComponent,
    ManagementHomeComponent,
    ManagementHomeFormComponent,
    LoadingComponent,
    FilterFindMosquitoComponent,
    SelectHomeListButton,
    ViewChildTableHomeManagement,
    ManagementHomeMemberComponent,
    ManagementHomeMemberFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AdminModule,
    HttpModule,
    ReactiveFormsModule,
    Ng2CompleterModule,
    Ng2SmartTableModule,
    MyDatePickerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAOwQqNjFQlk-Fi8wkwUnIQYafBVLfyobY'
    })
  ],
  entryComponents: [
    ActionCustomViewComponent,
    ActionCustomView_2_Component,
    SurveyPersonalHomeListButtonEditComponent,
    SurveyPersonalMemberListButtonEditComponent,
    SelectHomeListButton,
    ViewChildTableHomeManagement,
    FilterFindPersonButtonChooseComponent
  ],
  providers: [LoadingConfigService, UserService, TestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
