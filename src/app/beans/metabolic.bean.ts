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
  
    public isHeredityMetabolic: boolean = false;
    public isWaistlineOver: boolean = false;
    public isBPOver: boolean = false;
    public isFBS: boolean = false;
    public isCholesterol: boolean = false;
    public healtHistory_isPregnantDiabetes: boolean = false;
    public healtHistory_isOverBpParent: boolean = false;
  
    public smokingStatusId : string ;
    public drugHistory_Smoke: string;
    public drugHistory_Drink: string;
    public drugHistory_numTobacco: Number;
    public drugHistory_Packperyear : number;
    public drugHistory_numDrink: Number;
  
    public physicalBody_weight: Number;
    public physicalBody_height: Number;
    public physicalBody_waistline: Number;
    public physicalBody_BMI: Number;
    public physicalBody_BP1_mm: Number;
    public physicalBody_BP1_hg: Number;
    public physicalBody_BP2_mm: Number;
    public physicalBody_BP2_hg: Number;
  
    public disease_Diabetes: boolean;
    public disease_OverBP: boolean;
    public disease_Complication_eye: boolean;
    public disease_Complication_kidney: boolean;
    public disease_Complication_nerve: boolean;
    public disease_Complication_nervousSys: boolean;
    public disease_Complication_etc: boolean;
    public action: string;
}