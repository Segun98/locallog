const sgMail = require('@sendgrid/mail')

export default async function(req, res) {
  sgMail.setApiKey(process.env.SEND_GRID_KEY)

  const { email, title, link, author } = req.body

  const content = {
    to: email,
    from: "4topsports@gmail.com",
    subject: "Post Successfully published",
    text: `Hello ${author}, 
    
    Your Post has been successfully published on Locallog!

    Title: ${title}
    Link: https://locallog.now.sh/post/${link}

    Reply directly under this email for further assistance on your post

    Thank you for using Locallog, keep writing!
    `,
  }

  try {
    await sgMail.send(content)
    res.status(200).send('Message sent successfully.')
  } catch (error) {
    console.log('ERROR', error)
    res.status(400).send('Message not sent.')
  }

}