import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mosquito',
  templateUrl: './mosquito.component.html',
  styleUrls: ['./mosquito.component.css']
})
export class MosquitoComponent implements OnInit {
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
