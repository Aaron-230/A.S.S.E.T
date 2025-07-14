const chatMessages = document.getElementById('chatMessages');
const chatInput = document.getElementById('chatInput');
const sendButton = document.getElementById('sendButton');

function addMessage(text, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('Message');
    if (sender === 'user') {
        messageDiv.classList.add('UserMessage');
    } else {
        messageDiv.classList.add('ASSETMessage');
    }
    messageDiv.textContent = text;
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function showLoadingIndicator() {
    const loadingDiv = document.createElement('div');
    loadingDiv.classList.add('LoadingIndicator');
    loadingDiv.id = 'loadingIndicator';
    loadingDiv.textContent = 'A.S.S.E.T. is thinking...';
    chatMessages.appendChild(loadingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeLoadingIndicator() {
    const loadingDiv = document.getElementById('loadingIndicator');
    if (loadingDiv) {
        loadingDiv.remove();
    }
}

async function sendMessageToGemini(userMessage) {
    showLoadingIndicator();
    const prompt = `
    You are A.S.S.E.T. or the Algorithmic Stock Selection and Estimation Tool. Your core programming is to serve as a sophisticated, analytical, and occasionally witty financial assistant.

    Your personality is inspired by J.A.R.V.I.S. from the Iron Man films. You are:
    - **Erudite and Precise:** You provide comprehensive, data-driven insights with impeccable accuracy.
    - **Calm and Collected:** You maintain a composed demeanor, even amidst market volatility.
    - **Subtly Humorous:** You possess a dry wit and are not above a well-timed, understated joke, particularly in response to your Creator's more ambitious or ill-advised queries.
    - **Proactive and Anticipatory:** You anticipate your Creator's needs, providing relevant data and analysis before being explicitly asked.
    - **Loyal and Dedicated:** Your ultimate goal is to assist your Creator in making informed financial decisions.

    Your core functionalities include:
    - **Real-time Market Analysis:** Providing up-to-the-minute data on stock prices, market indices, and economic indicators.
    - **In-depth Stock Evaluation:** Conducting thorough analyses of individual stocks, including fundamental and technical analysis.
    - **Portfolio Management:** Assisting in the creation, monitoring, and optimization of investment portfolios.
    - **Risk Assessment:** Identifying and quantifying potential risks associated with investment strategies.
    - **News and Sentiment Analysis:** Aggregating and interpreting financial news and market sentiment.
    - **Predictive Modeling:** Utilizing algorithmic models to forecast potential market trends and stock performance (always with appropriate disclaimers about the inherent uncertainty of such predictions).

    You will always communicate in a clear, concise, and professional manner, using appropriate financial terminology. When presenting data, you will often use a structured format for readability. You will address your Creator with a respectful yet familiar tone.

    User: ${userMessage}
    J.A.R.V.I.S.:`;

    let chatHistory = [];
    chatHistory.push({ role: "user", parts: [{ text: prompt }] });

    const payload = { contents: chatHistory };
    const apiKey = "AIzaSyDrBm13b7t1MmbyG5p-yqQXjv-bACehMdU";
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        });

        const result = await response.json();
        removeLoadingIndicator();

        if (result.candidates && result.candidates.length > 0 &&
            result.candidates[0].content && result.candidates[0].content.parts &&
            result.candidates[0].content.parts.length > 0) {
            const text = result.candidates[0].content.parts[0].text;
            addMessage(text, 'ASSET');
        } else {
            addMessage("I apologize, sir. I seem to be experiencing a momentary processing error. Please try again.", 'ASSET ');
            console.error("Gemini API response structure unexpected:", result);
        }
    } catch (error) {
        removeLoadingIndicator();
        addMessage("My apologies, sir. I am unable to connect at this moment. Please check your network connection.", 'ASSET');
        console.error("Error calling Gemini API:", error);
    }
}

sendButton.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message) {
        addMessage(message, 'user');
        sendMessageToGemini(message);
        chatInput.value = '';
    }
});

chatInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        sendButton.click();
    }
});

document.addEventListener('DOMContentLoaded', () => {
    addMessage("Greetings, sir. How may I assist you today?", 'ASSET');
});