//? Functions that update the UI and handle communication between user and API.

//* Imports
import * as chatAPI from "/js/api/chatAPI.js";
import * as chatUI from "/js/ui/chatUI.js";

//* Logic functions
async function writePrompt(SYSTEMOPTIONS) {
    const PROMPT = {
        userInput: SYSTEMOPTIONS.inputText,
        promptsChain: [],
        sentiment: null,
        language: null,
        model: SYSTEMOPTIONS.model,
    };

    //* Previous messages being sent to the API
    PROMPT.promptsChain = SYSTEMOPTIONS.enablePromptMemoryChain ? [...SYSTEMOPTIONS.promptsChain] : [];

    //* Call the sentiment analysis function
    if (SYSTEMOPTIONS.enableSentimentAnalysis) {
        try {
            const sentimentData = await sendSentimentAnalysis(userInput);
            PROMPT.sentiment = sentimentData.content.sentiment;
            console.log('Sentiment:', sentiment);
        } catch (error) {
            console.warn('Sentiment analysis failed. Proceeding without it.');
        }
    }

    //* Detect the language of the user input
    if (SYSTEMOPTIONS.enableLanguageDetection) {
        detectLanguage(userInput);
    }
    return PROMPT;
}

export async function parseMessage(reader, decoder) {
    let accumulatedText = '';
    // const firstChunkMap = {};
    let models = [];
    let numberModels;
    
    while (true) {
        const { done, value } = await reader.read();

        //* Check if the message is all sent
        if (done) {
            console.log('Stream complete');
            //* Updates the UI to indicate that the conversation is finished
            chatUI.finalizeMessages(models, numberModels);
            break;
        }


        accumulatedText += decoder.decode(value, { stream: true });

        const lines = accumulatedText.split('\n');

        for (let i = 0; i < lines.length - 1; i++) {
            const line = lines[i].trim();
        
            if (line.startsWith('data:')) {
                const jsonPart = line.slice(5).trim(); // Removes the "data:" prefix and trims whitespace

                if (jsonPart) {
                    try {
                        const data = JSON.parse(jsonPart); // Gets the text after the "data:" and parses it as JSON
                        
                        if (data.info) { //* It is the first chunk (only received once in the stream) so it can also initialize the messages containers.
                            numberModels = data.info.numberModels;
                            for (let i = 0; i < numberModels; i++) {
                                models[i] = data.info.models[i];
                            }

                            //* Initializes the messages containers for each model
                            chatUI.initializeMessages(numberModels, models);
                        }
                        if (data.content) {
                            const model = data.model;
                            chatUI.writeMessage(data.content, model, numberModels);
                        }
                        if (data.stats) {
                            parseStats(data.stats);
                        }
                
                    } catch (err) {
                        console.error('Failed to parse SSE JSON chunk:', err);
                    }
                }
            }
        
            accumulatedText = lines[lines.length - 1]; // Prevents repeating already written chunks of text
        }
    }
}

//* Handlers that communicate with both the API and the UI
export async function handleMessage(SYSTEMOPTIONS){
    try{
        //* Updates the UI
        chatUI.addMessage("Me", SYSTEMOPTIONS.inputText); //* Adds User message
        chatUI.waitingResponse(); //* Adds Halo "..."

        //* Prepares the prompts to be sent to the API.
        const PROMPT = await writePrompt(SYSTEMOPTIONS);

        //* Sends the prompt to the API
        chatAPI.startStream(PROMPT);        
    }
    catch (error) {
        console.error("Error sending message: ", error);
        alert("An error occurred while sending the message. Please try again.");
    }
}

async function speechToText() {
    alert("Voice interaction is not available yet. Please use the text input.");
}

export async function stopConversation() {
    chatAPI.stopStream();
}

export async function clearConversation() {
    chatAPI.startNewConversation();
}

function parseStats(stats) {
    let evalDuration = stats.eval_duration / 1e6; // Convert to seconds
    let loadDuration = stats.load_duration / 1e6; // Convert to seconds
    let promptEvalDuration = stats.prompt_eval_duration / 1e6; // Convert to seconds
    let totalDuration = stats.total_duration / 1e6; // Convert to seconds

    if (evalDuration > 1000) { evalDuration = (evalDuration / 1000).toFixed(2) + " s"; }
    else { evalDuration = evalDuration.toFixed(2) + " ms"; }
    if (loadDuration > 1000) { loadDuration = (loadDuration / 1000).toFixed(2) + " s"; }
    else { loadDuration = loadDuration.toFixed(2) + " ms"; }
    if (promptEvalDuration > 1000) { promptEvalDuration = (promptEvalDuration / 1000).toFixed(2) + " s"; }
    else { promptEvalDuration = promptEvalDuration.toFixed(2) + " ms"; }
    if (totalDuration > 1000) { totalDuration = (totalDuration / 1000).toFixed(2) + " s"; }
    else { totalDuration = totalDuration.toFixed(2) + " ms"; }

    const STATS = {
        Model: stats.model,
        "Created At": new Date(stats.created_at).toLocaleString(), // human readable
        "Prompt Tokens": stats.prompt_eval_count,
        "Prompt Eval Time": promptEvalDuration,
        "Answer Tokens": stats.eval_count,
        "Load Time": loadDuration,
        "Generation Time": evalDuration,
        "Total Time": totalDuration,
    }
    console.table(STATS);
}