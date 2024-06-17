async function query(data: { inputs: string }) {
    console.log("data: ", data)

    const response = await fetch(
        "https://api-inference.huggingface.co/models/Corcelio/mobius",
        {
            headers: { Authorization: `Bearer ${process.env.API_KEY}` },
            method: "POST",
            body: JSON.stringify(data.inputs),
        }
    );

    console.log(response.status);
    if (!response.ok) {
        console.log(`HTTP error! status: ${response.status}`);
    }
    const result = await response.blob();
    return { status: response.status, result: result };
}

export async function generateImageMobius(prompt: string, filename: string = "") {

    if(filename == ""){
        filename = prompt;
    }

    let status;

    let image = await query({ "inputs": prompt }).then((response) => {
        // response is a blob, need it to be ready for writeFileSync
        status = response.status;
        return response.result.arrayBuffer();

    });

    if (status !== 200) {
        throw new Error(`Job failed with status ${status}`);
    }
    // convert the array buffer to a Buffer

    image = Buffer.from(image);
    // convert image to string | ArrayBufferView type

    // @ts-ignore
    fs.writeFileSync(`${filename}.jpg`, image);
}
