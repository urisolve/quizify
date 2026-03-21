//? Speech to Text API Controller

//* Modules Required
const dotenv = require('dotenv');
const fetch = require('node-fetch');

//* Environmental variables
dotenv.config();
const sttApiUrl = process.env.STT_API_URL;
const sttApiPort = process.env.STT_API_PORT;

//* Variables
const sttHost = `${sttApiUrl}:${sttApiPort}`
const sttApi = sttHost + '/stt';

exports.transcribe = async (req, res) => {
    const { audio } = req.body;
    console.log('Transcribing...');
    try {
        const response = await fetch(sttApi, {
            method: 'POST',
            body: audio,
            headers: {
                ...req.headers,
                'host': sttHost
            }
        });

        const result = await response.json();
        console.log('Transcription result:', result);
        res.json(result);
    } catch (error) {
        console.error('Error transcribing:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}