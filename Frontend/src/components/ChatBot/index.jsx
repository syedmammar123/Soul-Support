import { Link } from 'react-router-dom';
import styles from './index.module.css';

function ChatBot() {
  return (
    <div className={styles.picture}>
      <img className={styles.bgimg} src="images/back2.png" alt="yyyy" />
      <div className={styles.chatinner}>
        <div className={styles.chattext}>
          <h1 className={styles.chath1}>Welcome to Chatty</h1>
          <h2 className={styles.chath2}>How can I help you today?</h2>
          <h3 className={styles.chath3}>
            Experience empathy and personalized guidance with our AI-powered mental health chatbot, empowering you on your journey towards well-being.
          </h3>
          <button className={styles.Heroo_button}>
            <Link to="/ai-chat" className={styles.butn}>
              Start Conversation
            </Link>
          </button>
        </div>
        <div className={styles.chatimg}>
          <img className={styles.cimage} src="/images/4nh9qbf8.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
