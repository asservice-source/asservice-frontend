export class MetabolicBean{
    public citizenId: string = "";
    public firstName: string = "";
    public lastName: string = "";
    public fullName: string = "";
    public nickName: string = "";
    public genderCode: string = "";
    public genderName: string = "";
    public prefixCode: string = "";
    public prefixName: string = "";
    public raceCode: string = "";
    public raceName: string = "";
    public nationalityCode: string = "";
    public nationalityName: string = "";
    public religionCode: string = "";
    public religionName: string = "";
    public bloodTypeId: string = "";
    public bloodTypeName: string = "";
    public rHGroupId: string = "";
    public rHGroupName: string = "";
    public birthDate: any;
    public educationCode: string = "";
    public educationName: string = "";
    public educationDescription: string = "";
    public occupationCode: string = "";
    public occupationName: string = "";
    public dischargeId: string = "";
    public familyStatus: string = "";
    public age: number;
    public address : string;
    public action: string;
    public osmId;
    public homeId;
  
    public isHeredityMetabolic: boolean = false;
    public isWaistlineOver: boolean = false;
    public isBPOver: boolean = false;
    public isFBS: boolean = false;
    public isCholesterol: boolean = false;
    public isNewborn4kg: boolean = false;
    public isHeredityHypertension: boolean = false;
    public rowGUID : string;
    public personId : string;
  
    public smokingStatusId : string ;
    public drinkingStatusId : string;
    public drugHistory_Smoke: string;
    public drugHistory_Drink: string;
    public rollPerDay: string;
    public packPerYear : string;
    public oftenPerWeek: number;

    public weight : number;
    public height : number;
    public waistline : number;
    public bmi : string;

    public bp1 : string;
    public bp1MM : string;
    public bp1HG : string;

    public bp2 : string;
    public bp2MM : string;
    public bp2HG : string;

    public fbs: string;

    public isMetabolic : boolean;
    public isHypertension : boolean;
    public isEyeComplication : boolean;
    public isKidneyComplication : boolean;
    public isPeripheralNeuropathy : boolean;
    public peripheralName : string;
    public isNeuropathy : boolean;
    public isOther : boolean;
    public otherComplication : string;

    public rowGUIDDetailInfo : string;
    public documentId : string;
    public hInsuranceTypeId : string;
}