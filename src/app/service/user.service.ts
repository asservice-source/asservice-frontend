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
    public picturePath: string;
}