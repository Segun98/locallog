const sgMail = require('@sendgrid/mail')

export default async function(req, res) {
  sgMail.setApiKey(process.env.SEND_GRID_KEY)

  const { email, title, link, author, edit } = req.body

  const content = {
    to: email,
    from: "4topsports@gmail.com",
    subject: "Post Successfully Published on Locallog",
    html:`<div style="background:lightblue; padding: 20px 0; margin-bottom: 10px" ></div>
    <h3 style="color: rgb(51, 62, 99)">Hello ${author},</h3>
    <h3 style="color: rgb(51, 62, 99)">Your Post, <strong style="color: blue">${title}</strong>, has been successfully published on Locallog!</h3>
    <h3 style="color: rgb(51, 62, 99)">Reply directly under this email for further questions and assistance on this post.</h3>
    <h3 style="color: rgb(51, 62, 99)">Thank you for using <strong style="color: blue">Locallog</strong>, keep writing!</h3>
    <h3 style="color: rgb(51, 62, 99)">To edit your post, follow this <a href="https://locallog.now.sh/edit/${edit}">Link</a></h3>
    <h3 style="color: rgb(51, 62, 99)">Your New Post's Link: <a href="https://locallog.now.sh/post/${link}">Your Post</a></h3>
    <div style="background:lightblue; padding: 20px 0; margin-top: 10px" ></div>`
  }

  try {
    await sgMail.send(content)
    res.status(200).send('Message sent successfully.')
  } catch (error) {
    console.log('ERROR', error)
    res.status(400).send('Message not sent.')
  }

}