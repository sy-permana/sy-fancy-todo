function errorHandler (err, req, res, next) {
    let errors = [];
    let statusCode = 500;
    switch(err.name){
        case 'SequelizeValidationError' :
            statusCode = 400;
            err.errors.forEach(i => errors.push(i.message));
            break;
        case 'JsonWebTokenError' :
            statusCode = 401;
            errors.push('invalid access_token');
            break;
        case 'SequelizeUniqueConstraintError' :
            statusCode = 400;
            err.errors.forEach(i => errors.push(i.message));
            break;
        case 'AUTHENTICATION_FAILED' :
            statusCode = 401;
            errors.push('authentication failed');
            break;
        case 'TODO_NOT_FOUND' : 
            statusCode = 404;
            errors.push('todo not found');
            break;
        case 'AUTHORIZATION_FAILED' : 
            statusCode = 401;
            errors.push('not authorized');
            break;
        case 'INVALID_SIGNIN' : 
            statusCode = 400;
            errors.push('invalid email or password')
            break;
        default :
            console.log(err.name)
            errors.push('internal server error')
    }

    res.status(statusCode).json({ errors })
}

module.exports = errorHandler;