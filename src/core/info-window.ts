import { ElementRef } from '@angular/core';
import { GoogleMaps, Marker, LatLng } from '../index';

declare var google;

export class InfoWindow {
    public nativeInfoWindow: any;
    constructor(options: InfoWindowOptions) {
        if (typeof options.content != "string") {
            options.content = options.content.nativeElement;
        }

        this.nativeInfoWindow = new google.maps.InfoWindow(options);
    }

    public open(map: GoogleMaps, marker: Marker) {
        this.nativeInfoWindow.open(map.nativeMap, marker.nativeMarker)
    }
}

export interface InfoWindowOptions {
    content: string | ElementRef
}