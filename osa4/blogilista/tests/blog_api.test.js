const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")
const User = require("../models/user")
const helper = require("./test_helper")

const initialBlogs  = [
  {
    author:"Testi Herra",
    title:"Sensational title",
    url:"www.herrahubertinsivut.com",
    likes: 5
  },
  {
    author:"Testi Neiti",
    title:"Sensational title",
    url:"www.neitihubertinsivut.com",
    likes: 2
  },
  {
    author:"Testi Keissi",
    title:"Sensational title",
    url:"www.neitihubertinsivut.com",
    likes: 2
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[2])
  await blogObject.save()
})

describe("GET blogs", () => {
  const path = "/api/blogs"

  test("blogs are returned as json", async () => {
    await api
      .get(path)
      .expect(200)
      .expect("Content-Type", /application\/json/)
  })

  test("return 3 blogs", async () => {
    const response = await api.get(path)

    expect(response.body.length).toBe(initialBlogs.length)
  })

  test("field is called id instead of _id", async () => {
    const response = await api.get(path)
    expect(response.body[0].id).toBeDefined()
  })
})

describe("POST blogs", () => {
  const path = "/api/blogs"

  test("a new blog is added", async () => {
    const newBlog = {
      author: "Post Testi",
      title: "Sensational title",
      url: "www.blabalbalbabl.com",
      likes: 4
    }
    await api
      .post(path)
      .send(newBlog)
      .expect(201)
      .expect("Content-Type", /application\/json/)

    const response = await api.get(path)

    const results = response.body.map(b => ({
      author: b.author,
      title: b.title,
      url: b.url,
      likes: b.likes
    }))

    expect(response.body.length).toBe(initialBlogs.length + 1)
    expect(results).toContainEqual(newBlog)
  })

  test("if likes not passed default to 0", async () => {
    const newBlog = {
      author: "testi2",
      title: "testi title 2",
      url: "testi url 2"
    }
    const response = await api
      .post(path)
      .send(newBlog)
    expect(response.body.likes).toBe(0)
  })

  test("respond with status 400 if title or url is missing", async () => {
    let newBlog = {
      author: "testi3",
      title: "testi title 3"
    }

    const response = await api
      .post(path)
      .send(newBlog)
      .expect(400)

    newBlog = {
      author: "testi4",
      url: "testi url4"
    }

    await api
      .post(path)
      .send(newBlog)
      .expect(400)

    newBlog = {
      author: "testi4"
    }

    await api
      .post(path)
      .send(newBlog)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})