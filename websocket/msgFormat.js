import moment from 'moment'

function msgFormat(Username,Text) {
    return{
        Username,
        Text,
        Time : moment().format('h:mm a')
    }
}

module.exports = { msgFormat }