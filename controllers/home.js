const { getAllJobs, getFirstJobs } = require('../services/job');

const router = require('express').Router();

router.get('/', async (req, res) => {

    const jobs = await getFirstJobs();
    

    res.render('home', {title: 'Home Page', jobs});
});



router.get('/catalog', async (req, res) => {
    const jobs = await getAllJobs();
    res.render('catalog', {title: 'All ads Page', jobs});
});


module.exports = router;