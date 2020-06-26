require('dotenv').config()
import nodemailer from 'nodemailer'

export const sendInvitation = (workspace, emailsArr) => {
    const output = 
        `<h2>Stack-Exchange</h2>
        <p>This is the invitation to join <span style="font-weight: bold;">"${workspace}"</span> workspace</p>
        <p>click below link to create your Stack-Exchange Account and join your team</p>
        <p>https://stack-exchange-v1.herokuapp.com/</p>
        <h3>Note : Join with this Email id only</h3>`

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        debug: true,
        port: 587,
        secure: false, 
        auth: {
            user: process.env.SYS_EMAIL, 
            pass: process.env.SYS_EMAIL_PASSWORD
        },
        tls:{
        rejectUnauthorized:false
        }
    })

    let mailOptions = {
        from: 'Stack-Exchange', 
        to: emailsArr.join(), 
        subject: 'Joining invitation', 
        html: output 
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
}