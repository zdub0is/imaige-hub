
import { FastifyInstance, FastifyPluginAsync, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import fp from 'fastify-plugin';


const verifyJwt: FastifyPluginAsync = async function(server: FastifyInstance, opts: FastifyPluginOptions) {
  
   server.decorate("authenticate", async function(req: FastifyRequest, reply: FastifyReply): Promise<void> {
      try {
        await req.jwtVerify();
        // Get data from JWT
      } catch (err) {
        reply.send(err);
      }
    })
  }

  export default fp(verifyJwt);

