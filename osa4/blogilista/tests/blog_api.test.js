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


afterAll(() => {
  mongoose.connection.close()
})