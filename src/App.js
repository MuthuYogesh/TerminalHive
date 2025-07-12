import React from 'react'
import { Route, Routes } from 'react-router-dom'
import ProtectedRoute from './component/ProtectedRoute'
import Signin from './component/signin/Signin'
import Signup from './component/signup/Signup'
import Error from './component/error/Error'
import Home from './pages/home/Home'
import News from './pages/news/News'
import Memes from './pages/memes/Memes'
import Projects from './pages/projects/Projects'

export default function App() {
  return (
    <>
      <Routes>
          <Route path='/' element={<Signin/>}/>
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/home' element={<ProtectedRoute><Home/></ProtectedRoute>}/>
          <Route path='/news' element={<ProtectedRoute><News/></ProtectedRoute>}/>
          <Route path='/memes' element={<ProtectedRoute><Memes/></ProtectedRoute>}/>
          <Route path='/projects' element={<ProtectedRoute><Projects/></ProtectedRoute>}/>
          <Route path='*' element={<Error/>}/>
      </Routes>
    </>
  )
}
