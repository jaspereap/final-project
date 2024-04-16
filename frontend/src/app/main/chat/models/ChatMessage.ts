import { UserDTO } from "../../../models/dtos";

export interface ChatMessage {
    sender: UserDTO,
    destination: string,
    message: string,
  }