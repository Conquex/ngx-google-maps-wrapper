import { GoogleMaps, LatLng } from '../index';

declare var google;

export class Directions {
    public nativeDirectionsService: any;
    public nativeDirectionsRenderer: any;
    constructor(options: DirectionOptions) {
        this.nativeDirectionsService = new google.maps.DirectionsService();
        this.nativeDirectionsRenderer = new google.maps.DirectionsRenderer();

        this.nativeDirectionsService.route(options, (response, status) => {
            if (status == 'OK') {
                this.nativeDirectionsRenderer.setDirections(response);
            }
        });
    }

    public setMap(map: GoogleMaps) {
        this.nativeDirectionsRenderer.setMap(map.nativeMap);
    }
}

export interface DirectionOptions {
    origin: LatLng | string,
    destination: LatLng | string,
    travelMode: string,
    waypoints?: Array<any>,
    optimizeWaypoints?: boolean
}