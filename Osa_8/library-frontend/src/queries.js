import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      born
      books {
        title
      }
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks  {
      title
      published
      author {
        name
      }
      genres
    }
  }
`

export const GENRE_BOOKS = gql`
  query allBooks($genre: String!) {
    allBooks(genre: $genre) {
      title
      published
      author {
        name
      }
      genres
    }
  }
`

export const GET_USER = gql`
  query {
    me  {
      username
      favoriteGenre
    }
  }
`

export const CREATE_BOOK = gql`
  mutation addBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      title
      published
      author {
        name
      }
      genres
      }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      title
      published
      author {
        name
      }
      genres
    }
  }
`

export const EDIT_BIRTHYEAR = gql`
  mutation editAuthor($authorName: String!, $born: Int!) {
    editAuthor(name: $authorName, setBornTo: $born)  {
      name
      born
      books {
        title
      }
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`