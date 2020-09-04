const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

class UserController {
    static async signUp(req, res, next) {
        try {
            const { email, password } = req.body;
            let user = await User.create({ email, password });
                res.status(201).json({
                    msg : 'sign up success',
                    user : {
                        id : user.id,
                        email : user.email
                    }
                })
        } catch (err) {
            next(err)
        }
    }

    static async signIn(req, res, next) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({
                where : {
                    email
                }
            })
            if(!user) throw { name : 'INVALID_SIGNIN' }
            const comparePass = comparePassword(password, user.password);
            if(!comparePass) throw { name : 'INVALID_SIGNIN' }
            const payload = {
                id : user.id,
                email : user.email
            }
            const token = generateToken(payload);
            res.status(200).json({ access_token : token })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }
}

module.exports = UserController;