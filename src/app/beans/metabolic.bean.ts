export class MetabolicBean{
    public personal_CitizenID : String;
    public personal_PatentID : String;
    public personal_Fname : String;
    public personal_Lname : String;
    public personal_Gender : String;
    public personal_AgeYears : number;
    public personal_AgeMonths : String;
    public personal_HouseID : String;
    public personal_HgroupID : String;
    public personal_DistrictID : String;
    public personal_AmphurID : String;
    public personal_CityID : String;
    public personal_Fullname : string;
    public healthInsurananceType:string;
    public birthDate;
  
    public healtHistory_isDiabetesParent: boolean;
    public healtHistory_isOverBmi: boolean;
    public healtHistory_isOverBp: boolean;
    public healtHistory_isOverFbs: boolean;
    public healtHistory_isOvercholesterol: boolean;
    public healtHistory_isPregnantDiabetes: boolean;
    public healtHistory_isOverBpParent: boolean;
  
    public drugHistory_isSmoke: boolean;
    public drugHistory_isDrink: boolean;
    public drugHistory_numTobacco: Number;
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