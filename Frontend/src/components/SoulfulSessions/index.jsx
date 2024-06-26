// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { Box } from '@mui/material';
// import { faCheck } from '@fortawesome/free-solid-svg-icons';
// import { Link } from 'react-router-dom';

// function SoulfulSessions() {
//   return (
//     <>
//       <div className="pageeBody">
//         <div className="maiiin">
//           <div className="instruct">
//             <Box
//               sx={{
//                 // position: 'relative',
//                 width: 330,
//                 height: 400,
//                 backgroundColor: '#c5cae9',
//                 borderRadius: '20px',
//                 zIndex: '1',
//                 // left: '10vw',
//                 margin: '3vw'
//               }}
//             />
//             <Box
//               sx={{
//                 // position: 'absolute',
//                 width: 330,
//                 height: 400,
//                 backgroundColor: '#d9eff8',
//                 borderRadius: '20px',
//                 zIndex: '2',
//                 margin: '20px',
//                 left: '-100px',
//                 top:'-100px',
                
//               }}
//             >
//               <video
//                 id="vid"
//                 src="images/Instructor video.mp4"
//                 muted="true"
//                 loop="true"
//                 autoPlay="true"
//               />
//             </Box>
//           </div>
//           <div className="contentt">
//             <h1 className="headingg">Soulful Sessions</h1>
//             <div id="para">Meet Our Expert Instructors and Join Live Counseling for Mental Health</div>
//             <ul className="topicList">
//               <li className="listItem"><div><FontAwesomeIcon icon={faCheck} /> Anxiety</div></li>
//               <li className="listItem"><div><FontAwesomeIcon icon={faCheck} /> Depression</div></li>
//               <li className="listItem"><div><FontAwesomeIcon icon={faCheck} /> Family Conflicts</div></li>
//               <li className="listItem"><div><FontAwesomeIcon icon={faCheck} /> OCD</div></li>
//               <li className="listItem"><div><FontAwesomeIcon icon={faCheck} /> Stress Management</div></li>
//               <li className="listItem"><div><FontAwesomeIcon icon={faCheck} /> Anger Management</div></li>
//               <li className="listItem"><div><FontAwesomeIcon icon={faCheck} /> Insomnia</div></li>
//               <li className="listItem"><div><FontAwesomeIcon icon={faCheck} /> Cognitive Distortions</div></li>
//               <li className="listItem"><div><FontAwesomeIcon icon={faCheck} /> Coping Skills</div></li>
//               <li className="listItem"><div><FontAwesomeIcon icon={faCheck} /> Grief and Loss</div></li>
//               <li className="listItem"><div><FontAwesomeIcon icon={faCheck} /> Self Care Strategies</div></li>
//               <li className="listItem"><div><FontAwesomeIcon icon={faCheck} /> Career and Life Transitions</div></li>
//             </ul>
//             <button id="ins_butn" className="heroooooBtn">
//               <Link to="/therapy" className="btnnn">
//                 Start Therapy
//               </Link>
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default SoulfulSessions;
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Box } from '@mui/material';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import styles from './index.module.css';

function SoulfulSessions() {
  return (
    <>
      <div className={styles.pageeBody}>
        <div className={styles.maiiin}>
          <div className={styles.instruct}>
            <Box
              sx={{
                width: 330,
                height: 360,
                backgroundColor: '#c5cae9',
                borderRadius: '20px',
                zIndex: '1',
                margin: '3vw'
                
              }}
            />
            <Box
              sx={{
                width: 330,
                height: 370,
                backgroundColor: '#d9eff8',
                borderRadius: '20px',
                zIndex: '2',
                // margin: '20px',
                left: '50px',
                top: '50px',
                position:'absolute',
                display:'flex',
                alignItems:"center"
              }}
            >
              <video
                id="vid"
                src="images/Instructor video.mp4"
                muted="true"
                loop="true"
                autoPlay="true"
              />
            </Box>
          </div>
          <div className={styles.contentt}>
            <h1 className={styles.headingg}>Soulful Sessions</h1>
            <div id="para">Meet Our Expert Instructors and Join Live Counseling for Mental Health</div>
            <ul className={styles.topicList}>
              <li className={styles.listItem}><div><FontAwesomeIcon icon={faCheck} /> Anxiety</div></li>
              <li className={styles.listItem}><div><FontAwesomeIcon icon={faCheck} /> Depression</div></li>
              <li className={styles.listItem}><div><FontAwesomeIcon icon={faCheck} /> Family Conflicts</div></li>
              <li className={styles.listItem}><div><FontAwesomeIcon icon={faCheck} /> OCD</div></li>
              <li className={styles.listItem}><div><FontAwesomeIcon icon={faCheck} /> Stress Management</div></li>
              <li className={styles.listItem}><div><FontAwesomeIcon icon={faCheck} /> Anger Management</div></li>
              <li className={styles.listItem}><div><FontAwesomeIcon icon={faCheck} /> Insomnia</div></li>
              <li className={styles.listItem}><div><FontAwesomeIcon icon={faCheck} /> Cognitive Distortions</div></li>
              <li className={styles.listItem}><div><FontAwesomeIcon icon={faCheck} /> Coping Skills</div></li>
              <li className={styles.listItem}><div><FontAwesomeIcon icon={faCheck} /> Grief and Loss</div></li>
              <li className={styles.listItem}><div><FontAwesomeIcon icon={faCheck} /> Self Care Strategies</div></li>
              <li className={styles.listItem}><div><FontAwesomeIcon icon={faCheck} /> Career and Life Transitions</div></li>
            </ul>
            <button id="ins_butn" className={styles.heroooooBtn}>
              <Link to="/sessions" className={styles.btnnn}>
                View Sessions
              </Link>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default SoulfulSessions;
