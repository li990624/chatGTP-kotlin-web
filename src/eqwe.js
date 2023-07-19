// ChatCompletionChunk
export class ChatCompletionChunk {
    constructor(id, objectName, created, model, choices) {
        this.id = id;
        this.object = objectName;
        this.created = created;
        this.model = model;
        this.choices = choices;
    }
}

// Choice
export class Choice {
    constructor(index, delta, finish_reason) {
        this.index = index;
        this.delta = delta;
        this.finish_reason = finish_reason;
    }
}

// Delta
export class Delta {
    constructor(content) {
        this.content = content;
    }
}