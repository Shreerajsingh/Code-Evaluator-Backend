const mongoose = require('mongoose');
const {ATLAS_DB_URL, NODE_ENV} = require('./server.config');

async function connectToDB() {
    try {
        if(NODE_ENV == "development") {
            await mongoose.connect(ATLAS_DB_URL);
        }
    /*  NOTE: Here we using devlopment as default node enviornment, 
            but if we are in different enviornments like production 
            or testing or etc then we require there seprate and specific 
            connections (i.e. url) which cane be done using else if and all. 
    */
    } catch (error) {
        console.log("Unable to connect to the DB server");
        console.log(error);
    }
}

module.exports = connectToDB;