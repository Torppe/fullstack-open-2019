const bcrypt = require("bcryptjs")
const usersRouter = require("express").Router()
const User = require("../models/user")

usersRouter.get("/", async (request, response) => {
  const users = await User
    .find({}).populate("blogs", { title: 1, author: 1, likes: 1, url: 1 })
  response.json(users.map(u => u.toJSON()))
})

usersRouter.post("/", async (request, response, next) => {
  try {
    const body = request.body

    if(!body.password || body.password.length < 3){
      response.status(400).send({ error: "invalid password!" })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash,
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exception) {
    if(exception.name === "ValidationError"){
      return response.status(400).json(exception.message)
    }else {
      next(exception)
    }
  }
})

module.exports = usersRouter