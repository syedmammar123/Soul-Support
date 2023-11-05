import { Link } from 'react-router-dom';

function ChatBot() {
  return (
    <div className="picture">xdfd
      <img className="bgimg" src="images/back2.png" alt="yyyy" />
      <div className="chatinner">
        <div className="chattext">
          <h1 className="chath1">Welcome to Chatty</h1>
          <h2 className="chath2">How can I help you today?</h2>
          <h3 className="chath3">
            Experience empathy and personalized guidance with our AI-powered mental health chatbot, empowering you on your journey towards well-being.
          </h3>
          <button className="Heroo_button">
            <Link to="/chat" className="butn">
              Start Conversation
            </Link>
          </button>
        </div>
        <div className="chatimg">
          <img className="cimage" src="images/4nh9qbf8.png" alt="" />
        </div>
      </div>
    </div>
  );
}

export default ChatBot;
