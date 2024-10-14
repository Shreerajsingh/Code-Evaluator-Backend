import express, {Express} from "express";

import serverConfig from "./config/serverConfig";
import bullBoardServerAdapter from "./config/bullBoardConfig";
import apiRouter from "./routes";
import sampleWorker from "./worker/sampleWorker";
import bodyParser from "body-parser";
import submissionWorker from "./worker/submissionWorker";
import { Submission_Queue } from "./utils/constants";

const app: Express = express();     // No need to put Type:"Epress" bcs express() tself return that.

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use('/ui', bullBoardServerAdapter.getRouter());
app.use('/api', apiRouter);

app.listen(serverConfig.PORT, () => {
    console.log(`Server started at port: ${serverConfig.PORT}`);

    sampleWorker('SampleQueue');
    submissionWorker(Submission_Queue);
});