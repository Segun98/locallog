const sgMail = require('@sendgrid/mail')

export default async function(req, res) {
  sgMail.setApiKey(process.env.SEND_GRID_KEY)

  const { email, body, subject } = req.body

  const content = {
    to: "4topsports@gmail.com",
    from: email,
    subject,
    text: body,
  }

  try {
    await sgMail.send(content)
    res.status(200).send('Message sent successfully.')
  } catch (error) {
    console.log('ERROR', error)
    res.status(400).send('Message not sent.')
  }

}