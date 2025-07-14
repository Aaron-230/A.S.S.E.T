import { GoogleGenAI } from 'npm:@google/genai';

const genAI = new GoogleGenAI({apiKey: "AIzaSyDrBm13b7t1MmbyG5p-yqQXjv-bACehMdU"});

async function generateResponse() {
    const response = await genAI.models.generateContent({ 
        model: "gemini-1.5-flash", 
        content: "Explain how AI works in a few words.",
    });

    console.log(response.text);
}

generateResponse();