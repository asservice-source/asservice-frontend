import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register-active',
  templateUrl: './register-active.component.html',
  styleUrls: ['./register-active.component.css']
})
export class RegisterActiveComponent implements OnInit {

  public tokenId : any;
  constructor(private route: ActivatedRoute) { }


  receiveParameters() {
    this.route.params.subscribe(params => {
      this.tokenId = params['tokenId'];
    });
  }
  
  ngOnInit() {
    this.receiveParameters();
    console.log(this.tokenId);
  }

}
