
import { FastifyPluginAsync, FastifyInstance, FastifyPluginOptions, FastifyRequest } from "fastify";
import { prompt, promptRequest } from "../../models/prompts";
import { getQueue } from "../../queue/startQueue";

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

    server.post('/', async function(req: FastifyRequest<{Body: promptRequest}>, reply){
        const promptRequest: promptRequest = req.body;

        prompts?.insertOne({...promptRequest, isApproved: false, timeRequested: Date.now()});

    })

};