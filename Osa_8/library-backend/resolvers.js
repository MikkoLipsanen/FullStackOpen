const { GraphQLError } = require('graphql')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()
const jwt = require('jsonwebtoken')
const Author = require('./models/author')
const User = require('./models/user')
const Book = require('./models/book')


const resolvers = {
  Subscription: {
    bookAdded: {
        subscribe: () => pubsub.asyncIterableIterator('BOOK_ADDED')
    },
  },
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
        return await Book.find({ genres: args.genre }).populate('author', { name: 1, born: 1, id: 1 })
      }
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author })
        if (author) {
          return await Book.find({ author: author._id, genres: args.genre }).populate('author', { name: 1, born: 1, id: 1 })
        }
      } 
    },
    authorCount: async () => await Author.collection.countDocuments(),
    allAuthors: async () => await Author.find({}).populate('books', { title:1 }),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        author = new Author({ name: args.author, books: [] })
        try {
          await author.save()
        } catch (error) {
          throw new GraphQLError('Saving author failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args.author,
              error
            }
          })
        }
      }
      const book = new Book({ ...args, author: author._id })
      try {
        await book.save()
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args,
            error
          }
        })
      }
      const returnedBook = await Book.findOne({ title: book.title }).populate('author', { name: 1, born: 1, id: 1 })
      pubsub.publish('BOOK_ADDED', { bookAdded: returnedBook })
      author.books = author.books.concat(book._id)
      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError('Saving author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.author,
            error
          }
        })
      }

      return returnedBook
    },
    editAuthor: async (root, args, context) => {
      const currentUser = context.currentUser
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT',
          }
        })
      }
      const author = await Author.findOne({ name: args.name }) 
      if (!author) {
        return null
      }
      author.born = args.setBornTo
      try {
        await author.save()
      } catch (error) {
        throw new GraphQLError('Saving author failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.setBornTo,
            error
          }
        })
      }
      return await Author.findOne({ name: args.name }).populate('books', { title:1 })

    },
    createUser: async (root, args) => {
      const user = new User({ username: args.username, favoriteGenre: args.favoriteGenre })
      return user.save()
        .catch(error => {
          throw new GraphQLError('Creating the user failed', {
            extensions: {
              code: 'BAD_USER_INPUT',
              invalidArgs: args, 
              error
            }
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
  
      if ( !user || args.password !== 'secret' ) {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })        
      }
  
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, process.env.JWT_SECRET) }
    },
  },
}

module.exports = resolvers