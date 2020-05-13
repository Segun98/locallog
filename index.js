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
  credentials: true // <-- REQUIRED backend setting
};

app.use(cors(corsOptions));
app.use(express.json())
app.use(express.urlencoded({
    extended: false
}));

app.use('/graphql', cors(corsOptions), graphqlHTTP({
  graphiql: true,
  schema
}))


app.listen(PORT, () => console.log(`server running on Port ${PORT}`))