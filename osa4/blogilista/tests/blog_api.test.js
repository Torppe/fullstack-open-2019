const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")

const api = supertest(app)
describe("GET blogs", () => {
  const path = "/api/blogs"

  test("blogs are returned as json", async () => {
    await api
      .get(path)
      .expect(200)
      .expect("Content-Type", /application\/json/)
  })

  test("return 2 blogs", async () => {
    const response = await api.get(path)

    expect(response.body.length).toBe(2)
  })
})


afterAll(() => {
  mongoose.connection.close()
})