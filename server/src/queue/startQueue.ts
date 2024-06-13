import { Queue, Worker, Job } from "bullmq";
import fs, { stat } from "fs";


async function generateImageJob(prompt: string) {

    async function query(data: { inputs: string }) {

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

    async function main(prompt: string) {

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
        fs.writeFileSync(`${prompt}.jpg`, image);
    }

    try{

        await main(prompt);
    }
    catch (error: any) {
        throw error; // Rethrow the error so BullMQ knows this job failed
    }
}

export function startQueue() {

    const connection = {
        connection: {
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT as string)
        }
    }

    const myQueue = new Queue("image-generation", connection);

    const imageGenWorker = new Worker("image-generation", async (job) => {
        try {

            await generateImageJob(job.data.inputs);
        }
        catch (error: any) {
            console.error(`Job ${job.id} failed with error ${error.message}`);
            throw error; // Rethrow the error so BullMQ knows this job failed
        }
    }, connection);

    imageGenWorker.on("completed", job => {
        console.log(`${job.id} has completed!`);

    })

    imageGenWorker.on('failed', (job, err) => {
        console.log(`${job?.id} has failed with ${err.message}`);
    });

    return myQueue;

}