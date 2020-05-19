const sgMail = require('@sendgrid/mail')

export default async function(req, res) {
  sgMail.setApiKey(process.env.SEND_GRID_KEY)

  const { email, title, link, author, edit } = req.body

  const content = {
    to: email,
    from: "4topsports@gmail.com",
    subject: "Post Successfully Published on Locallog",
    text: `Hello ${author}, 
    
    Your Post, ${title}, has been successfully published on Locallog!

    Reply directly under this email for further questions and assistance on this post.

    Thank you for using Locallog, keep writing!

    TO EDIT YOUR POST, follow this link https://locallog.now.sh/edit/${edit}


    Your New Post's Link: https://locallog.now.sh/post/${link}`
  }

  try {
    await sgMail.send(content)
    res.status(200).send('Message sent successfully.')
  } catch (error) {
    console.log('ERROR', error)
    res.status(400).send('Message not sent.')
  }

}