import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-find-person',
  templateUrl: './find-person.component.html',
  styleUrls: ['./find-person.component.css']
})
export class FindPersonComponent implements OnInit {

  mVillageNo = 0;
  mHomeNo;
  mPerson = 0;

  isDisabledHomeNo = true;
  isDisabledPerson = true;
  
  constructor() { }

  ngOnInit() {
    
  }

  changVillageNo = function(){
    if(this.mVillageNo>0){
      this.isDisabledHomeNo = false;
    }else{
      this.isDisabledHomeNo = true;
    }
    
  }
  doSearchPerson = function(){
    if(this.mHomeNo==30){
      this.isDisabledPerson = false;
    }else{
      this.isDisabledPerson = true;
    }
  }
}
