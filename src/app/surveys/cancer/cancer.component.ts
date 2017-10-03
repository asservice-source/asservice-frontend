import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cancer',
  templateUrl: './cancer.component.html',
  styleUrls: ['./cancer.component.css']
})
export class CancerComponent implements OnInit {

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
