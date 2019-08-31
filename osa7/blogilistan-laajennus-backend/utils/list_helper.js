const _ = require("lodash")

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  const total = likes.reduce((a,b) => a + b, 0)
  return total
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current, 0)
}

const mostBlogs = (blogs) => {
  const authors = blogs.map(blog => blog.author)

  const result = _(authors)
    .countBy()
    .entries()
    .maxBy(_.last)

  if(result){
    return {
      author: _.head(result),
      blogs: _.last(result)
    }
  } else {
    return {}
  }

}

const mostLikes = (blogs) => {
  const groupedAuthors = _.groupBy(blogs, "author")
  const authorsByLikes = _.mapValues(groupedAuthors, a => ({
    author: a.find(b => b.author).author,
    likes: _.sumBy(a, "likes")
  }))
  const authorsAndLikes = _.valuesIn(authorsByLikes)
  const mostLikes = _.maxBy(authorsAndLikes, "likes")
  return mostLikes ? mostLikes : {}
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}