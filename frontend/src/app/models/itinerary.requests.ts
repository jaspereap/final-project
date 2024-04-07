import { Costing, IdentityToken, Place } from "./dtos";
import { CustomPlaceResult } from "./itinerary.models";

export interface NewPlaceRequest {
    identity: IdentityToken, 
    tripId:string, 
    date: Date, 
    place: CustomPlaceResult
}

export interface UpdatePlaceRequest {
    identity:IdentityToken, 
    tripId: string, 
    date: Date, 
    rank: number, 
    place: Place
}

export interface DeletePlaceRequest {
    identity: IdentityToken, 
    tripId: string, 
    date: Date, 
    rank: number
}

export interface CostingsPlaceRequest {
    identity: IdentityToken, 
    tripId: string, 
    date: Date, 
    rank: number, 
    costing: Costing
}
export interface DeleteCostingPlaceRequest {
    identity: IdentityToken, 
    tripId: string, 
    date: Date, 
    rank: number, 
    costingIndex: number
}