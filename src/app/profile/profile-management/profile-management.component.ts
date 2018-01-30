import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../../base-component';
import { Router } from '@angular/router';
import { InputValidateInfo } from '../../directives/inputvalidate.directive';
import { Service_Profile } from '../../api-managements/service-profile';

@Component({
  selector: 'app-profile-management',
  templateUrl: './profile-management.component.html',
  styleUrls: ['./profile-management.component.css']
})

export class ChangePasswordComponent extends BaseComponent implements OnInit {
    
}