import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiHTTPService } from '../../service/api-http.service';
declare var bootbox: any;

@Component({
  selector: 'app-register-active',
  templateUrl: './register-active.component.html',
  styleUrls: ['./register-active.component.css']
})
export class RegisterActiveComponent implements OnInit {

  public tokenId : string;
  private api: ApiHTTPService;
  public text : string;

  constructor(private route: ActivatedRoute) {
    this.api = new ApiHTTPService();
   }


  receiveParameters() {
    this.route.params.subscribe(params => {
      this.tokenId = params['tokenId'];
    });
  }
  
  ngOnInit() {
    this.receiveParameters();
    this.passToken();
  }

  passToken() {
    let self = this;
    let params = {
      "tokenId" : this.tokenId
     }
    this.api.post('hospital/activate_hospital', params, function (resp) {
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        // self.provinceList = resp.response;
        //bootbox.alert("token ="+this.tokenId);
        self.text = "ผ่าน";
      }else{
        self.text = "ไม่ผ่าน";
      }

    })
  }

}
