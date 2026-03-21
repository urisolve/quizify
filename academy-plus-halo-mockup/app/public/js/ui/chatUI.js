//? Handles interaction with the interface from the /chat route

//* Imports
    import { ICONS } from "../utils/icons.js";
    import { SYSTEMOPTIONS } from "../utils/system.js";
    import * as chatLogic from "../logic/chatLogic.js";

//* Global variables
    const HTMLELEMENTS = { //* HTML elements used in this page
        //* Permanent elements
        chatPage: document.querySelector("#chat-page"),
        messagesContainer: document.querySelector(".chat-messages"),
        inputField: document.querySelector("#chat-input"),
        plusButton: document.querySelector("#chat-plus"),
        clearButton: document.querySelector("#chat-clear"),
        interactButton: document.querySelector("#chat-interact"),
        //* Temporary elements
        messageDiv: null, //TODO: Add logic to this
        overlay: null,
        closeButton: null,
        thinkingMessage: null,
        currentAssistantMessage: ""
    };

    const INTERACTIONS = { //* Different types of interactions available in the interaction button
        send: "send",
        voice: "voice",
        stop: "stop"
    };

    // const SYSTEMOPTIONS = { //* Relevant information to prepare the prompt for the Halo Assistant
    //     //* System 
    //     inputText: "",
    //     promptsChain: [],
    //     model: null,
    //     interaction: INTERACTIONS.voice,
    //     messageWritting: false,
    //     //* Settings
    //     enableSTT: null,
    //     enableTTS: null,
    //     enableSentimentAnalysis: null,
    //     enableLanguageDetection: null,
    //     enablePromptMemoryChain: null 
    // };

    const marked = window.marked;

//* Main function that registers all the event listeners for the page, (called by a file in js/pages/ when page is load)
    export async function registerChatUI() {
        //* Checks if the page is the chat page.
        if (!HTMLELEMENTS.chatPage) return;

        //* Event listeners
            HTMLELEMENTS.inputField.addEventListener("input", () => updateInteractionState());
            //* Interactions (buttons and keys pressed)
            HTMLELEMENTS.plusButton.addEventListener("click", () => additionalFeaturesMenu()); //* Clicking on Plus Button
            HTMLELEMENTS.inputField.addEventListener("keydown", (event) => handleInput(event)); //* Pressing Enter key
            HTMLELEMENTS.interactButton.addEventListener("click", () => interactionHandler()); //* Clicking on Mic, Send or Stop Buttons
            HTMLELEMENTS.clearButton.addEventListener("click", () => clearConversationUI()); //* Clicking on Clear Button
    }

//* Functions that reads data from the interface.

    //* Updates the state of interaction the system is in.
    function updateInteractionState() {
        const hasText = HTMLELEMENTS.inputField.value.trim() !== ""; // Check if the input field has text

        SYSTEMOPTIONS.interaction = hasText ? INTERACTIONS.send : INTERACTIONS.voice;
        SYSTEMOPTIONS.interaction = SYSTEMOPTIONS.messageWritting ? INTERACTIONS.stop : SYSTEMOPTIONS.interaction; // If there is a message being written by the assistant then the interaction is stop.

        updateInteractionIcon(); // Update the icon based on the interaction state
    }

    async function updateSystemOptions(addingMessage = false, user, text, timestamp = new Date()) {
        //* Update the system options with all the relevant information to be analysed by the Logic layer.
        
        if (addingMessage) {
            SYSTEMOPTIONS.promptsChain.push({ user, text, timestamp });
        } else {
            SYSTEMOPTIONS.inputText = HTMLELEMENTS.inputField.value.trim();
        }
        document.querySelectorAll('.toggle-button').forEach(button => {
            const optionKey = button.dataset.option; // Get the data-option attribute
            if (optionKey && optionKey in SYSTEMOPTIONS) {
                SYSTEMOPTIONS[optionKey] = button.classList.contains('active'); // Update based on the button's active state
            }
        });
    }

    async function handleInput(event) {
        if (event.key === "Enter" && !event.shiftKey) { 
            event.preventDefault(); // Prevents changing to a new line, to do so use Shift + Enter
            if(SYSTEMOPTIONS.interaction === INTERACTIONS.send) { // Only works if the user wants to send a text message.
               interactionHandler(); // Even though the interaction is already known, the function is called to update the system options and send the message.
            }
        }
    }

//* Functions that update the screen.

    //TODO: Implement the additional features.
    function additionalFeaturesMenu() {
        alert("Additional features are not available yet. Please use the text input.");
    }

    //* Changes the icon of the interaction button depending on the state on the system options.
    function updateInteractionIcon() {
        switch (SYSTEMOPTIONS.interaction) {
            case INTERACTIONS.send:
                HTMLELEMENTS.interactButton.innerHTML = ICONS.send();
                break;
            case INTERACTIONS.voice:
                HTMLELEMENTS.interactButton.innerHTML = ICONS.mic();
                break;
            case INTERACTIONS.stop:
                HTMLELEMENTS.interactButton.innerHTML = ICONS.stop();
                break;
            default:
                HTMLELEMENTS.interactButton.innerHTML = ICONS.mic(); // Default to microphone icon
                break;
        }
    }

    //* Writes a new message to the screen.
    //TODO: Update to be called at the end of writing the message (in order to format the final format and also save the message in the system options).
    export function addMessage(user, text, isMessage = true, useMarkdown = false) {
        //* Creates the div that will contain the message.
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message");

        //* Updates the message depending on the user (Me or HALO).
        if (user === "Me") {
            messageDiv.classList.add("user-message");
            HTMLELEMENTS.inputField.value = ""; // Clear the input field after the user sends the message
        } else {
            messageDiv.classList.add("chat-message");
            if(useMarkdown) {
                text = renderMessage(text);
            }
        }

        //* Adds the message to the screen.
        messageDiv.innerHTML = `${text}`;
        HTMLELEMENTS.messagesContainer.appendChild(messageDiv);
        HTMLELEMENTS.messagesContainer.scrollTop = HTMLELEMENTS.messagesContainer.scrollHeight;

        //* If it is a message (not the waiting state) adds it to the prompt History.
        if(isMessage){
            updateSystemOptions(true, user, text); // Updates the system options with the new message.
        }

        return messageDiv;
    }

    //* Shows a thinking message "..."while waiting for the response from the API.
    export function waitingResponse() {
        //* Changes the state to Stop (updates icon and system options).
        SYSTEMOPTIONS.messageWritting = true;
        updateInteractionState();

        //* Visually presents the thinking message in the screen.
        HTMLELEMENTS.thinkingMessage = addMessage("Halo Assistant", `<span class="dots"></span>`, false);
        HTMLELEMENTS.thinkingMessage.classList.add("thinking");
    }

    function removeThinkingMessage() {
        if (HTMLELEMENTS.thinkingMessage) {
            HTMLELEMENTS.thinkingMessage.remove(); // Removes the thinking message if it exists
        }
    }

    export function initializeMessages(numberModels, models) {
        //* If it is a message from one model just creates a normal message div.
        removeThinkingMessage();
        if(numberModels === 1) {
            const messageDiv = document.createElement("div");
            messageDiv.classList.add("chat-message");
            messageDiv.classList.add("message");
            HTMLELEMENTS.messagesContainer.appendChild(messageDiv); // Append to the messages container
        }
        //* If it is a multi-model message, creates a comparison wrapper to hold all the models answers.
        else {
            const comparisonWrapper = document.createElement("div");
            comparisonWrapper.classList.add("chat-message-comparison");
            comparisonWrapper.dataset.models = numberModels; // Set the number of models in the dataset attribute
            for (let model of models) {
                const modelMessageDiv = document.createElement("div");
                modelMessageDiv.classList.add("chat-message");
                modelMessageDiv.classList.add("message");
                modelMessageDiv.dataset.model = model;
                comparisonWrapper.appendChild(modelMessageDiv);
            }
            HTMLELEMENTS.messagesContainer.appendChild(comparisonWrapper); // Append to the messages container
        }
    }

    export function writeMessage(content, model, numberModels) {
        if (!content || !model) return;
    
        let targetElement;
    
        if (numberModels === 1) {
            // Single model: look for the last message container
            targetElement = document.querySelector(".chat-message:last-child");
        } else {
            // Multi-model: look inside comparison container
            const comparisonWrapper = document.querySelector(".chat-message-comparison:last-child");
            targetElement = comparisonWrapper.querySelector(`[data-model="${model}"]`);
        }
    
        if (!targetElement) {
            console.warn(`⚠️ Could not find or create target message container for model: ${model}`);
            return;
        }
    
        targetElement.innerHTML += content;
    
        if (content.includes('\n\n') || /[.?!…]\s*$/.test(content)) {
            formatAssistantMessage(targetElement);
        }
    
        scrollToBottom();
    }

    function addComparisonButtons(model) {
        const modelContainer = document.querySelector(`[data-model="${model}"]`);
        if (!modelContainer || modelContainer.querySelector(".comparison-buttons")) return;

        const buttons = document.createElement("div");
        buttons.classList.add("comparison-buttons");
    
        const chooseBtn = document.createElement("button");
        chooseBtn.classList.add("choose-button");
        chooseBtn.textContent = "Choose this response";
        chooseBtn.onclick = () => {
            console.log(`✅ Chosen answer from model: ${model}`);
            //* Get the text from the chosen message
            const chosenMessageText = Array.from(modelContainer.childNodes)
                .filter(node => !(node.classList && node.classList.contains("comparison-buttons")))
                .map(node => node.textContent.trim())
                .join(" "); 
            //* Remove the entire wrapper (including all the messages)
            const messages = document.querySelectorAll(".chat-message-comparison");
            messages.forEach(message => message.remove()); // Remove each comparison wrapper
            //* Rewrite the message with the addMessage function.
            addMessage("Halo Assistant", chosenMessageText,  true, false); // Add a message indicating the choice
        };
    
        buttons.appendChild(chooseBtn);
        modelContainer.appendChild(buttons);
    }

    export function finalizeMessages(models = [], numberModels = 1) {
        if (numberModels === 1) {
            const lastMessage = document.querySelector(".chat-message:last-child");
            updateSystemOptions(true, "Halo Assistant", lastMessage);
            HTMLELEMENTS.currentAssistantMessage = null;
        } else {
            for(let model of models) {
                addComparisonButtons(model);
            }
        }
    
        SYSTEMOPTIONS.messageWritting = false;
        updateInteractionState();
    }

    function formatAssistantMessage(assistantMessage) {
        if (!assistantMessage || typeof assistantMessage !== 'object' || !('innerHTML' in assistantMessage)) {
            console.warn("❌ formatAssistantMessage called with invalid argument:", assistantMessage);
            return;
        }
    
        try {
            const text = assistantMessage.innerHTML;
            const html = marked.parse(text);
            const decodedHtml = decodeHtmlEntities(html);
            assistantMessage.innerHTML = decodedHtml;
        } catch (err) {
            console.error("❌ Error formatting assistant message:", err);
        }
    }
    
    function scrollToBottom() {
        HTMLELEMENTS.messagesContainer.scrollTop = HTMLELEMENTS.messagesContainer.scrollHeight;
    }
    
    //* Renders the message to HTML using marked.js
    function renderMessage(text) {
        // Convert text to HTML using marked.js
        const html = marked.parse(text);
        // Decode HTML entities
        const decodedHtml = decodeHtmlEntities(html);
        // Return the decoded HTML
        return decodedHtml;
    }
    
    //* Decodes HTML entities in a string
    function decodeHtmlEntities(text) {
        const textarea = document.createElement("textarea");
        textarea.innerHTML = text;
        return textarea.value;
    }

    function clearConversationUI() {
        // Clear the conversation in the UI
        HTMLELEMENTS.messagesContainer.innerHTML = ""; // Clear all messages
        HTMLELEMENTS.inputField.value = ""; // Clear the input field

        // Clear the prompts chain in the system options
        SYSTEMOPTIONS.promptsChain.length = 0; // Clear the array

        chatLogic.clearConversation(); // Reset the conversation in the logic layer
    }
//* Handlers (communication with the logic layer).

    async function interactionHandler() {
        await updateSystemOptions();
        switch (SYSTEMOPTIONS.interaction) {
            case INTERACTIONS.send:
                chatLogic.handleMessage(SYSTEMOPTIONS); // Send the message
                break;
            case INTERACTIONS.voice:
                chatLogic.speechToText(); // Start voice recognition
                break;
            case INTERACTIONS.stop:
                chatLogic.stopConversation(); // Stops the conversation
                HTMLELEMENTS.thinkingMessage?.remove(); // Removes the thinking message if it exists
                break;
        }
    }