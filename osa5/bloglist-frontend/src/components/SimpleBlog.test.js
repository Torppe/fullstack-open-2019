import React from "react"
import "@testing-library/jest-dom/extend-expect"
import { render, cleanup, fireEvent } from "@testing-library/react"
import SimpleBlog from "./SimpleBlog"

afterEach(cleanup)

test("renders content", () => {
  const simpleBlog = {
    title: "Component testing is done with react-testing-library",
    author: "Pelle Hermanni",
    likes: 5
  }

  const component = render(
    <SimpleBlog blog={simpleBlog} />
  )

  expect(component.container).toHaveTextContent(
    simpleBlog.title
  )

  const div = component.container.querySelector(".simpleBlog")
  expect(div).toHaveTextContent(
    simpleBlog.author
  )
  expect(div).toHaveTextContent(
    simpleBlog.likes
  )
})

test("event handler gets called twice on double click", async () => {
  const simpleBlog = {
    title: "Component testing is done with react-testing-library2",
    author: "Pelle Hermanni2",
    likes: 10
  }

  const mockHandler = jest.fn()

  const { getByText } = render(
    <SimpleBlog blog={simpleBlog} onClick={mockHandler} />
  )

  const button = getByText("like")
  fireEvent.click(button)
  fireEvent.click(button)

  expect(mockHandler.mock.calls.length).toBe(2)
})