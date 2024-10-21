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
    <div className={styles.liveMain}>
      <div className={styles.carouselContainerrr}>
        {loading && (
          <div className="h-full w-full flex items-center justify-center">
            <p>Loading...</p>
          </div>
        )}
        <div className={`${styles.carousel} h-[80%] w-[80%]`}>
          {sessionData.map((item, index) => (
            <div key={index} id={index} className={`${styles.carddd} max-lg:flex max-lg:flex-col`}>
              <div className={styles.spk1}>
                <img className={styles.spkimg} src={item.picUrl} alt="" />
              </div>
              <div className={styles.spk1text}>
                <h1 className={`${styles.spktexth1}`}>{item.name}</h1>
                <div className={styles.spktopic}>
                  <p>
                    WEBINAR : <br /> <span>{item.title}</span>
                  </p>
                </div>
                <p className={styles.date}>{formatTime(item.dateTime)}</p>
              </div>

              {isSessionNow(item.dateTime) === "live" && (
                <button
                  className={`${styles.joinBtnn} ${styles["btn-live"]}`}
                  onClick={() => handleJoin(item._id)}
                >
                  Join Live
                </button>
              )}

              {isSessionNow(item.dateTime) === "upcoming" && (
                <button
                  className={`${styles.joinBtnn} ${styles["btn-notlive"]}`}
                >
                  Coming Soon
                </button>
              )}

              {isSessionNow(item.dateTime) === "expired" && (
                <button
                  className={`${styles.joinBtnn} ${styles["btn-notlive"]} bg-red-300`}
                >
                  Expired
                </button>
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
