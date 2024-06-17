
import {image} from "../../models/image";
import { FastifyPluginAsync, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { FastifyInstance } from "fastify/types/instance";
interface Server extends FastifyInstance {
	authenticate?: (req: FastifyRequest, reply: FastifyReply) => Promise<void>
}

export const galleryRoute: FastifyPluginAsync = async (server: Server, options: FastifyPluginOptions) => {
    
    const images = server.mongo.db?.collection('images');

    // Add pagination later
    server.get('/', { onRequest: server.authenticate }, async function (req, reply) {

        const imagesArray = await images?.find({ isApproved: true, isDeleted: false }).toArray();

        reply.send(imagesArray);
    });

    server.post("/multi", async function(req: FastifyRequest<{ Body: [image]} >, reply){
        const imageData = req.body;

        images?.insertMany(imageData);

        reply.status(201).send("ok")

    })

};
