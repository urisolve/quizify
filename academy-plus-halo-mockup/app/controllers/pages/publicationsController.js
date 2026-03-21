// app/controllers/pages/publicationsController.js

const fs = require('fs');
const path = require('path');

module.exports = (req, res, next) => {
  try {
    const publicationsPath = path.join(__dirname, '../../data/publications.json');
    const fileContent = fs.readFileSync(publicationsPath, 'utf8');
    const years = JSON.parse(fileContent);

    return res.renderPage('publications', {
      layout: 'main',
      pageTitle: 'Publications',
      years
    });
  } catch (error) {
    return next(error);
  }
};