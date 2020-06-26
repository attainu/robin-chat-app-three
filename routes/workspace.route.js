import express from 'express'
import workspace from '../controllers/workspace.controller'
import auth from '../utils/auth'
import { createWorkspace } from '../utils/field.validation'

const Router = express.Router()

Router.get('/createworkspace', auth, workspace.getForm)

Router.post('/createworkspace', createWorkspace ,auth, workspace.create)

Router.post('/getdashboard', auth, workspace.findAndJoinWorkspace)

module.exports = Router