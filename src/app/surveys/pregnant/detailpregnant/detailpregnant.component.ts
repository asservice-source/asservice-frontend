import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-detailpregnant',
  templateUrl: './detailpregnant.component.html',
  styleUrls: ['./detailpregnant.component.css']
})
export class DetailpregnantComponent implements OnInit {
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
