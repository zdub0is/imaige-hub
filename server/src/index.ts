
import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { fastifyRequestContext } from '@fastify/request-context';
import mongo from "@fastify/mongodb";
import cors from '@fastify/cors';
import dotenv from "dotenv";
dotenv.config();

import { getQueue } from './queue/startQueue';
import { testRoute } from './routes/test/test';
import { getImagesRoute } from './routes/images/serveImage';
import { galleryRoute } from './routes/images/image';
import { generateImagesRoute } from './routes/images/generateImage';
import { usersRoute } from './routes/users/users';
import { promptRoute } from './routes/prompts/prompt';
import { authenticationRoute } from './routes/auths/authentication';

import verfiyJwt from "./auth/jwtPlugin"
import fastifyJwt from '@fastify/jwt';
import fastifyCookie from "@fastify/cookie"
import { user } from './models/user';


declare module 'fastify' {
    interface FastifyInstance { // you must reference the interface and not the type
        authenticate: (req: FastifyRequest, reply: FastifyReply) => Promise<void>
    }
}

declare module '@fastify/request-context' {
	interface RequestContextData {
	  user: user | null
	}
  }

getQueue();


export const server = fastify({
	// logger: true
});

server.register(cors, {
	origin: process.env.CLIENT_URL
});

server.register(fastifyRequestContext, {
	defaultStoreValues: {
		user: null
	}
})

server.register(fastifyCookie, {
	secret: process.env.COOKIE_SECRET,
})

server.register(fastifyJwt, {
	secret: process.env.JWT_SECRET as string,
	decode: { complete: true },
	cookie: {
		cookieName: 'token',
		signed: false
	}
})

verfiyJwt(server, {})
server.register(mongo, {
	forceClose: true,
	url: process.env.MONGO_URL
});

server.register(authenticationRoute, { prefix: "auth" });
server.register(testRoute, { prefix: "test" });
// Rename this one
server.register(getImagesRoute, { prefix: "img" });
server.register(galleryRoute, { prefix: "gallery" });
server.register(promptRoute, { prefix: "prompt" });
server.register(generateImagesRoute, { prefix: "generate" });
server.register(usersRoute, { prefix: "user" })


// Declare a route  
// server.get('/secret', { onRequest: server.authenticate }, async (request, reply) => {
// 	reply.send("Hello")
// });
server.get('/', async (request, reply) => {
	reply.send("Hello")
});
// Run the server!  
server.listen({ port: 8800 }, function (err, address) {
	if (err) {
		console.log("run")
		console.log(err)
		process.exit(1)
	}

	console.log(`Server is now listening on ${address}`)
})