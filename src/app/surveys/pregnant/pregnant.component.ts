import { Component, OnInit } from '@angular/core';
declare var $:any
@Component({
  selector: 'app-pregnant',
  templateUrl: './pregnant.component.html',
  styleUrls: ['./pregnant.component.css']
})
export class PregnantComponent implements OnInit {
  mStatusNo = 0;
 
  isDisable= true;

  constructor() { }

  ngOnInit() {
   
     

  }
  changStatusNo(){
    if(this.mStatusNo>0){
      this.isDisable = false;
   
    }else{
      this.isDisable = true;
 
    }
    
  }
}
