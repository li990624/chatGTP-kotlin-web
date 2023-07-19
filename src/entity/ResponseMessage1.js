export class ResponseMessage {
    constructor(uid,
                username,
                responseMessage,
                content,
                role) {
        this.uid = uid
        this.username = username
        this.responseMessage = responseMessage
        this.content = content
        this.role = role
    }
}