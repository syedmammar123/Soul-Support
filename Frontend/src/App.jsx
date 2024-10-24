import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import './App.css'
import Home from "./pages/Home";
import Careers from "./pages/Careers";
import Chat from "./pages/Chat";
import BlogList from "./pages/BlogList";
import BlogSingle from "./pages/BlogSingle";
import BlogWrite from "./pages/BlogWrite";
import Login from "./pages/Login";
import Therapist from "./pages/Therapist";
import Jokes from "./pages/Jokes";
import Test from "./components/Navbar";
import Assessments from "./pages/Assessment";
import AssessmentCategory from "./pages/AssessmentCategory";
import Session from "./pages/Session";
import JoinLiveSession from "./pages/Session/JoinLiveSession";
import TakeLiveSession from "./pages/Session/TakeLiveSession";
import TakeTherapy from "./pages/Therapy";
import ProfessionalRegistration from "./pages/ProfessionalRegistration";
import AdminPage from "./pages/Admin";
import JoinLiveCall from "./pages/Appointment/JoinLiveCall";
import TakeLiveCall from "./pages/Appointment/TakeLiveCall";
import PrivateRoute from "./routes/PrivateRoute";
import { useAuthStore } from "./store/authStore";
import LiveSession from "./components/LiveSession";

// import CallRoom from './components/CallRoom/CallRoom'

import About from "./pages/About";
import SendText from "./pages/SendText";

function App() {
  const authUser = useAuthStore((state) => state.authUser);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/test" element={<Test />} />
          <Route path="/" element={<Home />} />
          <Route path="/careers" element={<Careers />} />

          {/* assessment */}
          <Route path="/quiz" element={<Assessments />} />
          <Route
            path="/quiz/:AssessmentCategory"
            element={<AssessmentCategory />}
          />

          {/* blogs */}
          <Route path="/blogs" element={<BlogList />} />
          <Route path="/blog/:id" element={<BlogSingle />} />
          <Route path="/write" element={<BlogWrite />} />

          <Route path="/about" element={<About />} />

          {/* info session */}
          <Route path="/sessions" element={<Session />} />
          <Route path="/session/:roomId" element={<JoinLiveSession />} />
          <Route
            path="/therapist/session/:roomId"
            element={<TakeLiveSession />}
          />
          <Route path="/LiveSession" element={<LiveSession />} />

          {/* <Route path='/therapist/room/:roomId' element={<CallRoom/>} /> */}

          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register/:emailCode"
            element={<ProfessionalRegistration />}
          />

          <Route path="/jokes" element={<Jokes />} />
          <Route path="/admin" element={<AdminPage />} />

          {/* {privateRoute} */}
          <Route element={<PrivateRoute />}>
            <Route path="/ai-chat" element={<Chat />} />
            {/* therapy */}
            <Route path="/therapy/:category?" element={<TakeTherapy />} />
            {/* <Route path='/therapy/room/:roomId' element={<CallRoom/>} /> */}
            <Route path="/therapist" element={<Therapist />} />
            <Route path="/therapyCall/:roomId" element={<JoinLiveCall />} />
            <Route
              path="/therapist/therapyCall/:roomId"
              element={<TakeLiveCall />}
            />
            <Route
              path="chat/:patientId?/:therapistId?"
              element={<SendText />}
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
