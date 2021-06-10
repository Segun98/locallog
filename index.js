const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const cloudinary = require("cloudinary").v2;
const { multerUploads, dataUri } = require("./multer");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

dotenv.config();

const connectDB = require("./db");

const PORT = process.env.PORT || 8080;
connectDB();

var corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
//'https://locallog.now.sh'
// 'http://localhost:3000'

app.use(cors(corsOptions));

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

app.post("/upload", multerUploads, (req, res) => {
  const file = dataUri(req).content;

  const data = {
    image: file,
  };
  cloudinary.uploader
    .upload(data.image)
    .then((result) => {
      res.send(result.url);
    })
    .catch((err) => res.send(err));
});

app.use(
  "/graphql",
  cors(corsOptions),
  graphqlHTTP({
    graphiql: false,
    schema,
  })
);

app.listen(PORT, () => console.log(`server running on Port ${PORT}`));
