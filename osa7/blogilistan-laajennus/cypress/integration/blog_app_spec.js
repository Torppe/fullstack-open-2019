/* eslint-disable no-undef */
describe("Blogs app", function() {
  beforeEach(function() {
    cy.request("POST", "http://localhost:3003/api/test/reset")
    const user = {
      name: "Testimies",
      username: "testiusername",
      password: "salasana"
    }
    cy.request("POST", "http://localhost:3003/api/users/", user)
    cy.visit("http://localhost:3000")
  })

  it("front page can be opened", function() {
    cy.contains("Log in")
  })

  describe("when logged in", function() {
    beforeEach(function() {
      cy.get("#username")
        .type("testiusername")
      cy.get("#password")
        .type("salasana")
      cy.get("button:first")
        .click()
      cy.contains("Blogs")
    })

    it("name of the user is shown", function() {
      cy.contains("Testimies logged in")
    })

    it("user info can be shown", function() {
      cy.contains("users")
        .click()
      cy.contains("Users")
      cy.contains("name")
      cy.contains("blogs created")
      cy.get("table")
        .contains("Testimies")
        .click()
      cy.contains("added blogs")
    })

    it("a new blog can be created", function() {
      cy.contains("new blog")
        .click()
      cy.get("#title")
        .type("cypress title")
      cy.get("#author")
        .type("cypress author")
      cy.get("#url")
        .type("cypress url")
      cy.get("#create")
        .click()
      cy.contains("cypress title cypress author")
    })

    it("a new blog is added to user info", function() {
      cy.contains("new blog")
        .click()
      cy.get("#title")
        .type("cypress title")
      cy.get("#author")
        .type("cypress author")
      cy.get("#url")
        .type("cypress url")
      cy.get("#create")
        .click()
      cy.contains("cypress title cypress author")
      cy.contains("users")
        .click()
      cy.get("table")
        .contains("td", "1")
      cy.get("table")
        .contains("Testimies")
        .click()
      cy.get("ul")
        .contains("cypress title")
    })

    it("adding a new blog fails if title or url is not set", function() {
      cy.contains("new blog")
        .click()
      cy.get("#author")
        .type("cypress author")
      cy.get("#url")
        .type("cypress url")
      cy.get("#create")
        .click()
      cy.contains("Failed")

      cy.get("#title")
        .type("cypress title")
      cy.get("#url")
        .clear()
      cy.get("#create")
        .click()
      cy.contains("cancel")
      cy.contains("Failed")
    })

    it("a new blog form can be cancelled", function() {
      cy.contains("new blog")
        .click()
      cy.contains("cancel")
        .click()
      cy.contains("new blog")
    })

    it("user can logout", function() {
      cy.contains("logout")
        .click()
      cy.contains("Log in").should(() => {
        expect(localStorage.getItem("loggedInUser")).to.be.null
      })
    })
  })
})