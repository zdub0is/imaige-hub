
import { FastifyPluginAsync, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { prompt, promptRequest } from "../../models/prompts";
import { getQueue } from "../../queue/startQueue";
import { FastifyInstance,  } from "fastify/types/instance";

export const promptRoute: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {

    const prompts = server.mongo.db?.collection('prompts');

    // Change to post later
    server.post('/addJob', async function (req: FastifyRequest<{ Body: prompt}>, reply) {
        const prompt: prompt = req.body;

        if(typeof prompt.isApproved == "boolean" && prompt.isApproved){
            // Send to job queue
            const queue = getQueue();
            await queue.add("image-generation", prompt);
            reply.send("Sent to Queue");
            
        }
        else{
            // Inform of rejection
            reply.send("rejected");

        }
    })

    
    server.post<{ Body: promptRequest }>("/", { onRequest: server.authenticate }, async function(req: FastifyRequest<{Body: promptRequest}>, reply: FastifyReply){
        const promptRequest = req.body;

        await prompts?.insertOne({...promptRequest, isApproved: false, timeRequested: Date.now()});

    })

};