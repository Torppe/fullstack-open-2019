import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, cleanup, fireEvent } from "@testing-library/react"
import Blog from "./Blog"

afterEach(cleanup)

describe("<Blog />", () => {
  const blog = {
    title: "Component testing is done with react-testing-library",
    author: "Pelle Hermanni",
    likes: 5,
    url: "www.asdasdads.com"
  }

  let component

  beforeEach(() => {
    component = render(
      <Blog blog={blog} />
    )
  })

  test("renders content", () => {
    expect(component.container).toHaveTextContent(
      blog.title
    )
    expect(component.container).toHaveTextContent(
      blog.author
    )
  })

  test("at start more info is not shown", () => {
    const div = component.container.querySelector(".toggleableContent")
    expect(div).toBeNull
  })

  test("more info is shown after a click", () => {
    const clickableDiv = component.container.querySelector(".clickableContent")
    fireEvent.click(clickableDiv)

    const div = component.container.querySelector(".toggleableContent")
    expect(div).not.toBe(null)
  })

})