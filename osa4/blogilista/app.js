const config = require("./utils/config")
const express = require('express')
const bodyParser = require("body-parser")
const app = express()
const cors = require("cors")
const blogsRouter = require("./controllers/blogs")
const mongoose = require("mongoose")

console.log("connecting to mongodb")

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true })
  .then(result => {
    console.log("connected to mongodb")
  })
  .catch(error => {
    console.log("error connecting to mongodb", error.message)
  })

app.use(cors())
app.use(bodyParser.json())
app.use("/api/blogs", blogsRouter)

module.exports = app

