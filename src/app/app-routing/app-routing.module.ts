import { AdminDashboard2Component } from './../admin/admin-dashboard2/admin-dashboard2.component';
import { AdminDashboard1Component } from './../admin/admin-dashboard1/admin-dashboard1.component';
import { MainComponent } from "./../main/main.component";
import { AdminComponent } from './../admin/admin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GuardService } from "./../service/guard.service";
import { ContentComponent } from "./../content/content.component";
import { NotfoundComponent } from "./../notfound/notfound.component";
import { LoginComponent } from "./../login/login.component";
import { RegisterComponent } from "./../register/register.component";
import { SurveyPregnantListComponent } from "./../surveys/pregnant/survey-pregnant-list/survey-pregnant-list.component";
import { SurverDiedListComponent } from "./../surveys/died/survey-died-list/survey-died-list.component";
import { SurveyPersonalHomeListComponent } from "./../surveys/personal/survey-personal-home-list/survey-personal-home-list.component";
import { SurveyPersonalMemberListComponent } from "./../surveys/personal/survey-personal-member-list/survey-personal-member-list.component";
import { SurveyPatientListComponent } from "./../surveys/patient/survey-patient-list/survey-patient-list.component";
import { SurveyMetabolicListComponent } from "./../surveys/metabolic/survey-metabolic-list/survey-metabolic-list.component";
import { SurveyMosquitoListComponent } from "./../surveys/mosquito/survey-mosquito-list/survey-mosquito-list.component";
import { SurveyCancerListComponent } from "./../surveys/cancer/survey-cancer-list/survey-cancer-list.component";
import { ManagementStaffStaffListComponent } from "./../managements/staff/manage-staff/list/management-staff-staff-list.component";
import { ManagementStaffOsmListComponent } from "./../managements/staff/manage-osm/list/management-staff-osm-list.component";
import { ManagementStaffVillageListComponent } from "./../managements/staff/manage-village/list/management-staff-village-list.component";

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        component: RegisterComponent
      },
      {
        path: '',
        redirectTo: 'main',
        pathMatch: 'full'
      }
      ,
      {
        path: 'main',
        component: MainComponent,
        canActivate: [GuardService],
        children: [{
          path: '',
          component: ContentComponent
        }
          , {
          path: 'content',
          component: ContentComponent
        },
        {
          path: 'managements',
          children: [
            {
              path: 'staff/staff',
              component: ManagementStaffStaffListComponent
            },
            {
              path: 'staff/osm',
              component: ManagementStaffOsmListComponent
            },
            {
              path: 'staff/village',
              component: ManagementStaffVillageListComponent
            },
          ]
        },
        {
          path: 'surveys',
          children: [
            {
              path: 'pregnant',
              component: SurveyPregnantListComponent
            },
            {
              path: 'died',
              component: SurverDiedListComponent
            },
            {
              path: 'personal',
              component: SurveyPersonalHomeListComponent
            },
            {
              path: 'personal-detail/:homeId',
              component: SurveyPersonalMemberListComponent
            },
            {
              path: 'patient',
              component: SurveyPatientListComponent
            }, {
              path: 'metabolic',
              component: SurveyMetabolicListComponent
            }, {
              path: 'mosquito',
              component: SurveyMosquitoListComponent
            }
            , {
              path: 'cancer',
              component: SurveyCancerListComponent
            }

          ]
        }
        ]
      }
      ,
      {
        path: '**',
        component: NotfoundComponent
      }

    ])
  ],
  declarations: [],
  providers: [GuardService],
  exports: [RouterModule]

})
export class AppRoutingModule { }
