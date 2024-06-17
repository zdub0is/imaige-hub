
import {image} from "../../models/image";
import { FastifyPluginAsync, FastifyPluginOptions, FastifyRequest } from "fastify";
import { FastifyInstance } from "fastify/types/instance";

export const galleryRoute: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {
    
    const images = server.mongo.db?.collection('images');

    // Add pagination later
    server.get('/', async function (req, reply) {

        const imagesArray = await images?.find({ isApproved: true, isDeleted: false }).toArray();

        reply.send(imagesArray);
    });

    server.post("/multi", async function(req: FastifyRequest<{ Body: [image]} >, reply){
        const imageData = req.body;

        images?.insertMany(imageData);

        reply.status(201).send("ok")

    })

};
