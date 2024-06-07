const fs = require("fs");


async function query(data) {
    console.log(JSON.stringify(data));
	const response = await fetch(
		"https://api-inference.huggingface.co/models/Corcelio/mobius",
		{
			headers: { Authorization: "Bearer" },
			method: "POST",
			body: JSON.stringify(data),
		}
	);
    console.log(response.status);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
	const result = await response.blob();
	return result;
}

async function main() {

let image = await query({"inputs": "A monkey wearing sequins"}).then((response) => {
    // response is a blob, need it to be ready for writeFileSync
    return response.arrayBuffer();

});

// convert the array buffer to a Buffer
image = Buffer.from(image);


fs.writeFileSync("image2.jpg", image);
}

main();