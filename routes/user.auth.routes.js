import express from 'express'
import user from '../controllers/user.controller'
import auth from '../utils/auth'
import isAlreadyAuth from '../utils/isAlreadyAuth'
import { signup, signin } from '../utils/field.validation'

const Router = express.Router()

Router.get('/', isAlreadyAuth, user.home)

Router.post('/signup', signup, user.signup)

Router.post('/signin', signin, user.signin)

Router.get('/landing', auth, user.landing)

Router.get('/logout', auth, user.logout)

Router.get('/dashboard', auth, user.dashboard)

module.exports = Router