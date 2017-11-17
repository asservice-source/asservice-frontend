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
  headers: any;
  constructor(private http: Http) { }

  ngOnInit() {
  }

}

