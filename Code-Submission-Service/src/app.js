const fastifyCors = require('@fastify/cors');
const fastifyPlugin = require('fastify-plugin');
const servicePlugin = require('./services/servicePlugin');
const apiRoute = require('./routes/api/apiRoute');
const repositoryPlugin = require('./repositories/repositoryPlugin');

/**
 * 
 * @param {Fastify object} fastify 
 * @param {*} options 
 */
async function app(fastify, options) {
    await fastify.register(fastifyCors);

    await fastify.register(repositoryPlugin);
    
    await fastify.register(servicePlugin);

    await fastify.register(apiRoute, {prefix: '/api'});
}

module.exports = fastifyPlugin(app);