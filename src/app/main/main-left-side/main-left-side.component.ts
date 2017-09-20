import { Component, OnInit,Input } from '@angular/core';

@Component({
  selector: 'app-main-left-side',
  templateUrl: './main-left-side.component.html',
  styleUrls: ['./main-left-side.component.css']
})
export class MainLeftSideComponent implements OnInit {
  @Input() links: Array<any> = [];
  constructor() { }

  ngOnInit() {
  }

}
