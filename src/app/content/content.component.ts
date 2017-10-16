import { Component, OnInit, Injectable } from '@angular/core';
import { RequestOptions, Headers, RequestMethod, Http ,Response} from '@angular/http';
declare var $: any
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
@Injectable()
export class ContentComponent implements OnInit {
  [x: string]: any;

  cmd = 'hide';
  headers: any;
  constructor(private http: Http) { }

  ngOnInit() {
    /*
        let user = 'asservice-trusted-client';
        let pass = 'secret';
        // let headers = new Headers();
        // headers.append("Authorization", "Basic YXNzZXJ2aWNlLXRydXN0ZWQtY2xpZW50OnNlY3JldA==");
        // headers.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        this.headers = new Headers();
        this.headers.append('Authorization', 'basic ' + btoa('asservice-trusted-client:secret'));
        this.headers.append("Access-Control-Allow-Credentials", "true");
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');

        let options = new RequestOptions({ method: RequestMethod.Post,  headers: this.headers });
        let obj = { username: "anamai01", password: "an123401", grant_type: 'password' };
        let body = this.serializeObj(obj);
        // this.http.post('http://192.168.1.203:8080/api-asservice/oauth/token?grant_type=password&username=anamai01&password=an123401',body, options)
        // .map(res => res.json())
        // .subscribe(
        // data => console.log(data),
        // err => err,
        // () => console.log('Fetching url  complete for Server Api.')
        // )
        this.http.post('http://192.168.1.203:8080/api-asservice/oauth/token?grant_type=password&username=anamai01&password=an123401', JSON.stringify({ username: user, password: pass }), options)
        .map((response: Response) => {

          console.log(response.json());

          localStorage.setItem('json', response.json());
        }).subscribe();
        */
        //this.onTestApi();
  }

  onTestApi(){
    
    let username: string = 'asservice-trusted-client';
    let password: string = 'secret';
    let param = new URLSearchParams()
    param.append('grant_type', 'password')
    param.append('username', 'anamai01');
    param.append('password', 'an123401');
    let headers = new Headers({
     'Content-Type': 'application/x-www-form-urlencoded',
     "Authorization": "Basic " +btoa(username + ":" + password)
    });
    let options = new RequestOptions({ headers: headers });
    this.http.post("http://192.168.1.203:8080/api-asservice/oauth/token", param, options)
     .map(res => res.json())
     .subscribe(data => console.log(this.access_token = data.access_token),
     err => console.log(err),
     () => console.log('Fetching complete for Server Metrics'));

  }
  
  private serializeObj(obj) {
    var result = [];
    for (var property in obj)
        result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
}

}

