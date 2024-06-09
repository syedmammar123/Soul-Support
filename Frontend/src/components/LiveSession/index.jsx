import React, { useEffect, useState } from 'react';
// import './session.js';
import { useNavigate } from 'react-router-dom';
import styles from "./index.module.css"
import axios from 'axios';


function LiveSession() {
    
    
    const navigate = useNavigate()   
    const [sessionId, setSessionId] = useState("a")
    const [sessionData, setSessionData] = useState([])
    
    axios.defaults.withCredentials = true;



    const fetchAllSessions = async () => {
        try {
        const response = await axios.get('http://localhost:4000/api/v1/session/all');
        
        const data = response.data.message
        console.log(data)
        setSessionData(data)
        

        } catch (error) {
        if(error.response && error.response.status === 404 && error.response.data.message==="No Session Found!!"){
            alert("no data in database :(")
        }
        
        }
    };

    useEffect(()=>{
        fetchAllSessions();
    },[])

    const formatTime = (time)=>{
        const date = new Date(time)
        return date.toLocaleString()
    }

    const isSessionNow = (time) => {
        const sessionStartTime = new Date(time);
        const now = new Date();
        const sessionEndTime = new Date(sessionStartTime.getTime() + (60 * 60 * 1000)); 

        if (now >= sessionStartTime && now <= sessionEndTime) {
            return 'live';
        }

        if (now > sessionEndTime) {
            return 'expired';
        }

        return 'upcoming';
    };

    const handleJoin = (id)=>{
    navigate(`/session/${id}`)
    }

    
  return (
    <div className={styles.liveMain}>
      <div className={styles.carouselContainerrr}>
        <div className={styles.carousel}>
            {sessionData.map((item,index)=>(
                <div key={index} id={index} className={styles.carddd}>
                    <div className={styles.spk1}>
                        <img className={styles.spkimg} src={item.picUrl} alt="" />
                    </div>
                    <div className={styles.spk1text}>
                    <h1 className={styles.spktexth1}>{item.name}</h1>
                    <div className={styles.spktopic}>
                        <p>
                        WEBINAR : <br /> <span>{item.title}</span>
                        </p>
                    </div>
                    <p className={styles.date}>{formatTime(item.dateTime)}</p>
                    </div>

                   {isSessionNow(item.dateTime) === 'live' && (
                        <button className={`${styles.joinBtnn} ${styles['btn-live']}`} onClick={()=>handleJoin(item._id)}>Join Live</button>
                    )}

                    {isSessionNow(item.dateTime) === 'upcoming' && (
                        <button className={`${styles.joinBtnn} ${styles['btn-notlive']}`}>Coming Soon</button>
                    )}

                    {isSessionNow(item.dateTime) === 'expired' && (
                        <button className={`${styles.joinBtnn} ${styles['btn-notlive']} bg-red-300`}>Expired</button>
                    )}

                    <div className={styles.box}>
                    <div className={styles.container}>
                        <div className={styles.shape1}></div>
                        <div className={styles.shape2}></div>
                        <div className={styles.clock}>
                        <p id="demo1" className={styles.demo}></p>
                        </div>
                    </div>
                    </div>
                </div>


            ))}
          
         
        </div>
      </div>
    </div>
  );
}

export default LiveSession;
