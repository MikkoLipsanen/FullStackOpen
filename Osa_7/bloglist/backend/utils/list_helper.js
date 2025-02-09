const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const sum = blogs.map((item) => item.likes).reduce((a, b) => a + b, 0)
    return sum
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    const maxLikes = Math.max(...blogs.map((item) => item.likes))
    const item = blogs.filter((blog) => blog.likes === maxLikes)[0]
    delete item.url
    delete item._id
    delete item.__v
    return item
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    const authorArray = blogs.map((item) => item.author)

    let counts = {}
    let maxCount = 0
    let authorWithMostBlogs = null

    for (let auth of authorArray) {
        counts[auth] = (counts[auth] || 0) + 1

        if (counts[auth] > maxCount) {
            maxCount = counts[auth]
            authorWithMostBlogs = auth
        }
    }

    const item = {
        author: authorWithMostBlogs,
        blogs: counts[authorWithMostBlogs],
    }
    return item
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return null
    }

    const authorArray = blogs.map((item) => item.author)

    let counts = {}
    let maxCount = 0
    let authorWithMostLikes = null

    for (let blog of blogs) {
        counts[blog.author] = (counts[blog.author] || 0) + blog.likes

        if (counts[blog.author] > maxCount) {
            maxCount = counts[blog.author]
            authorWithMostLikes = blog.author
        }
    }

    const item = {
        author: authorWithMostLikes,
        likes: counts[authorWithMostLikes],
    }
    return item
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
}
