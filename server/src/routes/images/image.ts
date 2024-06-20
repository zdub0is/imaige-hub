
import { FastifyInstance, FastifyPluginAsync, FastifyPluginOptions, FastifyRequest } from "fastify";

export const galleryRoute: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {
    
    const images = server.mongo.db?.collection('images');

    // Add pagination later
    server.get('/', async function (req, reply) {

        const imagesArray = await images?.find({ isApproved: true, isDeleted: false }).toArray();

        reply.send(imagesArray);
    });

    server.post("/multi", { onRequest: server.authenticate }, async function(req: FastifyRequest, reply){
        const imageData = req.body as [ImageData];

        images?.insertMany(imageData);

        reply.status(201).send("ok")

    })

};
