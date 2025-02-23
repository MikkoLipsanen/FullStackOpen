import { useApolloClient } from '@apollo/client'
import { useState } from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";
import LoginForm from "./components/LoginForm";
import Notify from "./components/Notify";
import Recommendations from "./components/Recommendations";

const App = () => {
  const [page, setPage] = useState("authors");
  const [token, setToken] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null)

  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage("authors")
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
      <div>
        <button onClick={() => setPage("authors")}>authors</button>
        <button onClick={() => setPage("books")}>books</button>
        {!token ?
        <button onClick={() => setPage("login")}>login</button>
        : 
        <span>
          <button onClick={() => setPage("add")}>add book</button>
          <button onClick={() => setPage("recommend")}>recommend</button>
          <button onClick={() => logout()}>logout</button>
        </span>
        }
      </div>

      <Authors setError={notify} show={page === "authors"} />

      <Books show={page === "books"} />

      <NewBook setError={notify} show={page === "add"} />

      <Recommendations show={page === "recommend"} />

      <LoginForm setToken={setToken} setPage={setPage} setError={notify} show={page === "login"} />
    </div>
  );
};

export default App;
