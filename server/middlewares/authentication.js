const { User } = require('../models');
const { verifyToken } = require('../helpers/jwt')

async function authentication(req, res, next) {
    const { token } = req.headers;
    try {
        if(!token) throw { name : 'AUTHENTICATION_FAILED' }
        else {
            const decoded = verifyToken(token);
            const user = await User.findOne({ 
                where : { 
                    email : decoded.email 
                } 
            })

            if(!user) throw { name : 'AUTHENTICATION_FAILED' }
            else {
                req.loggedInUser = decoded;
                next();
            }
        }
    } catch (err) {
        next(err)
    }
}

module.exports = authentication;