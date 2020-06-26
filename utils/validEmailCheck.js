
export const check = (EmailArray, user) => {
    if(typeof EmailArray === 'object'){
        return EmailArray = EmailArray.filter( email => {
            return email !== user.Email
        })
    }else{
        return EmailArray = [ EmailArray ]
    }
}