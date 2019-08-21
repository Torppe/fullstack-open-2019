import React from "react"
import { render, waitForElement, cleanup } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
jest.mock("./services/blogs")
import App from "./App"

let savedItems = {}

const localStorageMock = {
  setItem: (key, item) => {
    savedItems[key] = item
  },
  getItem: (key) => savedItems[key],
  clear: savedItems = {}
}

Object.defineProperty(window, "localStorage", { value: localStorageMock })

const originalError = console.error

beforeAll(() => {
  console.error = (...args) => {
    if (/Warning.*not wrapped in act/.test(args[0])) {
      return
    }
    originalError.call(console, ...args)
  }
})

afterAll(() => {
  console.error = originalError
})

afterEach(cleanup)

describe("<App />", () => {
  let component

  test("if no user logged, blogs are not rendered", async () => {
    component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText("login")
    )

    const blogs = component.container.querySelectorAll(".blog")
    expect(blogs.length).toBe(0)
  })

  test("if user is logged in, blogs are rendered", async () => {
    const user = {
      username: "tester",
      token: "1231231214",
      name: "Donald Tester"
    }

    localStorage.setItem("loggedInUser", JSON.stringify(user))

    component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText("blogs")
    )

    const blogs = component.container.querySelectorAll(".blog")

    expect(component.container).toHaveTextContent("Sensational title")
    expect(component.container).toHaveTextContent("ghjghjgh")
    expect(blogs.length).toBe(4)
  })

})