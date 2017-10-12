declare var google;

export class LatLng {
    public nativeLatlng: any;
    constructor(lat: number, lng: number) {
        this.nativeLatlng = new google.maps.LatLng(lat, lng);
    }
}