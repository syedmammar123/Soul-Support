import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
// import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Test from '../components/Test';

function Chat() {
  const [input, setInput] = useState('');
  const [Messages, setMessages] = useState([]);
  const chatMainRef = useRef(null);
  const navigate=useNavigate()
  
  axios.defaults.withCredentials = true;

//   const username=Cookies.get("username")
//   const role=Cookies.get("role")

//   useEffect(() => {
//     if(!username){
//       navigate('/login')
//     }else{
//     fetchChatLog();
//     }  

// },[])

  useEffect(() => {

    chatMainRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [ Messages]);

useEffect(()=>{
      fetchChatLog();
},[])

  const fetchChatLog = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/chat');
      
      const data = response.data.message[0].messages;
      const combinedArray = data.map((item) => ({
        userMsg: item.userMsg,
        gptMessage: item.gptMessage,
      }));

      setMessages(combinedArray);
    } catch (error) {
      console.error(error.response.status);
     if (error.response && error.response.status === 401) {
      try {
        // Send a request to the refresh-token route
        await axios.post('http://localhost:3000/api/v1/users/refresh-token');
        
        // Retry the original request after token refresh
        await fetchChatLog();
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        // Handle the error when refresh token fails
      }
    } else {
      // Handle other types of errors
      console.error('Error occurred:', error);
    }
    

      
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (input.trim() === '') {
      return;
    }
    // setMessages((prevMessages) => [
    //   ...prevMessages,
    //   {
    //     userMsg: input,
    //   },
    // ]);
    setInput('');
  
    // const response = await fetch('http://localhost:3000/api/v1/chat', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     // _id:'65787c36c195a062420e528b',
    //     message: input,
    //   }),
    // });
  
      const response = await axios.post('http://localhost:3000/api/v1/chat', {     
    
        // _id:'65787c36c195a062420e528b',
        message: input,
    });
    console.log(response);

    const data = await response.data;
    const generatedMessage = data.message;
  
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        userMsg: input,
        gptMessage: generatedMessage,
      },
    ]);
    setInput('');
  };
  
  return (
    <>
    {/* <Navbar/> */}
    <Test />
    <div className="gptMain">
     

      <div className="chatMain">
        {Messages &&
          Messages.map((message, index) => (
            <React.Fragment key={index}>
              <div className="user-message">
                <div className="message">
                  <b>You</b>
                  <br />
                  {message.userMsg}
                </div>
              </div>
              <div className="assistant-message">
                <div className="message">
                  <b>AI</b>
                  <br />
                  {message.gptMessage}
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
