import { FastifyInstance, FastifyPluginAsync, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import Fastifyjwt from "@fastify/jwt";
import fp from 'fastify-plugin';


const verfiyJwt: FastifyPluginAsync = async function(server: FastifyInstance, opts: FastifyPluginOptions) {
  
   server.decorate("authenticate", async function(req: FastifyRequest, reply: FastifyReply): Promise<any> {
      try {
        await req.jwtVerify()
      } catch (err) {
        reply.send(err)
      }
    })
  }

  export default fp(verfiyJwt);

