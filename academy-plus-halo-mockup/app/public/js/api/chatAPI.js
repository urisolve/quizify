//? Handles communication with the Chat API, requests received from public/js/pages/chat.js

// import { updateUI } from '/js/logic/chatLogic.js';
import * as chatLogic from '/js/logic/chatLogic.js';

//* Complementary functions
//TODO: Provavelmente esta função já foi simplificada pela updateSystemOptions e o writePrompt mas acho que ainda tem alguns pontos a passar para a updateSystemOptions
function updateConversationInsights(processing = false, securityCheck, languageDetection, sentimentAnalysis, conversationLength, conversationDuration, topics) {
//TODO Perceber esta função.
    // const elementIds = {
    //     'securityCheck': 'security-check-result',
    //     'languageDetection': 'language-detection-result',
    //     'sentimentAnalysis': 'sentiment-analysis-result',
    //     'conversationLength': 'conversation-length-result',
    //     'conversationDuration': 'conversation-duration-result',
    //     'topicsDetection': 'topics-tags-result'
    // };

    // // Set all in Processing state
    // if (processing) {
    //     getTranslations(['ConversationInsights.ProcessingMessage'], namespace = 'chat').then(translations => {

    //         // For each variable in systemOptions, check if it is enabled
    //         // If enabled, display processing
    //         // else, display Deactivated "DeactivatedMessage"
    //         Object.keys(elementIds).forEach(option => {
    //             let element = elementIds[option];
    //             console.log(element);
    //             if (systemOptions[option]) {
    //                 document.getElementById(element).innerHTML = translations['ConversationInsights.ProcessingMessage'];
    //             } else {
    //                 getTranslations(['ConversationInsights.DeactivatedMessage'], namespace
    //                     = 'chat').then(translations => {
    //                         document.getElementById(element).innerHTML = translations['ConversationInsights.DeactivatedMessage'];
    //                     });
    //             }
    //         });
    //     }
    //     );
    //     return;
    // }

    if (promptsChain.length > 0) {
        const firstTimestamp = new Date(promptsChain[0].timestamp);
        const lastTimestamp = new Date(promptsChain[promptsChain.length - 1].timestamp);
        const durationMs = lastTimestamp - firstTimestamp;
        const duration = formatDuration(durationMs * 1000000); // Convert to nanoseconds
        const length = promptsChain.length;

        //TODO: Porque é necessário ter isto?
        document.getElementById('conversation-length-result').innerText = length;
        document.getElementById('conversation-duration-result').innerText = duration;
    } else {
        document.getElementById('conversation-length-result').innerText = 'N/A';
        document.getElementById('conversation-duration-result').innerText = 'N/A';
    }

}

export async function startStream(PROMPT) {
/* //! OUTDATED, UPDATE!
    const userPrompt = isMarkdownEnabled ? marked.parse(input.value) : input.value;
    const chatWindow = document.getElementById('chat-window');
    const userMessage = document.createElement('div');

    if (systemOptions.promptMemoryChain == true) {
        promptsChain.push({ role: 'user', content: userInput, timestamp: new Date() });
    }
    const prompt = input.value;
    input.value = ''; // Clear input field

    const assistantMessage = document.createElement('div');
    assistantMessage.innerHTML = `<strong>Halo Assistant:</strong> <span id="thinking">Thinking...</span>`;
    chatWindow.appendChild(assistantMessage);
    MathJax.typesetPromise([chatWindow]) // MathJax: Retypeset new content
        .catch(function (error) {
            console.error('MathJax typesetPromise failed: ', error);
        });
    scrollToBottom();

    let messages = [];
    console.log('systemOptions:', systemOptions.promptMemoryChain);
    if (systemOptions.promptMemoryChain == true) {
        // Empty if if (systemOptions.promptMemoryChain) is false
        messages = promptsChain;
    }
*/
    fetch('/api/chat/stream', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            PROMPT: PROMPT
        })
    })
        .then(response => {
            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            chatLogic.parseMessage(reader, decoder);
        })
        .catch(error => {
            console.error('Error:', error);
            //TODO: Handle error in the UI, writes (an error as ocurred with Halo Assistant) in the chat message. 
        });
}

//* Handle API calls functions

export async function stopStream() {
    fetch('/api/chat/stop', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (response.ok) {
                console.log('Stream stopped successfully.');
            } else {
                console.error('Failed to stop stream.');
            }
        })
        .catch(error => {
            console.error('Error stopping stream:', error);
        });
}

export async function startNewConversation() {
    fetch('/api/chat/reset', { method: 'POST' })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to reset conversation.');
            }
            console.log('Conversation reset successfully.');
        })
        .catch(error => {
            console.error('Error resetting conversation:', error);
        });

    // updateConversationInsights(false);

}

function sendSentimentAnalysis(text) {
    return fetch('/api/chat/sentiment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: text })
    })
    .then(response => {
        console.log('SENDMESSAGE: Response from sentiment API:', response);
        if (response.ok) return response.json();
        throw new Error('Sentiment API response was not ok.');
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
        throw error;  // Re-throw to handle it in subsequent calls
    });
}

async function detectLanguage(text) {
    const languageMap = {
        bg: 'Bulgarian',
        cs: 'Czech',
        da: 'Danish',
        de: 'German',
        el: 'Greek',
        en: 'English',
        es: 'Spanish',
        et: 'Estonian',
        fi: 'Finnish',
        fr: 'French',
        hu: 'Hungarian',
        it: 'Italian',
        lt: 'Lithuanian',
        lv: 'Latvian',
        nl: 'Dutch',
        pl: 'Polish',
        pt: 'Portuguese',
        ro: 'Romanian',
        sk: 'Slovak',
        sl: 'Slovene',
        sv: 'Swedish'
    };
    try {
        console.log('Detecting language:', text);
        const response = await fetch('/language-detector/predict', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: text })
        });
        const result = await response.json();
        const language = result.language;
        const confidence = result.confidence;
        console.log('Language detected:', language, 'Confidence:', confidence);

        const CONFIDENCE_THRESHOLD = 0.75; // Confidence threshold for certainty
        const confidencePercent = (confidence * 100).toFixed(2);
        if (confidence < CONFIDENCE_THRESHOLD) language = 'zz'; // Set to unknown language if below threshold

        // Get the translation for the language name with the helper function "getTranslations"
        // In namespace chat, ConversationInsights.Language.Code
        const key = `ConversationInsights.Language.${language}`;
        const languageFullName = await getTranslations([key], namespace = 'chat');

        const displayText = `${languageFullName[key]} (${confidencePercent}%)`;


        //TODO: Again, why there is the need to have multiple ids to display some text which is not the one to be displayed?
        // document.getElementById('language-detection-result').innerText = displayText;
        console.log('Language detected:', displayText);

        return { language, confidence, displayText };
    } catch (error) {
        console.error('Error detecting language:', error);
        // Show an error in the processing
        // namespace chat, ConversationInsights.ProcessingErrorMessage
        // const errorMessage = await getTranslations(['ConversationInsights.ProcessingErrorMessage'], namespace = 'chat');
        // document.getElementById('language-detection-result').innerText = errorMessage['ConversationInsights.ProcessingErrorMessage'];
    }
}