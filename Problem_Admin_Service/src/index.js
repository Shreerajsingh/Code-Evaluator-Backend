const express = require('express');
const bodyparser = require('body-parser');

const {PORT} = require('./config/server.config')

const apiRouter = require('./routes/index.js');
const errorHandler = require('./utils/errorHandler.js');
const connectToDB = require('./config/db.config');
const mongoose = require('mongoose');
// const NotFoundError = require('./Errors/NotFoundError.js');

const app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: true}));   // @ 
app.use(bodyparser.text());

// If any req comes and route starts with /api, we map it to apiRouter
app.use('/api', apiRouter);

app.get('/ping', (req,res) => {
    return res.json({message: 'Problem Service is alive'});
});

// Last MiddleWare if any error comes
app.use(errorHandler);

app.listen(PORT, async () => {
    console.log(`server started at port: ${PORT}`);
    await connectToDB();
    console.log("Successfully connected");
 
    // try{
    //     throw new NotFoundError({});
    // } catch(error) {
    //     console.log("Somthing went wrong ", error);
    // } finally {
    //     console.log("Executed finally");
    // }
}); 