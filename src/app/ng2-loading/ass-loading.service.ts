import { Injectable, Inject, Optional } from '@angular/core';

import {LoadingConfig } from './ass-loading.config';
import {ILoadingConfig } from './ass-loading.interface';

@Injectable()
export class LoadingConfigService {
    public loadingConfig: ILoadingConfig;

    constructor( @Optional() @Inject('loadingConfig') private config: ILoadingConfig) {
        this.loadingConfig = config || new LoadingConfig();
    }
}