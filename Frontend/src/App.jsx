import { useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
// import './App.css'
import Home from './pages/Home'
import Careers from './pages/Careers'
import Chat from './pages/Chat'
import BlogList from './pages/BlogList'
import BlogSingle from './pages/BlogSingle'
import BlogWrite from './pages/BlogWrite'
import Login from './pages/Login'
import LiveSession from './components/Livesession'
import Therapist from './pages/Therapist'
import Jokes from './pages/Jokes'
import Test from './components/Test'
import Assessments from './pages/Assessment'
import AssessmentCategory from './pages/AssessmentCategory'
import Session from './pages/Session'
import JoinLiveSession from './pages/Session/JoinLiveSession'
import TakeLiveSession from './pages/Session/TakeLiveSession'


// import About from './pages/About'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/test" element={<Test/>}/>

          <Route path="/" element={<Home/>}/>
          <Route path="/home" element={<Home/>}/>
          <Route path='/careers' element = {<Careers/>} />
          <Route path='/ai-chat' element={<Chat/>} />

        {/* assessment */}
          <Route path='/quiz' element={<Assessments />} />
          <Route path='/quiz/:AssessmentCategory' element={<AssessmentCategory />} />

        {/* blogs */}
          <Route path='/blogs' element={<BlogList />} />
          <Route path='/blog/:id' element={<BlogSingle />} />
          <Route path='/write' element={<BlogWrite />} />
        
       
          {/* <Route path="/about" element={<About/>}/> */}

        {/* info session */}
        <Route path='/sessions' element={<Session/>} />
        <Route path='/session' element={<JoinLiveSession/>} />
        <Route path='/instructor/session' element={<TakeLiveSession/>} />
        <Route path='/LiveSession' element={<LiveSession/>} />

        {/* therapy */}
        {/* <Route path='/therapy' element={<TakeTherapy/>} />  */}
        {/* <Route path='/therapy/room/:roomId' element={<CallRoom/>} /> */}
        <Route path='/therapist' element={<Therapist/>} />
        {/* <Route path='/therapist/room/:roomId' element={<CallRoom/>} /> */}
          
          <Route path='/login' element={<Login/>} />
         
          <Route path='/jokes' element={<Jokes/>} />







        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
