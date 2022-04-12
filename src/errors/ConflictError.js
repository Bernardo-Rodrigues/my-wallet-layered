export default class Conflict {
    constructor(message){
        this.message = message;
        this.status = 409;
    }
}