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
}