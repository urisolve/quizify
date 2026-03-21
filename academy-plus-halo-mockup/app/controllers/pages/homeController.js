const homeController = (req, res) => {
    res.renderPage('home', {
        layout: 'main',
        pageTitle: 'HALO - AI ENGINEering Education'
    });
};

module.exports = homeController;
