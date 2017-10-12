import { LatLng, GoogleMaps } from '../index';
declare var google;

export class Polyline {
    public nativePolyline: any;
    constructor(options: PolylineOptions) {
        let parsedOptions: any = {};
        parsedOptions.path = options.path;
        if (options.map) {
            parsedOptions.map = options.map.nativeMap;
        }
        for (let prop in options) {            
            if ((prop == "map") || (prop == "path")) {
                continue;
            }
            parsedOptions[prop] = options[prop];
        }

        this.nativePolyline = new google.maps.Polyline(parsedOptions);

        /*this._zone.run(() => {
            lineCoordinatesPath.setMap(this.map);
        })*/
    }

    public setMap(map: GoogleMaps) {
        this.nativePolyline.setMap(map.nativeMap);
    }
}

export interface PolylineOptions {
    path: Array<any>,
    map?: GoogleMaps,
    geodesic?: boolean,
    strokeColor?: string
}