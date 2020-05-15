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
  origin:'https://locallog.now.sh',
  credentials: true // <-- REQUIRED backend setting
};
//'https://locallog.now.sh'
// 'http://localhost:3000'

app.use(cors(corsOptions));
// app.use(express.json())
// app.use(express.urlencoded({
//     extended: false
// }));

app.use('/graphql', cors(corsOptions), graphqlHTTP({
  graphiql: true,
  schema
}))


app.listen(PORT, () => console.log(`server running on Port ${PORT}`))