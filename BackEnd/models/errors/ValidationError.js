module.exports = class ValidationError {
    constructor(instance, details) {
        this.type = 'Validation Error';
        this.title = 'Invalid data provided';
        this.status = 422;
        this.instance = instance;
        this.details = details;
    }
}