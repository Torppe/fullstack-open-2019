const blogsRouter = require("express").Router()
const Blog = require("../models/blog")
const User = require("../models/user")
const jwt = require("jsonwebtoken")

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog
    .find({}).populate("user", { username: 1, name: 1 })
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post("/", async (request, response, next) => {
  const body = request.body

  if(!body.title || !body.url){
    response.status(400).end()
  } else {
    try{
      const decodedToken = jwt.verify(request.token, process.env.SECRET)
      if(!request.token || !decodedToken.id) {
        return response.status(401).json({ error: "token missing or invalid" })
      }

      const user = await User.findById(decodedToken.id)

      const blog = new Blog({
        author: body.author,
        title: body.title,
        url: body.url,
        likes: body.likes === undefined ? 0 : body.likes,
        user: user._id
      })

      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.status(201).json(savedBlog.toJSON())
    } catch(exception) {
      if(exception.name === "JsonWebTokenError"){
        return response.status(401).json({
          error: "invalid token"
        })
      } else {
        next(exception)
      }
    }
  }
})

blogsRouter.delete("/:id", async (request, response, next) => {
  try {
    const blog = await Blog.findById(request.params.id)
    if(!blog) {
      response.status(401).send({ error: "invalid blog" })
    }

    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    if(!request.token || !decodedToken.id) {
      return response.status(401).json({ error: "token missing or invalid" })
    }
    const userid = decodedToken.id
    if(blog.user.toString() === userid.toString()) {
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    } else {
      response.status(400).send({ error: "user doesn't have permission to remove this blog" })
    }
  } catch (exception) {
    next(exception)
  }

})

blogsRouter.put("/:id", async (request, response) => {
  const body = request.body

  const blog = {
    author: body.author,
    title: body.title,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog.toJSON())
})

module.exports = blogsRouter