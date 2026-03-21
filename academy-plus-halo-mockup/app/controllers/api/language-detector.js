//? Language Detector Controller

//* Modules Required
const languageDetector = require('../../utils/language-detector');

exports.predict = async (req, res) => {
    const text = req.body.text;
    console.log('Detecting language:', text);

    try {
        const result = await languageDetector.predictLanguage(text);
        console.log('Language detection result:', result);
        res.json(result);
    } catch (error) {
        res.status(500).send('Error making prediction');
    }
}