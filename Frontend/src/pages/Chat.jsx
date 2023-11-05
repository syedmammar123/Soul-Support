import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
// import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function Chat() {
  const [input, setInput] = useState('');
  const [Messages, setMessages] = useState([]);
  const chatMainRef = useRef(null);
  const navigate=useNavigate()

//   const username=Cookies.get("username")
//   const role=Cookies.get("role")

//   useEffect(() => {
//     if(!username){
//       navigate('/login')
//     }else{
//     fetchChatLog();
//     }  

// },[])

//   useEffect(() => {

//     chatMainRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
//   }, [ Messages]);

//   const fetchChatLog = async () => {
//     try {
//       const response = await axios.get('http://localhost:4000/chats',{params: { username },});
//       const data = response.data;
//       const combinedArray = data.map((item) => ({
//         user_input: item.user_input,
//         generated_message: item.generated_message,
//       }));
//       setMessages(combinedArray);
//     } catch (error) {
//       console.error(error);
//     }
//   };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (input.trim() === '') {
      return;
    }
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        user_input: input,
      },
    ]);
    setInput('');
  
    // const response = await fetch('http://localhost:4000/chats', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     username,
    //     message: input,
    //   }),
    // });
  
    // const data = await response.json();
    // const generatedMessage = data.message;
  
    // setMessages((prevMessages) => [
    //   ...prevMessages,
    //   {
    //     user_input: input,
    //     generated_message: generatedMessage,
    //   },
    // ]);
    // setInput('');
  };
  
  return (
    <>
    <Navbar/>
    <div className="gptMain">
     

      <div className="chatMain">
        {Messages &&
          Messages.map((message, index) => (
            <React.Fragment key={index}>
              <div className="user-message">
                <div className="message">
                  <b>You</b>
                  <br />
                  {message.user_input}
                </div>
              </div>
              <div className="assistant-message">
                <div className="message">
                  <b>AI</b>
                  <br />
                  {message.generated_message}
                </div>
              </div>
            </React.Fragment>
          ))}
        <div ref={chatMainRef} />
      </div>

      <div className="gptInput-container">
        <form className="gptInputForm" onSubmit={handleSubmit}>
          <input
            className="gptInput"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Send a message"
          />
          <button className="gptSendButton" type="submit" disabled={!input.trim()}>
            Send
          </button>
        </form>
      </div>
    </div>
    </>
  );
}
export default Chat;
