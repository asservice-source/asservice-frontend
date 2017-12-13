import { Injectable, Inject, Optional } from '@angular/core';


@Injectable()
export class ShowLoadingService {
    public show: boolean;
    constructor() {
        this.show = false;
    }
}