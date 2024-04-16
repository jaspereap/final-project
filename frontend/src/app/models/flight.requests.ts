import { Costing, IdentityToken } from "./dtos";

export interface CostingsFlightRequest {
    identity: IdentityToken, 
    tripId: string,
    flightIndex: number,
    costing: Costing
}

export interface DeleteCostingFlightRequest {
    identity: IdentityToken, 
    tripId: string, 
    flightIndex: number,
    costingIndex: number
}