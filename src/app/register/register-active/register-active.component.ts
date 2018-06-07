import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiHTTPService } from '../../api-managements/api-http.service';
import { BaseComponent } from '../../base-component';
declare var bootbox: any;

@Component({
  selector: 'app-register-active',
  templateUrl: './register-active.component.html',
  styleUrls: ['./register-active.component.css']
})
export class RegisterActiveComponent extends BaseComponent implements OnInit {

  public tokenId : string;
  private api: ApiHTTPService;
  public text : string;

  constructor(private route: ActivatedRoute) {
    super();
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
      console.log(resp);
      if (resp != null && resp.status.toUpperCase() == "SUCCESS") {
        self.message_success("","<b>"+resp.response.hospitalName+"</b>"+" ลงทะเบียนเรียบร้อยแล้ว",function (){
          location.href = "/login";
        });
      }else{
        self.message_error("","ข้อมูลไม่ถูกต้อง",function(){
          location.href = "/register";
        })
      }

    })
  }

}
