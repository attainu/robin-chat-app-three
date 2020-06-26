import express from 'express'
import websocket from '../controllers/websocketes.controller'
import auth from '../utils/auth'

const Router = express.Router()

Router.post('/launch/:workspace', auth, websocket.launch)

Router.get('/leave', auth, websocket.leave)

module.exports = Router