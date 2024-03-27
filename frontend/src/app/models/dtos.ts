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