
import { FastifyPluginAsync, FastifyInstance, FastifyPluginOptions } from "fastify";
import { UserRoles } from "../../models/roles";

export const usersRoute: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {
    
    const users = server.mongo.db?.collection('users');

    // Get a user
    // Maybe change to get by user name or something later 
    server.get<{ Params: {userId : string} }>('/:userId', async function (req, reply) {
        
        const userId = req.params.userId;
        const user = await users?.findOne({"_id": new this.mongo.ObjectId(userId)})
        reply.send(user);
    });
 
    // create a user
    server.post('/', function (req, reply) {
        const newUser = req.body as Document;

        //user 
        // {
        // These will be from the form
        //     name: string;
        //     username: string;
        //     password: string;
        // These will be inserted here
        //     role: string;
        //     notificationsEnabled: boolean;
        //     isBanned: boolean;
        // }

        const defaultUserOptions = {
            role: UserRoles.STUDENT,
            notificationsEnabled: true,
            isBanned: false,
        }


        users?.insertOne({...newUser, ...defaultUserOptions}).then(res => {
            if(res.insertedId){

                reply.status(200).send();
            }
        });
    });


};
