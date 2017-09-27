import { Component, OnInit } from '@angular/core';
declare var $:any;
@Component({
  selector: 'app-find-person',
  templateUrl: './find-person.component.html',
  styleUrls: ['./find-person.component.css']
})
export class FindPersonComponent implements OnInit {

  mVillageNo = 0;
  mOSM = 0;
  mHomeNo = 0;
  mPerson = 0;

  isDisabledOSM = true;
  isDisabledHomeNo = true;
  isDisabledPerson = true;
  isDisableBtnSearch = true;
  constructor() { }

  ngOnInit() {
    
  }

  changVillageNo(){
    if(this.mVillageNo>0){
      this.isDisabledOSM = false;
      this.isDisabledHomeNo = false;
    }else{
      this.isDisabledHomeNo = true;
      this.isDisabledOSM = true;
    }
    
  }
  changHomeNo(){
    if(this.mHomeNo != 0){
      this.isDisableBtnSearch = false;
    }else{
      this.isDisableBtnSearch = true;
    }
    
  }
  doSearchPerson(){
    this.isDisabledPerson = false;
  }
}
