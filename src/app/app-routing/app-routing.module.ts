import { AdminDashboard2Component } from './../admin/admin-dashboard2/admin-dashboard2.component';
import { AdminDashboard1Component } from './../admin/admin-dashboard1/admin-dashboard1.component';
import { StarterComponent } from './../starter/starter.component';
import { AdminComponent } from './../admin/admin.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ContentComponent } from "./../content/content.component";
import { NotfoundComponent } from "./../notfound/notfound.component";
import { LoginComponent } from "./../login/login.component";
// import {GuardService} from "./../sevice/guard.service";
@NgModule({
  imports: [
    RouterModule.forRoot([
      { 
        path: '', redirectTo: 'starter', pathMatch: 'full' 
    
    
      },
      { 
        path: 'starter', component: StarterComponent ,
        // canActivate:[GuardService],
        children:[{
          path: 'content',
          component: ContentComponent
        },
        {
          path: '**',
          component: NotfoundComponent 
        }
      
      ]
        },{
          path: 'login',
          component: LoginComponent
        }
    ])
  ],
  declarations: [],
  exports: [ RouterModule]
})
export class AppRoutingModule { }
