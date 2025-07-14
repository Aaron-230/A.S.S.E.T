import { GoogleGenAI } from 'npm:@google/genai';

const genAI = new GoogleGenAI({apiKey: "AIzaSyDrBm13b7t1MmbyG5p-yqQXjv-bACehMdU"});

async function generateResponse(content) {
    const response = genAI.models.generateContent({ model: "gemini-1.5-flash", content: content,});
    console.log(response);
}

generateResponse("Hello, how are you?");