const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const authRoutes = require("./Routes/authRoutes");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
app.use(express.json());
app.enable("trust proxy");
app.use(cors({ origin: '*' }));


const DB = process.env.DATABASE;

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => console.log("connected"));


app.use('/api/auth', authRoutes)

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`server running on ${port}`))