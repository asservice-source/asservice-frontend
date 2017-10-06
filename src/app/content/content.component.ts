import { Component, OnInit } from '@angular/core';
declare var $:any
@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {
  cmd = 'hide';
  constructor() { }

  ngOnInit() {
    
  }
  
}

