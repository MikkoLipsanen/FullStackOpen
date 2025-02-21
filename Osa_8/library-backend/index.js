const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const Author = require('./models/author')
const Book = require('./models/book')

require('dotenv').config()

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })


const typeDefs = `
  type Author {
    name: String! 
    id: ID!
    born: Int,
    bookCount: Int
  }

  type Book {
    title: String! 
    published: Int!
    author: Author!
    id: ID!
    genres: [String!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book!,
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }
`

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    allBooks: async (root, args) => {
      if (!args.author && !args.genre) {
        return Book.find({}).populate('author', { name: 1, born: 1, id: 1 })
      }
      if (args.author && !args.genre) {
        const author = await Author.findOne({ name: args.author })
        if (author) {
          return await Book.find({ author: author._id }).populate('author', { name: 1, born: 1, id: 1 })
        }
      }
      if (!args.author && args.genre) {
        console.log(args.genre)
        return await Book.find({ genres: args.genre })
      }
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author })
        if (author) {
          return await Book.find({ author: author._id, genres: args.genre }).populate('author', { name: 1, born: 1, id: 1 })
        }
      } 
    },
    authorCount: async () => await Author.collection.countDocuments(),
    allAuthors: async () => await Author.find({})
  },
  Author: {
    bookCount: async (root) =>  {
      const filteredBooks = await Book.find({ author: root._id })
      return filteredBooks.length
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author })
        author.save()
      }
      const book = new Book({ ...args, author: author._id })
      await book.save()
      return await Book.findOne({ title: book.title }).populate('author', { name: 1, born: 1, id: 1 })
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: args.name }) 
      if (!author) {
        return null
      }
      author.born = args.setBornTo
      return author.save()
    } 
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

startStandaloneServer(server, {
  listen: { port: 4000 },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`)
})