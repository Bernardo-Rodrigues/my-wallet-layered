export default class Unauthorized {
    constructor(message){
        this.message = message;
        this.status = 401;
    }
}