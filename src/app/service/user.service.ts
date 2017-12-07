import { Injectable } from '@angular/core';

@Injectable()
export class UserService {
    public username: string = "";
    public password: string = "";
    public userId: string;
    public userRoleId: string;
    public userFullName: string;
    public hospitalCode5: string;

    constructor() {

    }
}