const { User } = require('../models');
const { verifyToken } = require('../helpers/jwt')

async function authentication(req, res, next) {
    const { token } = req.headers;
    try {
        if(!token) throw { msg : 'authentication failed', status: 401 }
        else {
            const decoded = verifyToken(token);
            const user = await User.findOne({ 
                where : { 
                    email : decoded.email 
                } 
            })

            if(!user) throw { msg : 'authentication failed', status: 401 }
            else {
                req.loggedInUser = decoded;
                next();
            }
        }
    } catch (err) {
        const status = err.status || 500;
        const msg = err.msg || 'internal server error';
        res.status(status).json({ error : msg })
    }
}

module.exports = authentication;