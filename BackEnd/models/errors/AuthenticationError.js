module.exports = class AuthenticationError {
    constructor(title, instance, details) {
        this.type = 'Authentication Error';
        this.title = this.title;
        this.status = 401;
        this.instance = instance;
        this.details = details;
    }
}