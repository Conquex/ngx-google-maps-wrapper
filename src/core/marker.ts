import { LatLng, GoogleMaps, Polyline, InfoWindow } from '../index';

declare var google;

export class Marker {
    public nativeMarker: any;
    private options: MarkerOptions;
    private positionHistory: Array<any> = [];
    
    constructor(options: MarkerOptions) {
        let parsedOptions: any = {};
        parsedOptions.position = options.position.nativeLatlng;
        if (options.map) {
            parsedOptions.map = options.map.nativeMap;
        }
        
        for (let prop in options) {
            if ((prop == "map") || (prop == "position")) {
                continue;
            }
            parsedOptions[prop] = options[prop];
        }
        
        this.nativeMarker = new google.maps.Marker(parsedOptions);
        this.options = options;
    }
    
    public show(map: GoogleMaps) {
        this.positionHistory = [];
        this.options.map = map;
        this.nativeMarker.setMap(map.nativeMap);
    }
    
    public remove() {
        this.positionHistory = [];
        this.options.map = null;
        this.nativeMarker.setMap(null);
    }
    
    public move(position: LatLng, drawPath?: boolean) {
        if (!this.positionHistory) {
            this.positionHistory = []
        }
        this.positionHistory.push(position.nativeLatlng);
        this.nativeMarker.setPosition(position.nativeLatlng);
        
        if (drawPath) {
            this.drawHistoryPath();
        }
    }
    
    public onClick(callback: () => any) {
        this.nativeMarker.addListener('click', () => {
            callback();
        });
    }

    public showInfoWindow(infoWindow: InfoWindow) {
        infoWindow.open(this.options.map, this);
    }
    
    private drawHistoryPath() {
        let lineCoordinatesPath = new Polyline({
            path: this.positionHistory,
            geodesic: true,
            strokeColor: '#2E10FF',
            map: this.options.map
        });
    }
}

export interface MarkerOptions {
    position: LatLng,
    map?: GoogleMaps,
    title?: string,
    label?: string,
    id?: string | number,
    draggable?: boolean
}