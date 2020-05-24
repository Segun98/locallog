const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const multer = require('multer')
const cloudinary = require('cloudinary').v2

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET
});

dotenv.config()

const connectDB = require('./db')

const PORT = process.env.PORT || 8080
connectDB()

var corsOptions = {
  origin: 'https://locallog.now.sh',
  credentials: true // <-- REQUIRED backend setting
};
//'https://locallog.now.sh'
// 'http://localhost:3000'

app.use(cors(corsOptions));

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().split(':')[0] + file.originalname)
  }
})
const upload = multer({
  storage: storage
})

app.post('/upload', upload.single('file'), (req, res) => {
  const data = {
    image: req.file.path,
  }
  cloudinary.uploader.upload(data.image)
    .then(result => {
      res.send(result.url)
    })
    .catch(err => res.send(err))
});

app.use('/graphql', cors(corsOptions), graphqlHTTP({
  graphiql: false,
  schema
}))

app.listen(PORT, () => console.log(`server running on Port ${PORT}`))