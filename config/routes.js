const authController = require('../controllers/auth');
const homeController = require('../controllers/home');
const jobController = require('../controllers/job');

module.exports = (app) => {
    app.use(authController);
    app.use(homeController);
    app.use(jobController);


    
    app.get('*', (req, res) => {
        res.render('404', {title: 'Page not found'})
    });
}