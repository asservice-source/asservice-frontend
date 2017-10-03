import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addpregnant',
  templateUrl: './addpregnant.component.html',
  styleUrls: ['./addpregnant.component.css']
})
export class AddpregnantComponent implements OnInit {
  mStatusNo = 0;
  
   isDisable= false;
   isDisableBirth= true;
   isDisableAbort = true ;
  constructor() { }

  ngOnInit() {
  }
  changStatusNo(){
    if(this.mStatusNo>0){
      if(this.mStatusNo==1){
        this.isDisable = true;
        this.isDisableBirth = false;
        this.isDisableAbort = true ;
      }else{
        this.isDisable = true;
        this.isDisableBirth = true;
        this.isDisableAbort = false ;
      }   
    }else{
      this.isDisableBirth = true;
      this.isDisable = false;
      this.isDisableAbort = true ;
    }
    
  }

}
