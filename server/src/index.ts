
import fastify, { FastifyReply, FastifyRequest } from 'fastify';
import mongo from "@fastify/mongodb";
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
import { FastifyInstance } from 'fastify';


const queue = getQueue();

// async function addJobs(queue: Queue<any, any, string>) {
// 	await queue.add('myJobName', { inputs: ' A room to buy spells, elixir\'s from. Like the image for the store but with only bottles and no weapons. Maybe a cauldron in the room too.' });
// 	// await queue.add('myJobName', { qux: 'baz' });
// }

// (async function () {

// 	await addJobs(queue)
// }
// )();

interface Server extends FastifyInstance {
	authenticate?: (req: FastifyRequest, reply: FastifyReply) => Promise<void>
}

export const server: Server = fastify({
	// logger: true
});


server.register(fastifyCookie, {
	secret: process.env.COOKIE_SECRET
})

server.register(fastifyJwt, {
	secret: process.env.JWT_SECRET as string
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
server.get('/secret', { onRequest: server.authenticate }, async (request, reply) => {
	reply.send("Hello")
});
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