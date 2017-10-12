import { Component, OnInit, Injectable } from '@angular/core';
import { RequestOptions, Headers, RequestMethod, Http } from '@angular/http';
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
  constructor(private http: Http) { }

  ngOnInit() {
    var obj = { username: "anamai01", password: "an123401", grant_type: 'password' };
    
        let headers = new Headers();
        headers.append("Authorization", "Basic YXNzZXJ2aWNlLXRydXN0ZWQtY2xpZW50OnNlY3JldA==");
        headers.append("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
        let options = new RequestOptions({ method: RequestMethod.Post,  headers: headers });
        let body = this.serializeObj(obj);
        this.http.post('http://192.168.1.203:8080/api-asservice/oauth/token', body, options)
        .map(res => res.json())
        .subscribe(
        data => console.log(data),
        err => err,
        () => console.log('Fetching url  complete for Server Api.')
        )
  }
  
  private serializeObj(obj) {
    var result = [];
    for (var property in obj)
        result.push(encodeURIComponent(property) + "=" + encodeURIComponent(obj[property]));

    return result.join("&");
}

}

