const mongoose = require("mongoose")
const supertest = require("supertest")
const app = require("../app")
const api = supertest(app)

const User = require("../models/user")
const helper = require("./test_helper")

describe("when there is initially one user at db", () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const user = new User({ username: "root", name: "name", password: "sekret" })
    await user.save()
  })

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: "useri",
      name: "nimi",
      password: "salis",
    }

    await api
      .post("/api/users")
      .send(newUser)
      .expect(200)
      .expect("Content-Type", /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })

  test("invalid password and username returns error", async () => {
    let newUser = {
      username: "us",
      name: "nimi",
      password: "salis"
    }

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)

    newUser = {
      userName: "user",
      name: "nimi",
      password: "sa"
    }

    await api
      .post("/api/users")
      .send(newUser)
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})