const User = require('../Model/users');
const print = require('./console');

const schema = require('./validate');

exports.home = (req, res) => {
    
    if(!req.session.isAuth && !req.session.err) return res.render('login');
    if(!req.session.isAuth && req.session.err) return res.render('login', {err: true});

    res.render('home');
}

exports.loging = (req, res, next) => {
    print.log(Date());
    print.log(req.session);
    next();
}

exports.signUp = (req, res) => {
    if(req.session.isAuth) return res.redirect('/');
    if(req.session.err) return res.render('sign-up', {err: true});
    res.render('sign-up');
}

exports.logout = (req, res) => {
    req.session.isAuth = false;
    res.redirect('/');
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
        const {name, email, password, rePassword} = req.body;

        try{
            await schema.validateAsync({username: name, email, password, rePassword});
            const isExist = await User.findOne({email});
            if(!isExist){
                await User.create({name, password, email});
                req.session.isAuth = true;
            }else{
                console.log('This email is already exist !!');
                res.status(400);
            }
            return res.redirect('/signup')
        }catch(err){
            console.log(err.message);
            res.status(400);
            return res.redirect('/signup');
        }

    }
}