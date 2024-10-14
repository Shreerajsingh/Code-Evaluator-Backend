const fastify = require('fastify')({logger: false});     //Calling the fastify container
const app = require('./app');
const connectToDB = require('./config/db.config');
const serverConfig = require('./config/serverConfig');
const evaluationWorker = require('./workers/evaluationWorker');

fastify.register(app);

fastify.get('/ping', (req, res) => {
    res.send({message: 'pong'});
});

const PORT = serverConfig.PORT;

fastify.listen({port: PORT}, async (err) => {
    if(err) {
        fastify.log.error(err);
        process.exit(1);
    }

    await connectToDB();

    evaluationWorker("EvaluationQueue");

    console.log(`Server up at port: ${PORT}`);
});