const nodemailer = require('nodemailer');

const sendEmail = async(options)=>{
    
    const transporter = nodemailer.createTransport({
          
            service:'Gmail',
            auth:{
                user:'kranjeet0829@gmail.com',
              pass:'vaglabyvckucetlf',    
            }
    })
    // console.log(options.email);
    const mailOptions= {
        from:'kranjeet0829@gmail.com',
        to: options.email,
        subject: options.subject,
        text: options.message,
    };
    try{
     const result = await transporter.sendMail(mailOptions)
     console.log(result);
    }catch(error){
        console.log("Email send failed with error :",error);
    }
    await transporter.sendMail(mailOptions);
};
module.exports = sendEmail;