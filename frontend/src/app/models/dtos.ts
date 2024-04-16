export interface User {
    username: string
    password: string
    email: string
    firstName: string
    lastName: string
}
export interface UserDTO {
    username: string
    email: string
    firstName: string
    lastName: string
    userId: number
}
export interface IdentityToken {
    username: string
    userId: number
}
export interface LoginRequest {
    username: string
    password: string
}

export interface AuthData {
    authToken: string
    user: UserDTO
}

export enum MessageType {
    CHAT = 'CHAT',
    MODIFIED = 'MODIFIED',
    ITINERARY_ADDED = 'ITINERARY_ADDED',
    ITINERARY_MODIFIED = 'ITINERARY_MODIFIED',
    FLIGHT_ADDED = 'FLIGHT_ADDED',
    FLIGHT_MODIFIED = 'FLIGHT_MODIFIED',
    LODGING_ADDED = 'LODGING_ADDED',
    LODGING_MODIFIED = 'LODGING_MODIFIED'
}
export interface TripRequest {
    identity: IdentityToken
    country: string
    start: Date
    end: Date
    tripMates: UserDTO[]
}
export interface TripResponse {
    id: string
    country: string
    startDate: Date
    endDate: Date
    ownerId: number
    tripMatesId: number[]
}
export interface TripCard {
    id: string
    ownerId: number
    tripMatesId: number[]
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