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
import { SurveyPregnantComponent } from "./../surveys/pregnant/survey-pregnant.component";
import { SurverDiedComponent } from "./../surveys/died/survey-died.component";
import { SurveyPersonalComponent } from "./../surveys/personal/survey-personal/survey-personal.component";
import { SurveyPersonalDetailComponent } from "./../surveys/personal/survey-personal-detail/survey-personal-detail.component";
import { SurveyPatientComponent } from "./../surveys/patient/survey-patient.component";
import { SurveyMetabolicComponent } from "./../surveys/metabolic/survey-metabolic.component";
import { SurveyMosquitoComponent } from "./../surveys/mosquito/survey-mosquito.component";
import { SurveyCancerComponent } from "./../surveys/cancer/survey-cancer/survey-cancer.component";
import { SumpregnantComponent } from "./../summary/sumpregnant/sumpregnant.component";
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
          path: 'surveys',
          children: [
            {
              path: 'pregnant',
              component: SurveyPregnantComponent
            },
            {
              path: 'died',
              component: SurverDiedComponent
            },
            {
              path: 'personal',
              component: SurveyPersonalComponent
            },
            {
              path: 'personal-detail/:homeId',
              component: SurveyPersonalDetailComponent
            },
            {
              path: 'patient',
              component: SurveyPatientComponent
            }, {
              path: 'metabolic',
              component: SurveyMetabolicComponent
            }, {
              path: 'mosquito',
              component: SurveyMosquitoComponent
            }
            , {
              path: 'cancer',
              component: SurveyCancerComponent
            }

          ]
        },
        {
          path: 'summary',
          children: [
            {
              path: 'sumpregnant',
              component: SumpregnantComponent
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
