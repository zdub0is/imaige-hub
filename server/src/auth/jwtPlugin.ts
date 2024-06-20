
import { FastifyInstance, FastifyPluginAsync, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import fp from 'fastify-plugin';
import { decode } from "punycode";
import { user } from "../models/user";

// @ts-ignore
const verifyJwt: FastifyPluginAsync = async function (server: FastifyInstance, opts: FastifyPluginOptions, done: (() => void) | undefined) {

  server.decorate("authenticate", async function (req: FastifyRequest, reply: FastifyReply): Promise<void> {

    try {
      req.jwtVerify((err, decoded)=> {

        if(err){
          throw err
        }
        
        console.log(decoded)
        if(decoded.user.isBanned){
          reply.status(401).send("Access Denied")
        }

        req.requestContext.set("user", decoded)
      });
      // Get data from JWT

    } catch (err) {
      reply.send(err);
    }
  })
}

export default fp(verifyJwt);

