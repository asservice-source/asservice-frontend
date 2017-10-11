import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
@Component({
    selector: 'button-view',
    templateUrl: './action-custom-view.component.html',
    styleUrls: ['./action-custom-view.component.css']
  })
  export class ActionCustomViewComponent implements ViewCell, OnInit {
    renderValue: string;
  
    @Input() value: string | number;
    @Input() rowData: any;
    @Output() view: EventEmitter<any> = new EventEmitter();
    @Output() edit: EventEmitter<any> = new EventEmitter();
    @Output() delete: EventEmitter<any> = new EventEmitter();
    @Output() action: EventEmitter<any> = new EventEmitter();

    ngOnInit() {
      this.renderValue = this.value.toString();
    }
  
    onView(){
      this.view.emit(this.rowData);
      this.doEmit('view');
    }

    onEdit(){
      this.edit.emit(this.rowData);
      this.doEmit('edit');
    }

    onDelete(){
      this.delete.emit(this.rowData);
      this.doEmit('delete');
    }

    doEmit(atrAction) {
      this.rowData.action = atrAction;
      this.action.emit(this.rowData);
    }

  }