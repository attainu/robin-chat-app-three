import userModel from '../models/user.model'

class User {

    home(req, res, next) {
        res.status(200).sendFile('index.html', { root: '\public' })
    }

    async signup(req, res, next) {
        const user = new userModel(req.body)
        const token = await user.genrateAuthToken()
        // req.header.Authorization = `Bearer ${token}`
        res.cookie('auth', token, { maxage : 21600000})
        try {
            await user.save()
            res.status(201).redirect('/landing')
        } catch (error) {
            if(error.name === 'MongoError' && error.code === 11000){
                return res.status(500).render('Error', { message : ['Email already register'], 
                            action : '/', btn : 'Try Again'})
            }
            res.status(500).send(error)
        }
    }

    async signin(req, res, next) {
        try {
            const user = await userModel.findByCredentials(req.body.Email, req.body.Password)
            const token = await user.genrateAuthToken()
            // req.header.Authorization = `Bearer ${token}`
            res.cookie('auth', token, { maxage : 21600000})
            res.status(200).redirect('/dashboard')
        } catch (error) {
            res.status(500).render('Error', { message : 'Invalid Credentials !!', action : "/", btn : "Try Again"})
        }
    }

    async logout(req, res, next){
        try {
            // req.header.Authorization = null
            res.clearCookie("auth")
            res.status(200).redirect('/')
        } catch (error) {
            res.status(500).send(error)
        }
    }

    landing(req, res, next) {
        res.status(200).sendFile('landing_page.html', { root: '\public' })
    }

    async dashboard(req, res, next){
        try {
            const user = await userModel.findOne({ _id : req.user._id}).populate('Workspaces.workspace')
            res.status(200).render('dashboard', 
            { Err : null ,User: req.user.Username ,Workspaces : user.Workspaces })
        } catch (error) {
            res.status(500).send(error)
        }
    }
}

module.exports = new User