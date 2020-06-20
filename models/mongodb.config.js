import mongoose from 'mongoose'

mongoose.connect('mongodb://127.0.0.1:27017/stack-Exchange-data', {
        useUnifiedTopology : true,
        useCreateIndex : true,
        useFindAndModify : true,
        useNewUrlParser : true
    }, err => {
        if(!err){
            return console.log('DataBase Connected');
        }
        console.log(err);
    })