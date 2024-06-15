
import { FastifyPluginAsync, FastifyInstance, FastifyPluginOptions, FastifyRequest } from "fastify";
import { prompt } from "../../models/prompts";
import { getQueue } from "../../queue/startQueue";

export const promptRoute: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {

    // Change to post later
    server.post('/', async function (req: FastifyRequest<{ Body: prompt}>, reply) {
        const prompt: prompt = req.body;

        console.log(prompt.isApproved? true: false)

        if(prompt.isApproved){
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

};