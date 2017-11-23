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
                console.log('push');
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