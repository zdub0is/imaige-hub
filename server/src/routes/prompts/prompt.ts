
import { FastifyPluginAsync, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { prompt, promptRequest } from "../../models/prompts";
import { getQueue } from "../../queue/startQueue";
import { FastifyInstance,  } from "fastify/types/instance";
import { UserRoles } from "../../models/roles";
import { NotificationTypes } from "../../models/notifications";

export const promptRoute: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {

    const prompts = server.mongo.db?.collection('prompts');
    const notifications = server.mongo.db?.collection('notifications');


    // Change to post later
    server.post<{ Body: prompt}>('/addJob',{ onRequest: server.authenticate }, async function (req: FastifyRequest<{ Body: prompt}>, reply) {
        const prompt: prompt = req.body;

        // Change later to get user from DB?
        const userContext = req.requestContext.get("user")?.user;

        if(userContext == undefined){
            reply.status(401).send();
            return;
        }

        if(prompt.isApproved == true && userContext.role == UserRoles.INSTRUCTOR){
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
        const userContext = req.requestContext.get("user")?.user;

        if(userContext == undefined || userContext == null){
            reply.status(401).send();
            return;
        }
        
        promptRequest.userRequested = userContext.username;

        await prompts?.insertOne({...promptRequest, isApproved: false, timeRequested: Date.now()});
        await notifications?.insertOne(
            {
                ...promptRequest, 
                isApproved: false, 
                time: Date.now(),
                isActive: true, 
                type: NotificationTypes.PROMPT_APPROVAL_REQUEST, 
                to: UserRoles.INSTRUCTOR
            });

        reply.status(200).send("prompt is awaiting approval");

    })

    server.get("/", { onRequest: server.authenticate },  async function(req, reply){
        const userContext = req.requestContext.get("user")?.user;

        if(userContext == undefined || userContext == null){
            reply.status(401).send();
            return;
        }

        let notices;

        if(userContext.role == UserRoles.INSTRUCTOR || userContext.role == UserRoles.ADMIN){
            // Get 50 most recent 
            notices = await notifications?.find({$or: [{to: userContext.username}, {to: userContext.role}]}).sort({"time": -1}).limit(50).toArray();
            
        }  
        else{
            // Get notifications for this user only
            notices = await notifications?.find({to: userContext.username}).limit(50).toArray();
        }
        
        reply.send(notices);


    })

};