import React, { useState } from 'react';
// import './session.js';
import { useNavigate } from 'react-router-dom';
import styles from "./index.module.css"


function LiveSession() {
    const navigate = useNavigate()   
    const [sessionId, setSessionId] = useState("a")
 
    const handleJoin = ()=>{
    navigate(`/session`)
  }

  const webinarData = [
    {
        id: "1",
        imgSrc: "images/instructor1.png",
        speaker: "David Romano",
        topic: "Mental Health And Epilepsy",
        date: "JULY 19th, 2023 10-4PM"
    },

    {
        id: "2",
        imgSrc: "images/instructor2.png",
        speaker: "Dr.Rania Awaad",
        topic: "Managing Anxiety in Everyday Life",
        date: "AUGUST 1ST, 2023 1-2PM"
    },
    
    {
        id: "3",
        imgSrc: "images/instructor3.jpg",
        speaker: "Shane Feldman",
        topic: "Unlocking the Power of Mindfulness",
        date: "AUGUST 1ST, 2023 1-2PM"
    },
    
    {
        id: "4",
        imgSrc: "images/instructor4.jpg",
        speaker: "Anya Jones",
        topic: "Understanding and Overcoming Depression",
        date: "AUGUST 1ST, 2023 1-2PM"
    },
    
    {
        id: "5",
        imgSrc: "images/instructor5.jpg",
        speaker: "Anas Waqar",
        topic: "Building Healthy Relationships",
        date: "AUGUST 1ST, 2023 1-2PM"
    }
];

    
  return (
    <div className={styles.liveMain}>
      <div className={styles.carouselContainerrr}>
        <div className={styles.carousel}>
            {webinarData.map((item,index)=>(
                <div key={index} id={index} className={styles.carddd}>
                    <div className={styles.spk1}>
                        <img className={styles.spkimg} src={item.imgSrc} alt="" />
                    </div>
                    <div className={styles.spk1text}>
                    <h1 className={styles.spktexth1}>{item.speaker}</h1>
                    <div className={styles.spktopic}>
                        <p>
                        WEBINAR : <br /> <span>{item.topic}</span>
                        </p>
                    </div>
                    <p className={styles.date}>{item.date}</p>
                    </div>
                    <button className={`${styles.joinBtnn} ${styles['btn-live']}`}  onClick={handleJoin}>Join Live</button>
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
