declare var google;

export class Autocomplete {
    public autocomplete: any;
    public placesServices: any;
    public geocoder: any;

    constructor() {
        this.autocomplete = new google.maps.places.AutocompleteService();
        this.placesServices = new google.maps.places.PlacesService(document.createElement("div"));
        this.geocoder = new google.maps.Geocoder();
    }

    public getPlacePredictions(placeTitle: string): Promise<any> {
        let ret = new Promise((resolve, reject) => {
            this.autocomplete.getPlacePredictions({ input: placeTitle }, (predictions, status) => {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    if (predictions.length > 0) {
                        try {
                            this.placesServices.getDetails({ placeId: predictions[0].place_id }, (result, status) => {
                                if ((status == google.maps.places.PlacesServiceStatus.OK) && (result && result.geometry)) {
                                    resolve(result);
                                } else {
                                    reject("No results");
                                }
                            });
                        } catch (e) {
                            reject(e);
                        }
                    } else {
                        reject("No results");
                    }
                } else {
                    this.geocoder.geocode({ address: placeTitle }, (results: Array<any>, status) => {
                        try {
                            if (status == google.maps.places.PlacesServiceStatus.OK) {
                                if (results && (results.length > 0)) {
                                    let place = results[0];
                                    if (place && place.geometry && place.geometry.location) {
                                        resolve(place.geometry.location);
                                    } else {
                                        reject("No results");
                                    }
                                } else {
                                    reject("No results");
                                }
                            } else {
                                reject("No results");
                            }
                        } catch (e) {
                            reject("No results");
                        }
                    });
                }
            });
        });

        return ret;
    }
}