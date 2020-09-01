const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

class UserController {
    static async signUp(req, res) {
        try {
            const { email, password } = req.body;
            let user = await User.create({ email, password });
                res.status(201).json({
                    msg : 'register success',
                    user : {
                        id : user.id,
                        email : user.email
                    }
                })
        } catch (err) {
            res.status(500).json({ error : err })
        }
    }

    static async signIn(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({
                where : {
                    email
                }
            })
            if(!user) throw { msg : 'invalid email or password', status : 400}
            const comparePass = comparePassword(password, user.password);
            if(!comparePass) throw { msg : 'invalid email or password', status : 400}
            const payload = {
                id : user.id,
                email : user.email
            }
            const token = generateToken(payload);
            res.status(200).json({ token })
        } catch (err) {
            const status  = err.status || 500;
            const msg = err.msg || 'Internal server error';
            res.status(status).json({ error : msg });
        }
    }
}

module.exports = UserController;