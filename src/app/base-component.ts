import { Component, OnInit, OnDestroy } from '@angular/core';
import { LabelManager } from "./label/label-manager";
import * as myconf from "./global-config";
import { LocalDataSource } from 'ng2-smart-table';
declare var $: any;
declare var bootbox:any;
export class BaseComponent implements OnInit {
    public labelManager = new LabelManager();
    public _GLOBAL = myconf;
    private ng2STDataSource : LocalDataSource;// = new LocalDataSource();
    constructor() {
        
    }
    ngOnInit() {

    }
    public setNg2STDatasource(data: LocalDataSource){
        this.ng2STDataSource = data;
    }
    public getLabel(key: string, lang?: string, defaultValue?: string) {
        ///console.log("label:"+key);
        return this.labelManager.getLabel(key, lang) || defaultValue;
    }
    public getApiUrl(urlAPI: string) {
        return this._GLOBAL.API_SERVER_URL + urlAPI;
    }
    public getHospitalCode() {
        return "04269";
    }
    public getTabelSetting(columns:any){
        var settings: any = {
            mode:'external',
            attr:{
              class: "table table-striped table-bordered"
            },
            actions:{
              add: false,
              edit: false,
              delete: false,
            },
            hideSubHeader: true,
            pager:{
              display: true,
              perPage: 4
            },
            
          };

          settings.columns = {};
          settings.columns.squenceNo = {
            title: 'ลำดับ',
            filter: false,
            sort: false,
            width: '60px',
            type: 'html'
          }
          for(var obj in columns){
            settings.columns[obj] = columns[obj];
          }
          return settings;
    }
    private isRefrestData = false;
    public onRowSelect(event):void{
        console.log('onRowSelect');
        if(this.isRefrestData) {
            this.isRefrestData = false;
            return;
        }
        if(this.ng2STDataSource){
            this.ng2STDataSource.getElements().then( list => { 
                console.log(list);
                let page = this.ng2STDataSource.getPaging();
                let startSeq = page.page>1?((page.perPage*page.page)-page.perPage)+1:1;
                for(let item of list){
                    item.squenceNo = '<div class="text-center">'+(startSeq++)+'</div>';
                }
                this.ng2STDataSource.refresh();
                this.isRefrestData = true;
            });
        }
      }
    /*#Old SEQ
    public sequenceTable(dataSource :LocalDataSource){
        
       dataSource.getElements().then( list => { 
            let page = dataSource.getPaging();
            let startSeq = page.page>1?((page.perPage*page.page)-page.perPage)+1:1;
            for(let item of list){
                item.seq = startSeq++;
            }
            dataSource.refresh();
        });
        
        setTimeout(() => {
            
            let page = dataSource.getPaging();
            let startSeq = page.page>1?((page.perPage*page.page)-page.perPage)+1:1;
            $.each($('.table>tbody>tr'), function(k, v){
                $(this).find('td').first().html(k+startSeq);
            });
        

        }, 200);
        
    }

    public bindSequenceTable(dataSource :LocalDataSource){
        let self = this;
        self.sequenceTable(dataSource);
        $(function(){
            $('body').on('click', '.ng2-smart-sort-link', function(){
                self.sequenceTable(dataSource);
             });
        });
    }
    */
}