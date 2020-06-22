import express from 'express'
import workspace from '../controllers/workspace.controller'
import auth from '../utils/auth'

const Router = express.Router()

Router.get('/createworkspace', auth, workspace.getForm)

Router.post('/createworkspace', auth, workspace.create)

Router.post('/getdashboard', auth, workspace.findAndJoinWorkspace)

module.exports = Router