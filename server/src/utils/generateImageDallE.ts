import fs from "fs";
import sharp from "sharp";
import OpenAI from "openai";

const openai = new OpenAI({
  organization: process.env.OPEN_AI_ORG,
  apiKey: process.env.OPEN_AI_KEY
});


export async function generateImageDallE(prompt: string, link: string) {

    const image = await openai.images.generate(
      {
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
        response_format: "b64_json"
      });

    if (image.data[0].b64_json) {

      const buffer = Buffer.from(image.data[0].b64_json, "base64");
      const compressedBuffer = await sharp(buffer).jpeg({ quality: 70 }).toBuffer();
      // compressedBuffer.toString("base64");

      fs.writeFile("./images/"+link + ".jpg", compressedBuffer, function (err) {
        console.log('File created.');
      });
    }
    else{
      throw new Error("could not get image data")
    }

}