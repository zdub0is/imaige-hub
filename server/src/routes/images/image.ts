import fastifyStatic from "@fastify/static";
import { FastifyPluginAsync, FastifyPluginOptions } from "fastify";
import { FastifyInstance } from "fastify/types/instance";

export const galleryRoute: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {
    
    const images = server.mongo.db?.collection('images');

    // Add pagination later
    server.get('/', async function (req, reply) {

        const imagesArray = await images?.find({ isApproved: true, isDeleted: false }).toArray();

        reply.send(imagesArray);
    })

};
