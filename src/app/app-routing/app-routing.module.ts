import { AdminDashboard2Component } from './../admin/admin-dashboard2/admin-dashboard2.component';
import { AdminDashboard1Component } from './../admin/admin-dashboard1/admin-dashboard1.component';
import { MainComponent } from "./../main/main.component";
import { AdminComponent } from './../admin/admin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GuardService } from "./../sevice/guard.service";
import { ContentComponent } from "./../content/content.component";
import { NotfoundComponent } from "./../notfound/notfound.component";
import { LoginComponent } from "./../login/login.component";
import { RegisterComponent } from "./../register/register.component";
import { SurveyPregnantComponent } from "./../surveys/pregnant/survey-pregnant.component";
import { SurverDiedComponent } from "./../surveys/died/survey-died.component";
import { PersonalComponent } from "./../surveys/personal/personal.component";
import { SurveyPersonalDetailComponent } from "./../surveys/personal/personal-detail/personal-detail.component";
import { PatientComponent } from "./../surveys/patient/patient.component";
import { MetabolicComponent } from "./../surveys/metabolic/metabolic.component";
import { MosquitoComponent } from "./../surveys/mosquito/mosquito.component";
import { CancerComponent } from "./../surveys/cancer/cancer.component";
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
              component: PersonalComponent
            },
            {
              path: 'personal-detail/:hid',
              component: SurveyPersonalDetailComponent
            },
            {
              path: 'patient',
              component: PatientComponent
            }, {
              path: 'metabolic',
              component: MetabolicComponent
            }, {
              path: 'mosquito',
              component: MosquitoComponent
            }
            , {
              path: 'cancer',
              component: CancerComponent
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
