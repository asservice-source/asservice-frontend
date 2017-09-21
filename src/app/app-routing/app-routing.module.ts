import { AdminDashboard2Component } from './../admin/admin-dashboard2/admin-dashboard2.component';
import { AdminDashboard1Component } from './../admin/admin-dashboard1/admin-dashboard1.component';
import { MainComponent } from "./../main/main.component";
import { AdminComponent } from './../admin/admin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContentComponent } from "./../content/content.component";
import { NotfoundComponent } from "./../notfound/notfound.component";
import { LoginComponent } from "./../login/login.component";
import { PregnantComponent } from "./../surveys/pregnant/pregnant.component"; 
import {GuardService} from "./../sevice/guard.service";
@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: 'login',
        component: LoginComponent
      },
      { 
          path: ''
        , redirectTo: 'main'
        , pathMatch: 'full' 
      }
      ,
      {
        path: 'main'
        , component: MainComponent 
        , canActivate:[GuardService]
        ,
        children:[{
            path: '',
            component: ContentComponent
          }
          ,{
            path: 'content',
            component: ContentComponent
          },
          {
            path: 'surveys',
            children: [
              {
                path: 'pregnant',
                component: PregnantComponent
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
  exports: [ RouterModule]

})
export class AppRoutingModule { }
