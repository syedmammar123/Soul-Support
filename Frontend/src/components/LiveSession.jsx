import React, { useState } from 'react';
// import './session.js';
import { useNavigate } from 'react-router-dom';


function LiveSession() {
    const navigate = useNavigate()   
    const [sessionId, setSessionId] = useState("a")
 
    const handleJoin = ()=>{
    navigate(`/session`)
  }

    
  return (
    <div className="Live_main">
      <div className="carousel-containerrr">
        <div className="carousel">
          <div id="1" className="carddd">
            <div className="spk1">
              <img className="spkimg" src="2.png" alt="" />
            </div>
            <div className="spk1text">
              <h1 className="spktexth1">David Romano</h1>
              <div className="spktopic">
                <p>
                  WEBINAR : <br /> <span>Mental Health And Epilepsy</span>
                </p>
              </div>
              <p className="date">JULY 19th, 2023 10-4PM</p>
            </div>
            <button className="btn btn-live" onClick={handleJoin}>Join Live</button>
            <div className="box">
              <div className="container">
                <div className="shape1"></div>
                <div className="shape2"></div>
                <div className="clock">
                  <p id="demo1" className="demo"></p>
                </div>
              </div>
            </div>
          </div>
          <div id="2" className="carddd">
            <div className="spk1">
              <img className="spkimg" src="4.jpg" alt="" />
            </div>
            <div className="spk1text">
              <h1 className="spktexth1">Dr.Rania Awaad</h1>
              <div className="spktopic">
                <p>
                  WEBINAR : <br /> Managing Anxiety in Everyday Life
                </p>
              </div>
              <p className="date">AUGUST 1ST, 2023 1-2PM</p>
            </div>
            <button className="btn">Join Live</button>
            <div className="box">
              <div className="container">
                <div className="shape1"></div>
                <div className="shape2"></div>
                <div className="clock">
                  <p id="demo2" className="demo"></p>
                </div>
              </div>
            </div>
          </div>
          <div id="3" className="card">
            <div className="spk1">
              <img className="spkimg" src="1.png" alt="" />
            </div>
            <div className="spk1text">
              <h1 className="spktexth1">Shane Feldman</h1>
              <div className="spktopic">
                <p>
                  WEBINAR : <br /> Unlocking the Power of Mindfulness
                </p>
              </div>
              <p className="date">AUGUST 1ST, 2023 1-2PM</p>
            </div>
            <button className="btn">Join Live</button>
            <div className="box">
              <div className="container">
                <div className="shape1"></div>
                <div className="shape2"></div>
                <div className="clock">
                  <p id="demo3" className="demo"></p>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="spk1">
              <img className="spkimg" src="3.jpg" alt="" />
            </div>
            <div className="spk1text">
              <h1 className="spktexth1">Sam Jones</h1>
              <div className="spktopic">
                <p>
                  WEBINAR : <br /> Understanding and Overcoming Depression
                </p>
              </div>
              <p className="date">AUGUST 1ST, 2023 1-2PM</p>
            </div>
            <button className="btn">Join Live</button>
            <div className="box">
              <div className="container">
                <div className="shape1"></div>
                <div className="shape2"></div>
                <div className="clock">
                  <p id="demo4" className="demo"></p>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="spk1">
              <img className="spkimg" src="5.png" alt="" />
            </div>
            <div className="spk1text">
              <h1 className="spktexth1">Amna Waqar Choudry</h1>
              <div className="spktopic">
                <p>
                  WEBINAR : <br /> Building Healthy Relationships:
                </p>
              </div>
              <p className="date">AUGUST 1ST, 2023 1-2PM</p>
            </div>
            <button className="btn">Join Live</button>
            <div className="box">
              <div className="container">
                <div className="shape1"></div>
                <div className="shape2"></div>
                <div className="clock">
                  <p id="demo5" className="demo"></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LiveSession;
