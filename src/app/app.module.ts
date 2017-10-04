import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
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
import { PersonalComponent } from './surveys/personal/personal.component';
import { PatientComponent } from './surveys/patient/patient.component';
import { MetabolicComponent } from './surveys/metabolic/metabolic.component';
import { FilterComponent } from './filter/filter.component';
import { SurveyDiedAddComponent } from './surveys/died/died-add/survey-died-add.component';
import { FindPersonComponent } from './find-person/find-person.component';
import { MosquitoComponent } from './surveys/mosquito/mosquito.component';
import { SurveyPersonalDetailComponent } from './surveys/personal/personal-detail/personal-detail.component';
import { CancerComponent } from './surveys/cancer/cancer.component';
import { SurveyMetabolicComponent } from './surveys/metabolic/Survey-metabolic-modal/Survey-metabolic-modal.component';
import 'rxjs/add/operator/map';
import { HttpModule } from '@angular/http';
import { SumpregnantComponent } from './summary/sumpregnant/sumpregnant.component';
import { DataTablesModule } from 'angular-datatables';
import { SurveyPersonalDetailModalComponent } from './surveys/personal/personal-detail/survey-personal-detail-modal/survey-personal-detail-modal.component';


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
    SurveyPregnantComponent,
    SurveyPregnantAddComponent,
    SurveyPregnantDetailComponent,
    SurverDiedComponent,
    PersonalComponent,
    PatientComponent,
    MetabolicComponent,
    FilterComponent,
    SurveyDiedAddComponent,
    FindPersonComponent,
    MosquitoComponent,
    SurveyPersonalDetailComponent,
    CancerComponent,
    SurveyMetabolicComponent,
    SumpregnantComponent,
    SurveyPersonalDetailModalComponent
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AdminModule,
    HttpModule,
    DataTablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
