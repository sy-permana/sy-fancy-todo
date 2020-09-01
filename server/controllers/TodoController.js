const { Todo } = require('../models');

class TodoController {
    static readAll(req, res) {
        Todo.findAll()
            .then(data => {
                res.status(200).json({ todos : data })
            })
            .catch(err => {
                let error = err.errors ? err.errors[0].message : 'internal server error';
                res.status(500).json({ error })
            })
    }
    static create(req, res){
        const { title, description, status, due_date } = req.body;
        Todo.create({
            title,
            description,
            status,
            due_date
        })
            .then(data => {
                res.status(201).json({ 
                    msg : 'creating new Todo success',
                    todo : data 
                })
            })
            .catch(err => {
                let error = err;
                res.status(500).json({ error })
            }) 
    }
    static update(req, res) {
        const { id } = req.params;
        const { title, description, status, due_date } = req.body;
        Todo.findByPk(id)
            .then(data => {
                data.title = title;
                data.description = description;
                data.status = status;
                data.due_date = due_date;
                data.save()
                res.status(200).json({
                    msg : `update todo with id ${id} success`,
                    todo : data
                })
            })
            .catch(err => {
                let error = err
                res.status(500).json({ error })
            })
    }
    static destroy(req, res) {
        let { id } = req.params;
        Todo.findByPk(id)
            .then(data => {
                if(!data) throw { msg : 'todo not found'}
                else {
                    data.destroy()
                    res.status(200).json({
                        msg : 'success delete',
                        todo : data
                    })
                }
            })
            .catch(err => {
                let error = err
                res.status(500).json({ error })
            })
    }
}

module.exports = TodoController;