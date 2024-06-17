import { Queue, Worker, Job } from "bullmq";
import { server } from "..";
import { image } from "../models/image";
import { generateLink } from "../utils/generateLink";
import { generateImageDallE } from "../utils/generateImageDallE";
let queue: Queue | null = null;


async function generateImageJob(prompt: string, link:string) {

    try {

        await generateImageDallE(prompt, link);
    }
    catch (error: any) {
        // Rethrow the error so BullMQ knows this job failed
        throw error; 
    }
}

export function getQueue() {

    if (queue != null) {
        return queue
    }

    const options = {
        connection: {
            host: process.env.REDIS_HOST,
            port: parseInt(process.env.REDIS_PORT as string)
        },
        defaultJobOptions: {
            attempts: 3,
            backoff: {
              type: 'exponential',
              delay: 1000,
            },
          },
    }

    const myQueue = new Queue("image-generation", options);

    const imageGenWorker = new Worker("image-generation", async (job) => {
        try {
            job.data.link = generateLink();
            await generateImageJob(job.data.prompt, job.data.link);
        }
        catch (error: any) {
            console.error(`Job ${job.id} failed with error ${error.message}`);
            throw error; // Rethrow the error so BullMQ knows this job failed
        }
    }, options);

    imageGenWorker.on("completed", async job => {
        /*
            link: string;
        */
        const imageData: image = { ...job.data, isDeleted: false, timeGenerated: Date.now()}
        const images = server.mongo.db?.collection('images');
        await images?.insertOne(imageData);

    })

    imageGenWorker.on('failed', (job, err) => {
        console.log(`${job?.id} has failed with ${err.message}`);
    });

    return myQueue;

}