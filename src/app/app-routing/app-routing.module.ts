import { MainComponent } from "./../main/main.component";
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GuardService } from "./../service/guard.service";
import { ContentComponent } from "./../content/content.component";
import { NotfoundComponent } from "./../notfound/notfound.component";
import { RegisterComponent } from "./../register/register/register.component";
import { SurveyPregnantListComponent } from "./../surveys/pregnant/survey-pregnant-list/survey-pregnant-list.component";
import { SurverDiedListComponent } from "./../surveys/died/survey-died-list/survey-died-list.component";
import { SurveyPersonalPendingListComponent } from "../surveys/personal/survey-personal-pending-list/survey-personal-pending-list.component";
import { SurveyPersonalHomeListComponent } from "./../surveys/personal/survey-personal-home-list/survey-personal-home-list.component";
import { SurveyPersonalMemberListComponent } from "./../surveys/personal/survey-personal-member-list/survey-personal-member-list.component";
import { SurveyPatientListComponent } from "./../surveys/patient/survey-patient-list/survey-patient-list.component";
import { SurveyMetabolicListComponent } from "./../surveys/metabolic/survey-metabolic-list/survey-metabolic-list.component";
import { SurveyMetabolicPendingListComponent } from "./../surveys/metabolic/survey-metabolic-pending-list/survey-metabolic-pending-list.component";
import { SurveyMosquitoListComponent } from "./../surveys/mosquito/survey-mosquito-list/survey-mosquito-list.component";
import { SurveyMosquitoPendingListComponent } from "../surveys/mosquito/survey-mosquito-pending-list/survey-mosquito-pending-list.component";
import { SurveyCancerListComponent } from "./../surveys/cancer/survey-cancer-list/survey-cancer-list.component";
import { ManagementStaffUserListComponent } from "./../managements/staff/manage-staff-user/list/management-staff-user-list.component";
import { ManagementStaffVillageListComponent } from "./../managements/staff/manage-village/list/management-staff-village-list.component";
import { RegisterActiveComponent } from './../register/register-active/register-active.component';
import { ManagementHomeComponent } from "./../managements/osm/management-home/list/management-home.component";
import { ManagementHomeMemberComponent } from "./../managements/osm/management-home-member/list/management-home-member.component";
import { GuardPermissionService } from '../service/guard.permission.service';
import { SurveyPersonalHistoryComponent } from '../surveys/personal/survey-personal-history/survey-personal-history.component';
import { ChangePasswordComponent } from '../profile/change-password/change-password.component';
import { ProfileManagementComponent } from '../profile/profile-management/profile-management.component';
import { ForgotPasswordComponent } from '../profile/forgot-password/forgot-password.component';
import { SummarytPersonalComponent } from "../summary/summary-personal/summary-personal.component";
import { SummaryDiedComponent } from "../summary/summary-died/summary-died.component";
import { IndexComponent } from "../index/index.component";
import { IndexContentComponent } from "../index/content/content.component";
import { IndexContactusComponent } from "../index/contactus/contactus.component";
import { IndexAboutSystemComponent } from "../index/about-system/about-system.component";
import {SummaryPregnantComponent} from '../summary/summary-pregnant/summary-pregnant.component';
import {SummaryPatientComponent} from '../summary/summary-patient/summary-patient.component';
import {SummaryMetabolicComponent} from '../summary/summary-metabolic/summary-metabolic.component';
import {SummaryMosquitoHICIComponent} from '../summary/summary-mosquito-hici/summary-mosquito-hici.component';
import {SummaryMosquitoComponent} from '../summary/summary-mosquito/summary-mosquito.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'index',
        redirectTo: ''
      },
      {
        path: 'login',
        redirectTo: ''
      },
      {
        path: '',
        component: IndexComponent,
        children: [
          {
            path: '',
            component: IndexContentComponent
          },
          {
            path: 'about-system',
            component: IndexAboutSystemComponent
          },
          {
            path: 'contact-us',
            component: IndexContactusComponent
          },
          {
            path: 'register',
            children: [
              {
                path: '',
                component: RegisterComponent,
              },
              {
                path: 'activate/:tokenId',
                component: RegisterActiveComponent,
              }
            ]
          },
          {
            path: 'forgot-password',
            component: ForgotPasswordComponent
          }
        ]
      },
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
              path: 'staff',
              canActivate: [GuardPermissionService],
              canActivateChild: [GuardPermissionService],
              children: [
                {
                  path: 'village',
                  component: ManagementStaffVillageListComponent
                },
                {
                  path: ':roleName',
                  component: ManagementStaffUserListComponent
                },

              ]
            },
            {
              path: 'osm',
              canActivate: [GuardService],
              canActivateChild: [GuardService],
              children: [{
                path: 'home',
                children: [
                  {
                    path: ':type/:id',
                    component: ManagementHomeComponent
                  },
                  {
                    path: 'member/H/:homeId',
                    component: ManagementHomeMemberComponent
                  }]
              }]
            }
          ]
        },
        {
          path: 'profile',
          canActivate: [GuardService],
          canActivateChild: [GuardService],
          children: [
            {
              path: 'change-password',
              component: ChangePasswordComponent
            },
            {
              path: 'profile-management',
              component: ProfileManagementComponent
            }
          ]
        },
        {
          path: 'surveys',
          canActivate: [GuardService],
          canActivateChild: [GuardService],
          children: [
            {
              path: 'pregnant',
              component: SurveyPregnantListComponent
            }, {
              path: 'died',
              component: SurverDiedListComponent
            }, {
              path: 'personal',
              component: SurveyPersonalHomeListComponent
            }, {
              path: 'pending-personal',
              component: SurveyPersonalPendingListComponent
            }, {
              path: 'personal-detail/:homeId/:roundId/:fromPage',
              component: SurveyPersonalMemberListComponent
            }, {
              path: 'patient',
              component: SurveyPatientListComponent
            }, {
              path: 'metabolic',
              component: SurveyMetabolicListComponent
            }, {
              path: 'pending-metabolic',
              component: SurveyMetabolicPendingListComponent
            }, {
              path: 'mosquito',
              component: SurveyMosquitoListComponent
            }, {
              path: 'pending-mosquito',
              component: SurveyMosquitoPendingListComponent
            }, {
              path: 'cancer',
              component: SurveyCancerListComponent
            }

          ]

        },
        {
          path: 'summary',
          children: [
            {
              path: 'personal',
              component: SummarytPersonalComponent
            },
            {
              path: 'died',
              component: SummaryDiedComponent
            }
            ,
            {
              path: 'pregnant',
              component: SummaryPregnantComponent
            },
            {
              path: 'patient',
              component: SummaryPatientComponent
            },
            {
              path: 'metabolic',
              component: SummaryMetabolicComponent
            },
            {
              path: 'mosquito',
              component: SummaryMosquitoComponent
            },
            {
              path: 'hici',
              component: SummaryMosquitoHICIComponent
            }
          ]
        }

        ]
      }
      ,
      {
        path: 'history/surveys',
        canActivateChild: [GuardService],
        children: [{
          path: 'personal/:homeId/:roundId',
          component: SurveyPersonalHistoryComponent
        }]
      }
      ,
      {
        path: '**',
        redirectTo: ''
      }

    ])
  ],
  declarations: [],
  providers: [GuardService, GuardPermissionService],
  exports: [RouterModule]

})
export class AppRoutingModule { }
