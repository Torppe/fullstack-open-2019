const notes = [
  {
    author: "Herra Hubert",
    title: "Sensational title",
    url: "www.herrahubertinsivut.com",
    likes: 500,
    user: {
      username: "Hubert69",
      name: "Herra Hubert",
      id: "5d503890e351622e2cdc7610"
    },
    id: "5d46af19b8760f2500a9d698"
  },
  {
    author: "Testi Neiti",
    title: "Sensational title",
    url: "www.neitihubertinsivut.com",
    likes: 12,
    user: {
      username: "Hubert69",
      name: "Herra Hubert",
      id: "5d503890e351622e2cdc7610"
    },
    id: "5d5000f14b814c25dc0049c4"
  },
  {
    author: "author",
    title: "title",
    url: "www.neitihubertinsivut.com",
    likes: 17,
    user: {
      username: "Hubert69",
      name: "Herra Hubert",
      id: "5d503890e351622e2cdc7610"
    },
    id: "5d50435e9f8fe407dc476503"
  },
  {
    author: "jghjghjgh",
    title: "ghjghjgh",
    url: "jghjgj",
    likes: 1,
    user: {
      username: "testiusername",
      name: "Testimies",
      id: "5d5046cac775e310a41a16da"
    },
    id: "5d5c1eeeceb4b72138142914"
  }
]

let token = null

const setToken = newToken => {
  token = `bearer ${newToken}`
}

const getAll = () => {
  return Promise.resolve(notes)
}

export default { getAll, setToken, token }