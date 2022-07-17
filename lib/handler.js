exports.home = (req, res) => {
    console.log(req.session);
    if(!req.session.userId){
        req.session.userId = '1222';
        res.render('home');
    }else{
        res.render('500');
    }
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