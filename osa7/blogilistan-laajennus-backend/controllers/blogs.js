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
      savedBlog.populate("user", { username: 1, name: 1 }).execPopulate()
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

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate("user", { username: 1, name: 1 })
  response.json(updatedBlog.toJSON())
})

blogsRouter.post("/:id/comments", async (request, response) => {
  const body = request.body
  const foundBlog = await Blog.findById(request.params.id).populate("user", { username: 1, name: 1 })

  if(!foundBlog) {
    return response.status(400).send({ error: "invalid blog" })
  }

  if(!body.comment) {
    return response.status(400).send({ error: "empty comment" })
  }

  foundBlog.comments = foundBlog.comments.concat(body.comment)
  await foundBlog.save()
  response.status(201).json(foundBlog.toJSON())
})

module.exports = blogsRouter