import nodemailer from 'nodemailer'

export const sendInvitation = (workspace, emailsArr) => {
    const output = 
        `<h2>Stack-Exchange</h2>
        <p>This is the invitation to join ${workspace} workspace</p>
        <p>click below link to create your Stack-Exchange Account and join your team</p>
        <a href="http://127.0.0.1:3000"></a>
        <h5>Note : Join with this Email id only</h5>`

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'stackexchange2020@gmail.com', // generated ethereal user
            pass: '8007045011'  // generated ethereal password
        },
        tls:{
        rejectUnauthorized:false
        }
    })

    let recipients = ''

    for (let index = 0; index < emailsArr.length; index++) {
        recipients = recipients + emailsArr[index] + ','
    }

    let mailOptions = {
        from: 'Stack-Exchange', // sender address
        to: `${recipients}`, // list of receivers
        subject: 'Joining invitation', // Subject line
        html: output // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);   
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
}