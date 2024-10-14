const BaseError = require("./base.error.js");

class NotFoundError extends BaseError {
    constructor(details) {
        super("Not-Found-Error", 404, "Resource not found", details);
    }
}

module.exports = NotFoundError;