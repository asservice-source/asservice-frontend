import { Component, OnInit, Input } from '@angular/core';

import { LoadingConfigService } from './ass-loading.service';
import { LoadingConfig, ANIMATION_TYPES } from './ass-loading.config';
import { ILoadingConfig } from './ass-loading.interface';

@Component({
    selector: 'ass-loading',
    templateUrl: 'template.html',
    styleUrls:['style.css']
})
export class LoadingComponent implements OnInit {
    @Input() show: boolean;
    @Input() config: ILoadingConfig = new LoadingConfig();

    public ANIMATION_TYPES = ANIMATION_TYPES;

    public loadingConfig: ILoadingConfig = {
        animationType: '',
        backdropBackgroundColour: '',
        backdropBorderRadius: '',
        fullScreenBackdrop: false,
        primaryColour: '',
        secondaryColour: '',
        tertiaryColour: ''
    };

    private defaultConfig: ILoadingConfig = {
        animationType: ANIMATION_TYPES.threeBounce,
        backdropBackgroundColour: 'rgba(0, 0, 0, 0.4)',
        backdropBorderRadius: '0px',
        fullScreenBackdrop: true,
        primaryColour: '#ffffff',
        secondaryColour: '#ffffff',
        tertiaryColour: '#ffffff'
    }

    constructor(private loadingConfigService: LoadingConfigService) { }

    ngOnInit() {
        for (let option in this.defaultConfig) {
            if (typeof this.loadingConfig[option] == "boolean") {
                this.loadingConfig[option] = this.config[option] != null ? this.config[option] : false;

                if (this.loadingConfig[option] == false) {
                    this.loadingConfig[option] = this.loadingConfigService.loadingConfig[option] != null ? this.loadingConfigService.loadingConfig[option] : this.defaultConfig[option];
                }
            } else {
                this.loadingConfig[option] = this.config[option] != null ? this.config[option] : '';

                if (this.loadingConfig[option] == '') {
                    this.loadingConfig[option] = this.loadingConfigService.loadingConfig[option] != null ? this.loadingConfigService.loadingConfig[option] : this.defaultConfig[option];
                }
            }
        };
    }

    public getAnimationType(animationType: string): string {
        let animationTypeSet: string;
        switch (animationType) {
            case ANIMATION_TYPES.threeBounce:
                animationTypeSet = ANIMATION_TYPES.threeBounce;
                break;
            case ANIMATION_TYPES.rectangleBounce:
                animationTypeSet = ANIMATION_TYPES.rectangleBounce;
                break;
            case ANIMATION_TYPES.rotatingPlane:
                animationTypeSet = ANIMATION_TYPES.rotatingPlane;
                break;
            case ANIMATION_TYPES.wanderingCubes:
                animationTypeSet = ANIMATION_TYPES.wanderingCubes;
                break;
            default:
                animationTypeSet = ANIMATION_TYPES.threeBounce;
        }
        return animationTypeSet;
    }
}