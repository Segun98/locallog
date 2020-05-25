const sgMail = require('@sendgrid/mail')

export default async function (req, res) {
  sgMail.setApiKey(process.env.SEND_GRID_KEY)

  const {
    email,
    title,
    link,
    author,
    edit
  } = req.body

  const content = {
    to: email,
    from: "4topsports@gmail.com",
    subject: "Post Successfully Published on Locallog",
    html: `<div style="color: rgb(51, 62, 99)">
    <h3>Hello ${author},</h3>
    <h3>Your Post, <a href="https://locallog.now.sh/post/${link}" style="color: blue">${title}</a>, has been successfully published on Locallog!</h3>
    <h3>Reply directly under this email for further questions and assistance on this post</h3>
    <h3>To edit your post, follow this <a href="https://locallog.now.sh/edit/${edit}">Link</a></h3>
    <h3>Thank you for using <strong style="color: blue">Locallog</strong>, keep writing!</h3>
    </div>`
  }

  try {
    await sgMail.send(content)
    res.status(200).send('Message sent successfully.')
  } catch (error) {
    console.log('ERROR', error)
    res.status(400).send('Message not sent.')
  }

}