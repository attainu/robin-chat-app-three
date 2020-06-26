import { check, validationResult } from 'express-validator'

export const validationResults = (req, res, next) => {
    try {
        validationResult(req).throw()
        if (req.body.Email) {
            req.body.Email = req.body.Email.toLowerCase()
        }
        return next()
    } catch (err) {
        const err_msg = err.mapped()
        let message = []
        for(let idx in err_msg){
            message.push(err_msg[idx].msg)
        }
        res.status(422).render('Error', { message , action : "/", btn : "Try Again"})
    }
}

export const signup = [
    check('Username')
        .exists()
        .withMessage('ERR_MISSING')
        .not()
        .isEmpty()
        .withMessage('ERR_EMPTY'),
    check('Email')
        .exists()
        .withMessage('ERR_MISSING')
        .not()
        .isEmpty()
        .withMessage('ERR_EMPTY')
        .isEmail()
        .withMessage('ERR_NOT_EMAIL'),
    check('Password')
        .exists()
        .withMessage('ERR_MISSING')
        .not()
        .isEmpty()
        .withMessage('ERR_EMPTY')
        .isLength({ min: 7 })
        .withMessage('ERR_PASSWORD_TOO_SHORT_MIN_7'),
    (req, res, next) => {
        validationResults(req, res, next)
    }
]

export const signin = [
    check('Email')
        .exists()
        .withMessage('ERR_MISSING')
        .not()
        .isEmpty()
        .withMessage('ERR_EMPTY')
        .isEmail()
        .withMessage('ERR_NOT_EMAIL'),
    check('Password')
        .exists()
        .withMessage('ERR_MISSING')
        .not()
        .isEmpty()
        .withMessage('ERR_EMPTY')
        .isLength({ min: 7 })
        .withMessage('ERR_PASSWORD_TOO_SHORT_MIN_7'),
    (req, res, next) => {
        validationResults(req, res, next)
    }
]

export const createWorkspace = [
    check('Name')
        .exists()
        .withMessage('ERR_MISSING')
        .not()
        .isEmpty()
        .withMessage('ERR_EMPTY')
        .isLength({ max: 15}),
    check('Discription')
        .exists()
        .withMessage('ERR_MISSING')
        .not()
        .isEmpty()
        .withMessage('ERR_EMPTY'),
    check('ValidEmails')
        .exists()
        .withMessage('ERR_MISSING')
        .not()
        .isEmpty()
        .withMessage('ERR_EMPTY')
        .isEmail()
        .withMessage('ERR_NOT_EMAIL'),
        (req, res, next) => {
            validationResults(req, res, next)
    }
]