import { FastifyInstance, FastifyPluginAsync, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import Fastifyjwt from "@fastify/jwt";
import fp from 'fastify-plugin';

import { VerifyPayloadType } from "@fastify/jwt";

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

