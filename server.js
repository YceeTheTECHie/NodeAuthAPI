const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();


const app = express()
app.enable("trust proxy");
app.use(cors({ origin: '*' }));
app.use(bodyParser.json());
const port = "3000"

app.listen(port, () => console.log(`server running on ${port}`))