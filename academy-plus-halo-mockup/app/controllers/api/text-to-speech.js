//? Text to Speech API Controller

//* Modules Required
const dotenv = require('dotenv');
const axios = require('axios');

//* Environmental variables
dotenv.config();
const ttsApiUrl = process.env.TTS_API_URL;
const ttsApiPort = process.env.TTS_API_PORT;

//* Variables
const ttsApi = `${ttsApiUrl}:${ttsApiPort}/tts`;

exports.speak = async (req, res) => {
    const { text, language, voice } = req.body;
    console.log('Received TTS request:', text, language, voice);

    try {
        const response = await axios.post(ttsApi, {
            text: text,
            language: language,
            voice: voice
        }, {
            responseType: 'arraybuffer'
        });

        res.set('Content-Type', 'audio/mpeg');
        res.send(response.data);
    } catch (error) {
        console.error('Error calling TTS API:', error);
        res.status(500).send('Error generating speech');
    }
}