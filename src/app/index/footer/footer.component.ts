import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';
declare var $:any;
@Component({
  selector: 'app-index-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class IndexFooterComponent implements OnInit{

  constructor(public user: UserService, private router: Router){
 
  }
  ngOnInit(): void { 


  }
}