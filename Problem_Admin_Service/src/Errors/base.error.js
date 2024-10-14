class BaseError extends Error {
    constructor(name, statusCode, description, details) {
        super(description);
        this.name = name;
        this.statusCode = statusCode;
        this.details = details;

        Error.captureStackTrace(this);
        
        // Insted of this we can directly get access through error.stack.
        // console.log("----=PRINTING STACK TRACE BAEEBAYYY=----");
        // console.log(this.stack);
        // console.log("=====================================")
    }
}

module.exports = BaseError;