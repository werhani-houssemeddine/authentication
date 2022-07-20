const _handler = require('./handler');
const routers = [];

routers.push(
    createRouter('get', '/', _handler.home),
    createRouter('get', '/signup', _handler.signUp),
    createRouter('get', '/logout', _handler.logout),
    createRouter('post', '/api/signup', _handler.api.processSignUp),
    createRouter('post', '/api/login', _handler.api.processLogin),
);

function createRouter(method, path, handler){
    return {method, path, handler}
}

module.exports = routers;