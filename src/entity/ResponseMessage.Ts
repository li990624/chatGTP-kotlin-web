import {Message} from "./Message";

export class ResponseMessage {
    uid: string
    username: string
    responseMessage: Array<Message>
    content: string
    role: string

    constructor(uid: string,
                username: string,
                responseMessage: Array<Message>,
                content: string,
                role: string) {
        this.uid = uid
        this.username = username
        this.responseMessage = responseMessage
        this.content = content
        this.role = role
    }
}