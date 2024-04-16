import { Costing, IdentityToken } from "./dtos";

export interface CostingsLodgingRequest {
    identity: IdentityToken, 
    tripId: string,
    lodgingIndex: number,
    costing: Costing
}

export interface DeleteCostingLodgingRequest {
    identity: IdentityToken, 
    tripId: string, 
    lodgingIndex: number,
    costingIndex: number
}