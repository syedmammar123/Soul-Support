import { useEffect, useState } from "react";
import styles from "./index.module.css";
import useLiveSession from "../../hooks/useLiveSession";

function LiveSession() {
  const [sessionData, setSessionData] = useState([]);

  const { fetchAllSessions, loading } = useLiveSession();

  useEffect(() => {
    fetchAllSessions(setSessionData);
  }, []);

  const formatTime = (time) => {
    const date = new Date(time);
    return date.toLocaleString();
  };

  const isSessionNow = (time) => {
    const sessionStartTime = new Date(time);
    const now = new Date();
    const sessionEndTime = new Date(
      sessionStartTime.getTime() + 60 * 60 * 1000
    );

    if (now >= sessionStartTime && now <= sessionEndTime) {
      return "live";
    }

    if (now > sessionEndTime) {
      return "expired";
    }

    return "upcoming";
  };

  const handleJoin = (id) => {
    window.location.href = `/session/${id}`;
  };

  return (
    <div className={`${styles.liveMain} `}>
      <div className={styles.carouselContainerrr}>
        {loading && (
          <div className="h-full w-full flex items-center justify-center">
            <p>Loading...</p>
          </div>
        )}
        <div className={`${styles.carousel} h-[80%] w-[80%] max-lg:h-fit items-stretch`}>
          {sessionData.map((item, index) => (
            <div key={index} id={index} className={`${styles.carddd} max-lg:flex max-lg:flex-col max-lg:min-w-[30rem] max-lg:px-5 max-sm:min-w-fit max-lg:h-fit`}>
              <div className={`${styles.spk1} w-[30vw] h-[55vh] max-lg:w-full max-lg:h-96 max-sm:h-56`}>
                <img className={`${styles.spkimg} w-[25vw] h-[52vh] max-lg:w-full max-lg:h-full`} src={item.picUrl} alt="" />
              </div>
              
              <div className={`${styles.spk1text} mt-[4rem] max-lg:w-full max-lg:block max-lg:pb-24`}>
                <h1 className={`${styles.spktexth1} text-[40px] line-clamp-1 max-sm:text-2xl`}>{item.name}</h1>
                <br />
                <div className={`${styles.spktopi}  w-[30vw] max-lg:w-full`}>
                  <p>
                    WEBINAR : {item.title.length<27?<br/>:null} <span>{item.title}</span>
                  </p>
                </div>
                <p className={styles.date}>{formatTime(item.dateTime)}</p>
              </div>
              
              {isSessionNow(item.dateTime) === "live" && (
                <button
                  className={`${styles.joinBtnn} ${styles["btn-live"]} absolute left-[32vw] mt-[50vh]  max-lg:left-36 max-lg:bottom-4 max-sm:left-[20%]`}
                  onClick={() => handleJoin(item._id)}
                >
                  Join Live
                </button>
              )}

              {isSessionNow(item.dateTime) === "upcoming" && (
                <button
                  className={`${styles.joinBtnn} ${styles["btn-notlive"]} absolute left-[32vw] mt-[50vh] max-lg:left-36 max-lg:bottom-4 max-sm:left-[20%]`}
                >
                  Coming Soon
                </button>
              )}

              {isSessionNow(item.dateTime) === "expired" && (
                <button
                  className={`${styles.joinBtnn} ${styles["btn-notlive"]} bg-red-300 absolute left-[32vw] mt-[50vh] max-lg:left-36 max-lg:bottom-4 max-sm:left-[20%]`}
                >
                  Expired
                </button>
              )}

              <div className={`${styles.box} max-lg:hidden`}>
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
