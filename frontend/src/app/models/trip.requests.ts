import { IdentityToken, UserDTO } from "./dtos";

export interface NewTripMateRequest {
    identity: IdentityToken
    tripId: string
    username: string
}