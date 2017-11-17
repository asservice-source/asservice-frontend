import { Injectable, Inject, Optional } from '@angular/core';

import {LoadingConfig } from './ngx-loading.config';
import {ILoadingConfig } from './ngx-loading.interface';

@Injectable()
export class LoadingConfigService {
    public loadingConfig: ILoadingConfig;

    constructor( @Optional() @Inject('loadingConfig') private config: ILoadingConfig) {
        this.loadingConfig = config || new LoadingConfig();
    }
}