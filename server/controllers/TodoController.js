const { Todo } = require('../models');
const { Op } = require("sequelize");

class TodoController {
    static async readAll(req, res, next) {
        try {
            const userId = req.loggedInUser.id;
            const data = await Todo.findAll({
                order: [
                    ['status', 'ASC']
                ],
                where : {
                    userId
                }
            })
            res.status(200).json({ todos : data})
        } catch (err) {
            next(err)
        }
    }

    static async readOne(req, res, next) {
        try {
            const { id } = req.params
            const userId = req.loggedInUser.id;
            // find one where userid logged in = userid
            const data = await Todo.findOne({
                where : {
                    id,
                    userId
                }
            })
            res.status(200).json({ todo : data})
        } catch (err) {
            next(err)
        }
    }

    static async create(req, res, next){
        try {
            const status = false;
            const userId = req.loggedInUser.id;
            const { title, description, due_date } = req.body;
            const data = await Todo.create({
                title,
                description,
                status,
                due_date,
                userId
            })
            res.status(201).json({ 
                msg : 'creating new Todo success',
                todo : data 
            })
        } catch (err) {
            next(err)
        }
    }

    static async update(req, res, next) {
        try {
            const { id } = req.params;
            const userId = req.loggedInUser.id;
            const { title, description, status, due_date } = req.body;
            const data = await Todo.update({ 
                title,
                description,
                status,
                due_date
             },{
                where : {
                    [Op.and]: [
                        { id },
                        { userId }
                    ]
                },
                returning : true
            });
            res.status(200).json({
                msg : `todo has been updated!`,
                todo : data[1][0]
            })
        } catch (err) {
            next(err);
        }
    }

    static async toggleStatus(req, res, next) {
        try {
            const { id } = req.params;
            const userId = req.loggedInUser.id;
            const { status } = req.body;
            const data = await Todo.update({
                status
            },{ 
                where : {
                    [Op.and]: [
                        { id },
                        { userId }
                    ]
                },
                returning : true
            });
            res.status(200).json({
                msg : `todo has been updated!`,
                todo : data[1][0]
            })
        } catch (err) {
            console.log(err)
            next(err)
        }
    }

    static async destroy(req, res, next) {
        try {
            const { id } = req.params;
            const userId = req.loggedInUser.id;
            const data = await Todo.destroy({
                where : {
                    [Op.and]: [
                        { id },
                        { userId }
                    ]
                }
            })
            res.status(200).json({
                msg : 'success delete'
            })
        } catch (err) {
            console.log(err)
            next(err);
        }
    }
}

module.exports = TodoController;