export default class UnprocessableEntity {
    constructor(message){
        this.message = message;
        this.status = 422;
    }
}