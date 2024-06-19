
import bcrypt from "bcrypt";
import { FastifyPluginAsync, FastifyInstance, FastifyPluginOptions } from "fastify";
import { FastifyRequest } from "fastify/types/request";
import { UserRoles } from "../../models/roles";

export const authenticationRoute: FastifyPluginAsync = async (server: FastifyInstance, options: FastifyPluginOptions) => {

    const users = server.mongo.db?.collection('users');
    const auth = server.mongo.db?.collection('authentication');

    // signin
    server.post('/signin', async function (req: FastifyRequest<{ Body: { password: string, username: string } }>, reply) {
        const loginAttempt: { password: string, username: string } = req.body;

        const userAuth = await auth?.findOne({ "username": loginAttempt.username });

        let res = bcrypt.compareSync(loginAttempt.password, userAuth?.password)

        if(res){

            // get user from mongo
            const user = await users?.findOne({ "username": loginAttempt.username })

            // create jwt from db user
            // jwt the whole user for now
            const token = server.jwt.sign({ user });

            // send jwt as httponly cookie
            reply.setCookie("token", token, {
                // domain: 'localhost',
                path: '/',
                // secure: true,
                // sameSite: 'lax',
                httpOnly: true
            });
        }
        else{
            reply.status(403).send();
        }

     
    });

    // signup
    server.post('/signup', function (req: FastifyRequest<{ Body: { password: string, username: string } }>, reply) {
        // body should include at least username and password
        const newLogin: { password: string, username: string } = req.body;

        bcrypt.hash(newLogin.password, 10, function (err, hash) {
            auth?.insertOne({ password: hash, username: newLogin.username }).then(res => {
                if (res.insertedId) {

                    const defaultUserOptions = {
                        role: UserRoles.STUDENT,
                        notificationsEnabled: true,
                        isBanned: false,
                    }


                    users?.insertOne({ username: newLogin.username, ...defaultUserOptions }).then(res => {
                        if (res.insertedId) {

                            reply.status(200).send();
                        }
                    });

                }
            });
        })

    });


};

