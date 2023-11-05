import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Careers from './pages/Careers'
import Chat from './pages/Chat'
import BlogList from './pages/BlogList'
import BlogSingle from './pages/BlogSingle'
import BlogWrite from './pages/BlogWrite'
import Login from './pages/Login'


// import About from './pages/About'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path='/careers' element = {<Careers/>} />
          <Route path='/chat' element={<Chat/>} />

        {/* blogs */}
          <Route path='/blogs' element={<BlogList />} />
          <Route path='/blog/:id' element={<BlogSingle />} />
          <Route path='/write' element={<BlogWrite />} />

          {/* <Route path="/about" element={<About/>}/> */}
          
          <Route path='/login' element={<Login/>} />







        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
