import { FastifyInstance, FastifyPluginAsync, FastifyPluginOptions } from "fastify";

export const testRoute: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {

    server.get('/', (req, reply) => {
        reply.send('Hello world');
    });
    server.get('/2', (req, reply) => {
        reply.send('Hello world2');
    });
};

