import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
@Component({
    selector: 'app-view-child-button',
    templateUrl: './view-child-button.component.html',
    styleUrls: ['./view-child-button.component.css']
  })
  export class ViewChildButtonComponent implements OnInit ,ViewCell{
    renderValue: string;
    @Input() value: string | number;
    @Input() rowData: any;
    @Output() click: EventEmitter<any> = new EventEmitter();

    ngOnInit() {
        this.renderValue = this.value.toString();
    }
    onClick() {
     this.click.emit(this.rowData);
    }
  }