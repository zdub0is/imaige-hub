
import { FastifyInstance, FastifyPluginAsync, FastifyPluginOptions } from 'fastify';
import fastifyPiscina from 'fastify-piscina';
const { resolve } = require('path');

type imageParams = {
    imageName: string;
}

export const generateImagesRoute: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {

    server.register(fastifyPiscina, {
        // Piscina Options object. See Piscina docs for details
        filename: resolve(__dirname, '../../worker.js'),
        maxQueue: 1,
    });
    

    // Change to post later
    server.get<{ Params: imageParams }>('/:imagePrompt', function (req, res) {

        server.runTask({}).then((res) => {
            console.log(res)
            }
        )
        // server.runTask({ a: 3, b: 2 }).then((res) => {
        //     console.log(res)
        // }
        // )
    })

};