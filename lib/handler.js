const User = require('../Model/users');

exports.home = (req, res) => {
    
    if(!req.session.isAuth && !req.session.err) return res.render('login');
    if(!req.session.isAuth && req.session.err) return res.render('login', {err: true});

    res.render('home');
}

exports.auth = (req, res, next) => {
    if(req.session.isAuth){
        res.status(300);
        res.redirect('/');
    }else{
        next();
    }
}

exports.signUp = (req, res) => {
    res.render('sign-up');
}

exports.notFound = (req, res) => {
    res.status(404);
    res.render('404');
}

exports.error = (err, req, res, next) => {
    console.error(err);
    res.status(500);
    res.render('500');
}

exports.api = {
    processLogin: async (req, res) => {
        const {userName, password} = req.body;
        const exist = await User.findOne({email: userName});

        if(!exist) req.session.err = true;
        else if(exist.password != password) req.session.err = true;
        else req.session.isAuth = true;

        res.redirect('/');
        res.status(300);
    },

    processSignUp: async (req, res) => {
        const {name, email, password} = req.body;
        const isExist = await User.findOne({email});

        if(isExist){
            res.redirect('/signUp');
            res.status(400);
        }else{
            const user = await User.create({name, email, password});
            req.session.isAuth = true;
            res.redirect('/');
            res.status(300);
        }
    }
}