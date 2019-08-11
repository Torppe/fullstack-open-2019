const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)
const Blog = require("../models/blog")


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
  const newBlog = {
    author: "Post Testi",
    title: "Sensational title",
    url: "www.blabalbalbabl.com",
    likes: 4
  }

  test("a new blog is added", async () => {
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
})

afterAll(() => {
  mongoose.connection.close()
})