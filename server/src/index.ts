import fastify from 'fastify';
import mongo from "@fastify/mongodb";
import dotenv from "dotenv";
dotenv.config();

import { testRoute } from './routes/test/test';
import { getImagesRoute } from './routes/images/serveImage';
import { generateImagesRoute } from './routes/images/generateImage';
import { usersRoute } from './routes/users/users';
import { authenticationRoute } from './routes/auths/authentication';
import verfiyJwt from "./auth/jwtPlugin"
import fastifyJwt from '@fastify/jwt';
import fastifyCookie from "@fastify/cookie"

const server = fastify({
	// logger: true
});

server.register(fastifyCookie, {
	secret: process.env.COOKIE_SECRET
})

server.register(fastifyJwt, {
	secret: process.env.JWT_SECRET as string
})

verfiyJwt(server, {})
server.register(mongo,{
	forceClose: true,
	url: process.env.MONGO_URL
});

server.register(authenticationRoute, {prefix: "auth"});
server.register(testRoute, { prefix: "test" });
server.register(getImagesRoute, { prefix: "img" });
server.register(generateImagesRoute, { prefix: "generate" });
server.register(usersRoute, {prefix: "user"})


// Declare a route  
// @ts-ignore
server.get('/secret', {onRequest: server.authenticate}, async (request, reply) => {
	reply.send("Hello")
});
server.get('/', async (request, reply) => {
	reply.send("Hello")
});

// Run the server!  
server.listen({ port: 8030 }, function (err, address) {
	if (err) {
		server.log.error(err)
		process.exit(1)
	}

	console.log(`Server is now listening on ${address}`)
})