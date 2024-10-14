const BaseError = require('./base.error');
const {StatusCodes} = require('http-status-codes');

class NotImplemented extends BaseError {
    constructor(methodName) {
        console.log("xxxxxxxxxxx");
        super("UnImplemented", StatusCodes.NOT_IMPLEMENTED, `${methodName} not implemented`, {});
    }
}

module.exports = NotImplemented; 