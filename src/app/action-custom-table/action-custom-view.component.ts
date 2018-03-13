import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
@Component({
  selector: 'action-custom-table-view',
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

  onView() {
    this.view.emit(this.rowData);
    this.doEmit('view');
  }

  onEdit() {
    this.edit.emit(this.rowData);
    this.doEmit('edit');
  }

  onDelete() {
    this.delete.emit(this.rowData);
    this.doEmit('delete');
  }

  doEmit(atrAction) {
    this.rowData.action = atrAction;
    this.action.emit(this.rowData);
  }
}

@Component({
  selector: 'action-custom-table-view-2',
  template: '<div style="width:100%; text-align: center;" ><a (click)="onEdit()" class="cell-action glyphicon glyphicon-edit"></a><a (click)="onDelete()" class="cell-action glyphicon glyphicon-trash"></a></div>',
  styleUrls: ['./action-custom-view.component.css']
})
export class ActionCustomView_2_Component implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Output() action: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.renderValue = this.value.toString();
  }

  onEdit() {
    this.edit.emit(this.rowData);
    this.doEmit('edit');
  }

  onDelete() {
    this.delete.emit(this.rowData);
    this.doEmit('delete');
  }

  doEmit(atrAction) {
    this.rowData.action = atrAction;
    this.action.emit(this.rowData);
  }
}

@Component({
  selector: 'action-custom-table-maps',
  template: '<div style="width:100%; text-align: center;" >'
    + '<a (click)="onMaps()" title="แผนที่"  class="cell-action">'
    + '<img src="../../../assets/img/ic_map.png" width="15" style="margin-top: -7px;" />'
    + '</a>'
    + '<a (click)="onEdit()" title="แก้ไข" class="cell-action glyphicon glyphicon-edit"></a>'
    + '<a (click)="onDelete()" title="ลบ" class="cell-action glyphicon glyphicon-trash"></a>'
    + '</div>',
  styleUrls: ['./action-custom-view.component.css']
})
export class ActionCustomViewMapsComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;
  @Output() maps: EventEmitter<any> = new EventEmitter();
  @Output() edit: EventEmitter<any> = new EventEmitter();
  @Output() delete: EventEmitter<any> = new EventEmitter();
  @Output() action: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.renderValue = this.value.toString();
  }

  onMaps() {
    this.maps.emit(this.rowData);
    this.doEmit('maps');
  }

  onEdit() {
    this.edit.emit(this.rowData);
    this.doEmit('edit');
  }

  onDelete() {
    this.delete.emit(this.rowData);
    this.doEmit('delete');
  }

  doEmit(atrAction) {
    this.rowData.action = atrAction;
    this.action.emit(this.rowData);
  }
}


// view history
@Component({
  selector: 'action-custom-table-maps',
  template: '<div style="width:100%; text-align: center;" >'
    + '<a (click)="onMaps()" title="แผนที่"  class="cell-action">'
    + '<img src="../../../assets/img/ic_map.png" width="15" style="margin-top: -7px;" />'
    + '</a>'
    + '<a (click)="onView()" title="ดูประวัติ" class="cell-action glyphicon glyphicon-list-alt"></a>'
    + '</div>',
  styleUrls: ['./action-custom-view.component.css']
})
export class ActionCustomViewHistoryComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;
  @Output() maps: EventEmitter<any> = new EventEmitter();
  @Output() view: EventEmitter<any> = new EventEmitter();
  @Output() action: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.renderValue = this.value.toString();
  }

  onMaps() {
    this.maps.emit(this.rowData);
    this.doEmit('maps');
  }

  onView() {
    this.view.emit(this.rowData);
    this.doEmit('view');
  }

  doEmit(atrAction) {
    this.rowData.action = atrAction;
    this.action.emit(this.rowData);
  }
}

// view history
@Component({
  selector: 'action-custom-table-maps',
  template: '<div style="width:100%; text-align: center;" >'
    + '<a (click)="onView()" title="ข้อมูลการสำรวจ" class="cell-action glyphicon glyphicon-list-alt"></a>'
    + '</div>',
  styleUrls: ['./action-custom-view.component.css']
})
export class ActionCustomSurveyHistoryComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;
  @Output() view: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.renderValue = this.value.toString();
  }

  onView() {
    this.view.emit(this.rowData);
  }
}

// edit only
@Component({
  selector: 'action-custom-table-maps',
  template: '<div style="width:100%; text-align: center;">'
    + '<a (click)="onEdit()" title="แก้ไข" class="cell-action glyphicon glyphicon-edit"></a>'
    + '</div>',
  styleUrls: ['./action-custom-view.component.css']
})
export class ActionCustomSurveyEditComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;
  @Output() edit: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.renderValue = this.value.toString();
  }

  onEdit() {
    this.edit.emit(this.rowData);
  }
}

// survey only
@Component({
  selector: 'action-custom-table-maps',
  template: '<div style="width:100%; text-align: center;">'
    + '<button type="button" (click)="onSurvey()" class="btn btn-sm btn-primary">ทำแบบสำรวจ</button>'
    + '</div>',
  styleUrls: ['./action-custom-view.component.css']
})
export class ActionCustomSurveyComponent implements ViewCell, OnInit {
  renderValue: string;

  @Input() value: string | number;
  @Input() rowData: any;
  @Output() survey: EventEmitter<any> = new EventEmitter();

  ngOnInit() {
    this.renderValue = this.value.toString();
  }

  onSurvey() {
    this.survey.emit(this.rowData);
  }
}
