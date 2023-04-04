import React from 'react'
import { Link, Navigate, Route, Routes, useParams } from 'react-router-dom'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='users'>
        <Route index element={<UsersListPage />} />
        <Route path=':userId'>
          <Route index element={<Navigate to='profile' />} />
          <Route path='profile' element={<UserPage />} />
          <Route path='edit' element={<UserEditPage />} />
          <Route path='*' element={<Navigate to='profile' />} />
        </Route>
      </Route>
      <Route path='*' element={<Navigate to='/' />} />
    </Routes>
  )
}

export default App

function HomePage() {
  return (
    <>
      <h1>Home Page</h1>
      <Link to='/users'>Users List</Link>
    </>
  )
}

function UsersListPage() {
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

function UserPage() {
  const { userId } = useParams()
  return (
    <>
      <h1>User with id: {userId}</h1>
      <ul>
        <li>
          <Link to={`/users/${userId}/edit`}>Edit</Link>
        </li>
        <li>
          <Link to='/users'>Users List</Link>
        </li>
      </ul>
    </>
  )
}

function UserEditPage() {
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
          <Link to='/users'>Users List</Link>
        </li>
      </ul>
    </>
  )
}
