const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  ignoreTLS: false,
  secure: false,
  auth: {
    user: 'microtestmail01@gmail.com',
    pass: 'strongpass123'
  }
})

const sendMail = async ({ to, subject, text }) => {
  const mailOptions = {
    from: 'Holpe',
    to,
    subject,
    text
  }

  try {
    const emailSent = await transporter.sendMail(mailOptions)
    return emailSent
  } catch (err) {
    console.error('[ERROR] - Error to send email', err)
  }
}

module.exports = {
  sendMail
}
