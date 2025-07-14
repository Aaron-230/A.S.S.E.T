import { GoogleGenAI } from '@google/genai';

const genAI = new GoogleGenAI({apiKey: ""});

function generateResponse(content) {
    response = genAI.models.generateContent({ model: "gemini-1.5-flash", content: content,});
    console.log(response);
}

generateResponse("Hello, how are you?");