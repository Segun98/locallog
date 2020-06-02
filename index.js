const express = require('express')
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')

dotenv.config()

const connectDB = require('./db')

const PORT = process.env.PORT || 8080
connectDB()

var corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true
};
//'https://locallog.now.sh'
// 'http://localhost:3000'

app.use(cors(corsOptions));

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.use('/graphql', cors(corsOptions), graphqlHTTP({
  graphiql: false,
  schema
}))

app.listen(PORT, () => console.log(`server running on Port ${PORT}`))