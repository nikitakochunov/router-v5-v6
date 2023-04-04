import React from 'react'
import { Link, Redirect, Route, Switch, useParams } from 'react-router-dom'

const App = () => {
  return (
    <Switch>
      <Route exact path='/users/:userId?/:page?' component={UsersLayout} />
      <Route exact path='/' component={HomePage} />
      <Redirect to='/' />
    </Switch>
  )
}

export default App

const HomePage = () => {
  return (
    <>
      <h1>Home Page</h1>
      <Link to='/users'>Users List</Link>
    </>
  )
}

const UsersLayout = () => {
  const { userId, page } = useParams()

  if (userId && page === 'profile') {
    return <UserPage />
  }

  if (userId && page === 'edit') {
    return <UserEditPage />
  }

  if (!userId) {
    return <UsersListPage />
  }

  return <Redirect to={`/users/${userId}/profile`} />
}

const UsersListPage = () => {
  const users = Array(5).fill('')
  return (
    <>
      <h1>Users List</h1>
      <ul>
        {users.map((_, index) => {
          return (
            <li key={index}>
              <Link to={`/users/${index + 1}/profile`}>User {index + 1}</Link>
            </li>
          )
        })}
      </ul>
      <Link to='/'>Home</Link>
    </>
  )
}

const UserPage = () => {
  const { userId } = useParams()
  return (
    <>
      <h1>User with id: {userId}</h1>
      <ul>
        <li>
          <Link to={`/users/${userId}/edit`}>Edit</Link>
        </li>
        <li>
          <Link to={`/users`}>Users List</Link>
        </li>
      </ul>
    </>
  )
}

const UserEditPage = () => {
  const { userId } = useParams()

  return (
    <>
      <h1>Edit User with id: {userId}</h1>
      <ul>
        <li>
          <Link to={`/users/${userId}`}>User {userId}</Link>
        </li>
        <li>
          <Link to={`/users/${+userId + 1}`}>Another User</Link>
        </li>
        <li>
          <Link to={`/users`}>Users List</Link>
        </li>
      </ul>
    </>
  )
}
