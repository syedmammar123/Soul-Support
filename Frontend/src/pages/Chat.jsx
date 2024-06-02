import React, { useState, useEffect,useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// import Navbar from '../components/Navbar';
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
      const response = await axios.get('http://localhost:4000/api/v1/chat');
      
      const data = response.data.message[0].messages;
      const combinedArray = data.map((item) => ({
        userMsg: item.userMsg,
        gptMessage: item.gptMessage,
      }));

      setMessages(combinedArray);
    } catch (error) {
      if(error.response && error.response.status === 404 && error.response.data.message==="No Chat found!"){
        setMessages([{
          userMsg:"",
          gptMessage: "Hi, I am your AI friend here to chat you and discuss you your issues, feel free and friendly with me and start the conversation by introducting urself.",
        }]);

      }
     if (error.response && error.response.status === 401) {
      try {
        // Send a request to the refresh-token route
        await axios.post('http://localhost:4000/api/v1/users/refresh-token');
        
        // Retry the original request after token refresh
        await fetchChatLog();
      } catch (refreshError) {
        console.error('Error refreshing token:', refreshError);
        navigate("/Login")
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
  

  
    const response = await axios.post('http://localhost:4000/api/v1/chat', {      
      message: input,
    });

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
      <div className={"chatMain"}>
        {Messages &&
          Messages.map((message, index) => (
            <React.Fragment key={index}>
              {message.userMsg!==""?
               <div className={'user-message'}>
                <div className={"message"}>
                  <b>You</b>
                  <br />
                  {message.userMsg}
                </div>
              </div>
              :
               null 
              }
              <div className={'assistant-message'}>
                <div className={"message"}>
                  <b>AI</b>
                  <br />
                  {"gptMessage"}
                  {message.gptMessage}
                </div>
              </div>
            </React.Fragment>
          ))}
        <div ref={chatMainRef} />
      </div>

      <div className={'gptInput-container'}>
        <form className={"gptInputForm"} onSubmit={handleSubmit}>
          <input
            className={"gptInput"}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Send a message"
          />
          <button className={"gptSendButton"} type="submit" disabled={!input.trim()}>
            Send
          </button>
        </form>
      </div>
    </div>
    </>
  );
}
export default Chat;
