// module.exports = ({ a, b }) => {
//     return a + b;
// };


const fs = require("fs");
require('dotenv').config();

async function query(data) {
	console.log(JSON.stringify(data));
	const response = await fetch(
		"https://api-inference.huggingface.co/models/Corcelio/mobius",
		{
			headers: { Authorization: `Bearer ${process.env.API_KEY}` },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
	console.log(response.status);
	if (!response.ok) {
		// throw new Error(`HTTP error! status: ${response.status}`);
		console.log(`HTTP error! status: ${response.status}`);
	}
	const result = await response.blob();
	return result;
}

module.exports = async function main(prompt) {

	let image = await query({ "inputs": prompt }).then((response) => {
		// response is a blob, need it to be ready for writeFileSync
		return response.arrayBuffer();

	});

	// convert the array buffer to a Buffer
	image = Buffer.from(image);


	fs.writeFileSync(`${prompt}.jpg`, image);
}

// main();