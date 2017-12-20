export class Utils {
    
}
export class Action {
    public  static ADD: string = 'ADD';
    public static EDIT: string = 'EDIT';
    public static DELETE: string = 'DELETE';
    public static CANCEL: string = 'CANCEL';
    public static RETREIVE: string = 'RETRIEVE';
}
export class SurveyHeaderTypeCode{
    public  static CANCER: string = 'CANCER';
    public  static METABOLIC: string = 'METABOLIC';
    public  static MONITORHICI: string = 'MONITORHICI';
    public  static DEATH: string = 'DEATH';
    public  static PATIENT: string = 'PATIENT';
    public  static POPULATION: string = 'POPULATION';
    public  static PREGNANT: string = 'PREGNANT';
}

export class MessageType{
    public static ALERT = 'ALERT';
    public static SUCCESS = 'SUCCESS';
    public static ERROR = 'ERROR';
    public static WARNING = 'WARNING';
    public static CONFIRM = 'CONFIRM';
}

export class SimpleValidateForm{
    
    getObjectEmpty(obj: any, ignores?: Array<any>):any{
        let objs = [];
        for(let key in obj){
            console.log('getObjectEmpty');
            if(this.isHash(key, ignores)){
                console.log('continue >> ' + key);
                continue;
            }
            let value = obj[key];
            if(value==null || value==undefined || value.toString().trim().length<1){
                objs.push(key);
            }
        }
        return objs;
    }
    getObjectEmpty_byFilds(obj: any, filds?: Array<any>):any{
        if(!filds){
            return [];
        }
        let objs = [];
        for(let item of filds){
            let value = obj[item];
            if(value==null || value==undefined || value.toString().trim().length<1){
                objs.push(item);
            }
        }
        return objs;
    }

    isHash(key: any, ignores: Array<any>): boolean{
        if(ignores){
            for(let item of ignores){
                if(key==item){
                    return true;
                }
            }
        }
       
        return false;
    }
}

export class RefreshChange{
    public refresh: any;
    constructor(){
    
    }
}
