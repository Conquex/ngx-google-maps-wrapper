import { ElementRef } from '@angular/core';
declare var google;

export class GoogleMaps {
    public nativeMap: any;
    constructor(container: string | ElementRef, options?: any) {
        if (container) {
            let element;
            if (typeof container == "string") {
                element = document.getElementById(container);
            } else {
                element = container.nativeElement;
            }
            if (element) {
                this.nativeMap = new google.maps.Map(element, options);
            }
        }
    }
}
