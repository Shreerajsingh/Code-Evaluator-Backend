const { createSubmission } = require("../../../controllers/submissionController");

async function v1Route(fastify, options) {
    fastify.post('/ping', createSubmission);
}

module.exports = v1Route;