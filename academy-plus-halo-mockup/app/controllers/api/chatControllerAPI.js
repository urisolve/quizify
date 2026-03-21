//? Handles the communication with HALO System.

//* Modules required
const dotenv = require('dotenv');
const { AbortController } = require('abort-controller');
// const { generateChatCompletion, generateChatCompletionComplete, performSentimentAnalysis } = require('../api');

//* Environmental variables
dotenv.config();
// const SPLIT_PROBABILITY = process.env.BOTH_MODELS_PROB;
const SPLIT_PROBABILITY = 0;
const HALO_URL = process.env.HALO_URL || "http://cloud.microlumin.com";
const HALO_PORT = process.env.HALO_PORT || 2020;
const HALO_STREAM = "/chat/stream";
const HALO_STOP = "/chat/stop";
const HALO_API_STREAM = `${HALO_URL}:${HALO_PORT}${HALO_STREAM}`;
const HALO_API_STOP = `${HALO_URL}:${HALO_PORT}${HALO_STOP}`;

//* Global variables
const models = ["base", "nvm-conceptual:latest", "nvm-procedural:latest", "nvm-application:latest", "nvm-evaluation:latest", "nvm-advanced:latest", "nvm-full-v2:latest"];
let modelsFinished = 0; // Indicates the number of models that have finished streaming
let modelsUsed = 0; // Indicate how many models are being used

const controllers = new Map();

async function updateAnswerWithModel(reader, decoder, model, res) {
  let buffer = '';
  while(true){
    const { done, value } = await reader.read();

    //* Evaluates if the stream is finished --- DONE
    if (done) {
      modelsFinished++;
      console.log(`Model ${model} finished streaming`);
      if(modelsFinished == modelsUsed) {
        console.log('Both models finished streaming');
        res.end(); // End the response
      }
      return;
    }

    //* Changes each line to also include the model --- VALUE
    buffer += decoder.decode(value, { stream: true });

    const lines = buffer.split('\n'); // Transform the buffer into an array of lines

    for (let i = 0; i < lines.length - 1; i++) {
      const line = lines[i].trim();

      if (line.startsWith('data:')) {
        const jsonPart = line.slice(5).trim(); // Removes the "data:" prefix and trims whitespace
        if (jsonPart) {
          try {
            const parsed = JSON.parse(jsonPart); // Gets the text after the "data:" and parses it as JSON
            parsed.model = model; // Adds the model name to the parsed object as: 'model: "model_name"'

            const newLine = `data: ${JSON.stringify(parsed)}\n\n`; // Adds back the data for SSE protocol

            res.write(newLine); //Sends the new line to the frontend
          } catch (err) {
            console.error('Failed to parse SSE JSON chunk:', err);
          }
        }
      }

      buffer = lines[lines.length - 1]; // Prevents repeating already written chunks of text
    }
  }
}

async function generateChatCompletionComplete(PROMPT, res, stream, model) {
  //TODO: Tentar arranjar uma forma de não estar sempre a passar de null para base para null etc...
  if (model == models[0]) {
    model = null;
  }
  fetch(HALO_API_STREAM, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt: PROMPT.userInput,
      system: "",
      messages: PROMPT.promptsChain,
      model: model
    })
  })
  .then(response => {
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    if (model == null) {
      model = models[0];
    }
    updateAnswerWithModel(reader, decoder, model, res);
  })
  .catch(error => {
    console.error('Error fetching from HALO_API_STREAM:', error);
    res.end();
  });
}

async function performSentimentAnalysis(prompt) {
  console.log(`Simulating sentiment analysis for: "${prompt}"`);
  return { sentiment: "neutral", confidence: 0.95 }; // Simula um resultado neutro com alta confiança
}

exports.handleChatCompletion = async (req, res) => {
  const { prompt, system = "", messages = [], model = null } = req.body;

  //TODO: Where to implement the probability to use one or two models?
  try {
    await generateChatCompletionComplete(prompt, res, false, system, messages, model);
  } catch (error) {
    console.error('Failed to process the chat completion:', error);
    if (!res.headersSent) {
      res.status(500).send("Failed to get response from Chat API.");
    }
  }
};

exports.handleStream = (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');

  const { PROMPT } = req.body;

  const controller = new AbortController();
  controllers.set(req.sessionID, controller);

  const randomValue = Math.random();
  const maxModels = 3; // Maximum number of models to use
  let selectedModels = [];

  if (randomValue < SPLIT_PROBABILITY) {
    // Use multiple models
    ! selectedModels.push(PROMPT.model || models[0]); // Ensure the first model is the user-selected or default model

    while (selectedModels.length < maxModels) {
        //* Randomly selecting the models.
        // const randomModel = models[Math.floor(Math.random() * models.length)];
        // if (!selectedModels.includes(randomModel)) {
        //     selectedModels.push(randomModel);
        // }
        //* Manually selected models (hardcoded)
        // selectedModels.push("lcm-full:latest"); // Add the first model to the list
        // selectedModels.push("nvm-full-3b:latest"); // Add the second model to the list
        // selectedModels.push("lcm-full-1b:latest"); // Add the third model to the list
    }
  } else {
      selectedModels.push(PROMPT.model || models[0]);
      // selectedModels.push("lcm-full-1b:latest");
  }

  modelsUsed = selectedModels.length;
  modelsFinished = 0; // Reset the flag for all models

  // Send the number of models being used to the client
  res.write(`data: ${JSON.stringify({ info: { numberModels: modelsUsed, models: selectedModels } })}\n\n`);

  // Use a loop to generate responses for all selected models
  for (const model of selectedModels) {
      generateChatCompletionComplete(PROMPT, res, true, model)
          .catch(() => controllers.delete(req.sessionID)); // Handle error and clean up controller
  }
};

exports.stopStream = (req, res) => {
    const controller = controllers.get(req.sessionID);
    console.log('Stopping stream reached');
    console.log('Request session ID:', req.sessionID);

    fetch(HALO_API_STOP, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    if (controller) {
        controller.abort();
        controllers.delete(req.sessionID);
        res.status(200).send("Stream stopped successfully.");
    } else {
        res.status(404).send("No active stream found.");
    }
};

exports.resetConversation = (req, res) => {
  if (req.session) {
    req.session.conversationState = {};
  }
  res.status(200).send("Conversation reset successfully.");
};

exports.analyzeSentiment = async (req, res) => {
  const { prompt } = req.body;
  try {
    const result = await performSentimentAnalysis(prompt);
    res.json({ content: result });
  } catch (error) {
    console.error('Failed to perform sentiment analysis:', error);
    res.status(500).send("Failed to get response from sentiment analysis API.");
  }
};
