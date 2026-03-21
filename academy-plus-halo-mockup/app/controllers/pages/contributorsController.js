// app/controllers/pages/contributorsController.js

const fs = require('fs');
const path = require('path');

module.exports = (req, res, next) => {
  try {
    const contributorsPath = path.join(__dirname, '../../data/contributors.json');
    const rawData = fs.readFileSync(contributorsPath, 'utf8');
    const { contributors } = JSON.parse(rawData);

    const imageBasePath = '/assets/images/contributors/';
    const filesBasePath = '/assets/files/contributors/';

    const contributorsWithAssets = contributors.map((contributor) => ({
      ...contributor,
      photoUrl: `${imageBasePath}${contributor.photo}`,
      contributions: (contributor.contributions || []).map((item) => ({
        ...item,
        fileUrl: `${filesBasePath}${item.file}`
      }))
    }));

    const coordinators = contributorsWithAssets.filter(
      (contributor) => contributor.group === 'Project Coordination'
    );

    const professors = contributorsWithAssets.filter(
      (contributor) => contributor.group === 'Professor Collaborators'
    );

    const contributorEntries = contributorsWithAssets.filter((contributor) => {
      const isDevelopmentContributor = contributor.group === 'Development and Programming';
      const hasContributions = contributor.contributions && contributor.contributions.length > 0;

      return isDevelopmentContributor || hasContributions;
    });

    res.renderPage('contributors', {
      layout: 'main',
      pageTitle: 'Contributors',
      coordinators,
      professors,
      contributors: contributorEntries
    });
  } catch (error) {
    next(error);
  }
};