import { check, validationResult } from 'express-validator'

export const validationResults = (req, res, next) => {
    try {
        validationResult(req).throw()
        if (req.body.Email) {
            req.body.Email = req.body.Email.toLowerCase()
        }
        return next()
    } catch (err) {
        res.status(422).json({
            errors: err.mapped()
        })
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