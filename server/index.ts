import fastify from 'fastify';

import { testRoute } from './routes/test/test';
import { getImagesRoute } from './routes/image/serveImage';


const server = fastify({
	logger: true
});



server.register(testRoute, {prefix: "test"});
server.register(getImagesRoute, {prefix: "img"});


// Declare a route  
server.get('/', function (request, reply) {  
	reply.send({ hello: 'world' })  
}) 

// Run the server!  
server.listen({ port: 8030 }, function (err, address) {  
	if (err) {  
		server.log.error(err)  
		process.exit(1)  
	}
	
	console.log(`Server is now listening on ${address}`)  
})