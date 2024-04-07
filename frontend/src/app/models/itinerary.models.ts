import { Day } from "./dtos"

export interface CustomPlaceResult {
    name: string | undefined
    address: string | undefined
    latlng: google.maps.LatLng | undefined
    image: string
}

export interface Marker {
    label: string
    latlng: {lat: number, lng: number}
}