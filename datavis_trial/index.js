/* References: 
https://huggingface.co/spaces/timbrooks/instruct-pix2pix
https://github.com/huggingface/huggingface.js/tree/main/packages/inference

model and code from: 
https://huggingface.co/tasks/image-to-image#fromHistory 
https://huggingface.co/ghoskno/Color-Canny-Controlnet-model
*/

import { HfInference } from '@huggingface/inference'
import * as fs from 'fs'

// Create your Hugging Face Token: https://huggingface.co/settings/tokens
// Set your Hugging Face Token: https://scrimba.com/dashboard#env
// Learn more: https://scrimba.com/links/env-variables
const hf = new HfInference("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")


// HuggingFace.js Inference docs
// https://huggingface.co/docs/huggingface.js/inference/README

const model = "ghoskno/Color-Canny-Controlnet-model"

const oldImageUrl = "https://t3.ftcdn.net/jpg/04/47/57/18/360_F_447571844_zpZWxoIoMD0Qa12Z7AQv3f3pz3tE46gq.jpg"
const oldImageResponse = await fetch(oldImageUrl)
const oldImageBlob = await oldImageResponse.blob()

const prompt = "An image of a young female singer-songwriter with blonde hair. She is smiling broadly, showcasing a joyful and expressive face."

let newImageBlob = null;

 try {
  newImageBlob = await hf.imageToImage({
    model: model,
    inputs: oldImageBlob,
    parameters: {
      prompt: prompt,
      negative_prompt: "A young human female face showing no emotions",
      // Between 0 and 1
      strength: 0.85,
    }
  })

  let buffer = Buffer.from(await newImageBlob.arrayBuffer());
  fs.createWriteStream("out.jpeg").write(buffer);
 } catch(error){
  console.log(error);
 }