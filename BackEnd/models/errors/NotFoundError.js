module.exports = class NotFoundError {
    constructor(instance, details) {
        this.type = 'Not Found Error';
        this.title = 'The resource you requested was not be found.'
        this.status = 404;
        this.instance = instance;
        this.details = details;
    }
}