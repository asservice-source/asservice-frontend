import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cancer',
  templateUrl: './survey-cancer.component.html',
  styleUrls: ['./survey-cancer.component.css']
})
export class SurveyCancerComponent implements OnInit {

  mStatusNo = 0;
  
  isDisable= true;
  constructor() { }

  ngOnInit() {
  }
  changStatusNo(){
    if(this.mStatusNo==21){
      this.isDisable = false ;
    
    }else{
      this.isDisable = true ;
    }
  }

}
