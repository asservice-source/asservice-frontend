import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-survey-mosquito',
  templateUrl: './survey-mosquito.component.html',
  styleUrls: ['./survey-mosquito.component.css']
})
export class SurveyMosquitoComponent implements OnInit {
  mLocationNo = 0;
  
   isDisable= true;
  constructor() { }

  ngOnInit() {
  }
  changLocationNo(){
    if(this.mLocationNo==1){
      this.isDisable = false;
   
    }else{
      this.isDisable = true;
 
    }
    
  }
}
