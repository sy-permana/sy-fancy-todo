const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

// google require
const {OAuth2Client} = require('google-auth-library');

class UserController {
    static async signUp(req, res, next) {
        try {
            const { email, password } = req.body;
            let user = await User.create({ 
                email : email.toLowerCase(),
                password
            });
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
            res.status(200).json({ 
                access_token : token,
                email : user.email,
                picture : 'https://www.thepeakid.com/wp-content/uploads/2016/03/default-profile-picture-300x300.jpg'
            })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    static async googleSign (req, res, next) {
        try {
            const { id_token } = req.body
            const client = new OAuth2Client(process.env.CLIENT_ID);
            const ticket = await client.verifyIdToken({
                idToken: id_token,
                audience: process.env.CLIENT_ID
            });
            const payload = ticket.getPayload();
            const user = await User.findOne({
                where : {
                    email : payload.email
                }
            })
            if(user) {
                const access_token = generateToken({
                    id : user.id,
                    email : user.email
                })
                res.status(200).json({ 
                    access_token,
                    email : payload.email,
                    picture : payload.picture
                 })
            } else {
                const newUser = await User.create({
                    email : payload.email,
                    password : 'fancytodopassword'
                })
                const access_token = generateToken({
                    id : newUser.id,
                    email : newUser.email
                })
                res.status(200).json({ 
                    access_token,
                    email : payload.email,
                    picture : payload.picture
                })
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController;