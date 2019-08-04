const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  const total = likes.reduce((a,b) => a + b, 0)
  return total
}

module.exports = {
  dummy,
  totalLikes
}