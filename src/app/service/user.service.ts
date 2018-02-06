import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
    public username: string = "";
    public password: string = "";
    public userId: string;
    public fullName: string;
    public hospitalCode5: string;
    public hospitalCode9: string;
    public hospitalName: string;
    public hospitalDisplayName: string;
    public personId: string;
    public citizenId: string;
    public roleId: string;
    public firstName: string;
    public lastName: string;
    public villageId: string;
    public villageNo: string;
    public villageName: string;
    public birthDate: string;
    public address: string;
    public roleAcronym: string;
    public genderName: string;
    public genderId: string;
    public imagePath: string;
    constructor() {

    }

    set(response: any){
       
        this.userId = response.userId
        this.personId =  response.personId
        this.citizenId =  response.citizenId || ''
        this.roleId = response.roleId
        this.username = response.userName || ''
        this.fullName = response.fullName || ''
        this.firstName = response.firstName || ''
        this.lastName = response.lastName || ''
        this.hospitalCode5 = response.code5
        this.hospitalCode9 = response.code9
        this.hospitalName = response.hospitalName  || ''
        this.hospitalDisplayName = response.hospitalDisplayName  || ''
        this.villageId = response.villageId
        this.villageNo = response.villageNo || ''
        this.villageName = response.villageName || ''
        this.birthDate = response.birthDate
        this.address = response.address || ''
        this.roleAcronym = response.roleAcronym  || ''
        this.genderId = response.genderId;
        this.genderName = response.genderName  || ''
        this.imagePath = response.imagePath  || '../../assets/img/avatar5.png'
    }

    setImagePath(fullPath: string){
        this.imagePath = fullPath;
        let jsonUInfo: any = localStorage.getItem("uinfo");
        jsonUInfo = JSON.parse(jsonUInfo);
        jsonUInfo.imagePath = fullPath;
        localStorage.setItem("uinfo", JSON.stringify(jsonUInfo));
    }
}