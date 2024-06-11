
import path from 'node:path';
import fastifyStatic from '@fastify/static';
import { FastifyInstance, FastifyPluginAsync, FastifyPluginOptions } from "fastify";

type imageParams = {
	imageName: string;
}


const imageServerOpts = {
    root: path.join(__dirname, '../../images'),
    prefix: '/',
}

export const getImagesRoute: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {
    server.register(fastifyStatic, imageServerOpts)
    
    
    server.get<{ Params: imageParams }>('img/:imageName', function (req, res) {
        const imageName = req.params.imageName;
        console.log(imageServerOpts.root)

        res.sendFile(`/${imageName}.jpg`);
    })

};


