import { MainComponent } from "./../main/main.component";
import { AdminComponent } from './../admin/admin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GuardService } from "./../service/guard.service";
import { ContentComponent } from "./../content/content.component";
import { NotfoundComponent } from "./../notfound/notfound.component";
import { LoginComponent } from "./../login/login.component";
import { RegisterComponent } from "./../register/register/register.component";
import { SurveyPregnantListComponent } from "./../surveys/pregnant/survey-pregnant-list/survey-pregnant-list.component";
import { SurverDiedListComponent } from "./../surveys/died/survey-died-list/survey-died-list.component";
import { SurveyPersonalHomeListComponent } from "./../surveys/personal/survey-personal-home-list/survey-personal-home-list.component";
import { SurveyPersonalMemberListComponent } from "./../surveys/personal/survey-personal-member-list/survey-personal-member-list.component";
import { SurveyPatientListComponent } from "./../surveys/patient/survey-patient-list/survey-patient-list.component";
import { SurveyMetabolicListComponent } from "./../surveys/metabolic/survey-metabolic-list/survey-metabolic-list.component";
import { SurveyMosquitoListComponent } from "./../surveys/mosquito/survey-mosquito-list/survey-mosquito-list.component";
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

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'login',
        component: LoginComponent
      },
      {
        path: 'register',
        children:[
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
              path: 'staff',
              canActivate: [GuardPermissionService],
              canActivateChild: [GuardPermissionService],
              children:[
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
              children:[{
                path: 'home',
                children:[
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
            },
            {
              path: 'reset-password',
              component: ForgotPasswordComponent
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
              path: 'personal-detail/:homeId/:roundId',
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
        
        },
        {
          path: 'summary',
          children: [
            {
              path: 'personal',
              component: SummarytPersonalComponent
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
        component: NotfoundComponent
      }

    ])
  ],
  declarations: [],
  providers: [GuardService, GuardPermissionService],
  exports: [RouterModule]

})
export class AppRoutingModule { }
