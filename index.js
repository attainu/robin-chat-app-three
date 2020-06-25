require('dotenv').config()

import path from 'path'
import http from 'http'
import express from 'express'
import cookieParser from 'cookie-parser'
import './models/mongodb.config'
import userAuth from './routes/user.auth.routes'
import userWorkspace from './routes/workspace.route'
import userWebsocketes from './routes/websockets.route'
import runWebsocket from './websocket/runWebsocket'
import morgan from 'morgan'
import nocache from 'nocache'

const app = express();
const server = http.createServer(app)

app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended : false }))
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname,'public'), {index: '_'}))
app.use(morgan('dev'))

app.use(nocache())

app.use('/',userAuth)
app.use('/user', userWorkspace)
app.use('/user', userWebsocketes)

app.use('/', (req, res, next) => {
    res.status(404).send('Page Not Found')
})

runWebsocket(server)

server.listen(3000, () => {
    console.log('http://127.0.0.1:3000');
})