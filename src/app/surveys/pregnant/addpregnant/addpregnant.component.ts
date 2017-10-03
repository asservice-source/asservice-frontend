import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-addpregnant',
  templateUrl: './addpregnant.component.html',
  styleUrls: ['./addpregnant.component.css']
})
export class AddpregnantComponent implements OnInit {
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
