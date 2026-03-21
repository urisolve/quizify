const INTERACTIONS = { //* Different types of interactions available in the interaction button
    send: "send",
    voice: "voice",
    stop: "stop"
};

//* 
export const SYSTEMOPTIONS = { //* Relevant information to prepare the prompt for the Halo Assistant
    //* System 
    inputText: "",
    promptsChain: [],
    model: null,
    interaction: INTERACTIONS.voice,
    messageWritting: false,
    //* Settings
    enableSTT: null,
    enableTTS: null,
    enableSentimentAnalysis: null,
    enableLanguageDetection: null,
    enablePromptMemoryChain: null 
};