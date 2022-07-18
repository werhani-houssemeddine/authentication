const Joi = require('joi');

const schema = Joi.object({

    username: Joi.string()
            .min(5)
            .max(20)
            .required(),
            
    password: Joi.string()
            .min(8).max(20),
    
    rePassword: Joi.ref('password'),
    email: Joi.string().email(),
});

module.exports = schema;