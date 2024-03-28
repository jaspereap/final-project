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

export interface Trip {
    id: string
    country: string
    startDate: Date
    endDate: Date
    ownerId: number
    tripMatesId: number[]
    flightDetails: Flight[]
    itinerary: Itinerary
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
    cost: number
}
export interface Itinerary {
    id: string
    days: Day[]
}
export interface Day {
    date: Date
    lodgings: Lodging[]
    activities: Place[]
}
export interface Lodging {
    name: string
    cost: number
    notes: string
    checkIn: Date
    checkOut: Date
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
    latlng: string[]
}