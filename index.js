require('dotenv').config()

import path from 'path'
import express from 'express'
import './models/mongodb.config'
import userAuth from './routes/user.auth.routes'
import userWorkspace from './routes/workspace.route'
import morgan from 'morgan'
import nocache from 'nocache'

const app = express();

app.set('views', path.join(__dirname,'views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended : false }))
app.use(express.json())
app.use(express.static(path.join(__dirname,'public'), {index: '_'}))
app.use(morgan('dev'))

app.use(nocache())

app.use('/',userAuth)
app.use('/user', userWorkspace)

app.use('/', (req, res, next) => {
    res.status(404).send('Page Not Found')
})

app.listen(3000, () => {
    console.log('http://127.0.0.1:3000');
})