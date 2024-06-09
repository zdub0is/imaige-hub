import fastify from 'fastify';

import fastifyPiscina from 'fastify-piscina';
const { resolve } = require('path');


import { testRoute } from './routes/test/test';
import { getImagesRoute } from './routes/image/serveImage';
import { generateImagesRoute } from './routes/image/generateImage';


const server = fastify({
	// logger: true
});


server.register(testRoute, { prefix: "test" });
server.register(getImagesRoute, { prefix: "img" });
server.register(generateImagesRoute, { prefix: "generate" });


// Declare a route  
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