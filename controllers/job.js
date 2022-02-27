const { isUser, isOwner } = require('../middleware/guards');
const { createJobAd, getJobById, updateJob, deleteById, apply } = require('../services/job');
const mapErrors = require('../util/mappers');
const preload = require('../middleware/preload');

const router = require('express').Router();


router.get('/create', isUser(), (req, res) => {
    res.render('create', {title: 'Create Page'});
});


router.post('/create', isUser(), async (req, res) => {

    const userId = req.session.user._id;

    const job = {
    headline: req.body.headline,
    location: req.body.location,
    companyName: req.body.companyName,
    companyDescription: req.body.companyDescription,
    owner: userId
    };

    try {
        await createJobAd(job);
        res.redirect('/catalog');
    } catch(err) {
        console.error(err);
        const errors = mapErrors(err);
        res.render('create', {title: 'Create Page', errors, data: job});
    }
});


router.get('/details/:id', isUser(), async (req, res) => {

    const id = req.params.id;

    const job = await getJobById(id);

    if(req.session.user) {
        if(req.session.user._id == job.owner._id) {
                job.isAuthor = true;
        }
    }

    if(job.users.some(b => b._id == req.session.user._id)) {
        job.isApplied = true;
    }

    res.render('details', {title: 'Details Page', job});
});


router.get('/edit/:id', preload(), isOwner(), async (req, res) => {

    const id = req.params.id;

    const job = await getJobById(id);

    res.render('edit', {title: 'Edit Job Ad', job});

});

router.post('/edit/:id', preload(), isOwner(), async (req, res) => {
    const id = req.params.id;


    const job = {
        headline : req.body.headline,
        location : req.body.location,
        companyName : req.body.companyName,
        companyDescription : req.body.companyDescription,
    }

  
    try {
        await updateJob(id, job);
        res.redirect('/details/' + id)
    } catch(err) {
        console.error(err);
        const errors = mapErrors(err);
        job._id = id;
        res.render('edit', { title: 'Edit Job Ad', job, errors});
    }
});

router.get('/delete/:id', preload(), isOwner(), async (req, res) => {
    await deleteById(req.params.id);
    res.redirect('/catalog');
});


router.get('/apply/:id', isUser(), async (req, res) => {
    const id = req.params.id;
    try {
        await apply(id, req.session.user._id);
        
        res.redirect('/details/' + id)
    } catch(err) {
        console.error(err);
        res.redirect('/details/' + id)
    }
    
   
});



module.exports = router;