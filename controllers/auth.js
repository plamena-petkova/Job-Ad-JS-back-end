const { register, login } = require('../services/user');
const mapErrors = require('../util/mappers');

const router = require('express').Router();

router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    try {
        if(req.body.password.trim() == '') {
            throw new Error('Passwords is required!');
        }
        if(req.body.password != req.body.repass) {
            throw new Error('Passwords don\'t match!');
    }
   const user = await register(req.body.email,req.body.password, req.body.description);
   req.session.user = user;
   res.redirect('/'); 
} catch(err) {
    console.error(err); 
    const errors = mapErrors(err);
    res.render('register', {data: {email: req.body.email, description: req.body.description}, errors});
}

});

router.get('/login', (req, res) => {
    res.render('login');
});



router.post('/login', async (req, res) => {
    try {
        const user = await login(req.body.email, req.body.password)
        req.session.user = user;
        res.redirect('/'); 
    } catch(err) {
        console.log(err);
        const errors = mapErrors(err);
        res.render('login', { data: {email: req.body.email}, errors});
    }

});

router.get('/logout', (req, res) => {
    delete req.session.user;
    res.redirect('/');
});



module.exports = router;