export interface User {
    username: string
    password: string
    email: string
}

export interface LoginRequest {
    username: string
    password: string
}

export interface AuthData {
    authToken: string
    user: User
}

export enum MessageType {
    ACK = 'ACK',
    USER_JOINED = 'USER_JOINED',
    USER_LEFT = 'USER_LEFT',
    CHAT = 'CHAT'
}

export interface TripRequest {
    country: string
    start: Date
    end: Date
}
export interface TripCard {
    id: string
    ownerId: number
    country: string
    startDate: Date
    endDate: Date
    image: string
}

export interface Trip {
    id: string
    country: string
    startDate: Date
    endDate: Date
    ownerId: number
    tripMatesId: number[]
    flightDetails: Flight[]
    lodgings: Lodging[]
    itinerary: Itinerary
    image: string
}
export interface Flight {
    airlineName: string
    flightNumber: string
    departureCountry: string
    arrivalCountry: string
    departureDate: Date
    arrivalDate: Date
    notes: string
    image: string
    // Cost
    costings: Costing[]
}
export interface Lodging {
    name: string
    notes: string
    checkIn: Date
    checkOut: Date
    // Location
    address: string
    latlng: number[]
    // Cost
    costings: Costing[]
}
export interface Itinerary {
    id: string
    days: Day[]
}
export interface Day {
    date: Date
    places: Place[]
}
export interface Place {
    rank: number
    name: string
    image: string
    notes: string
    start: Date
    end: Date
    // Location
    address: string
    latlng: number[]
    // Cost
    costings: Costing[]
}
export interface Costing {
    payer: string
    cost: number
    currency: string
}

export interface Marker {
    label: string
    latlng: {lat: number, lng: number}
}