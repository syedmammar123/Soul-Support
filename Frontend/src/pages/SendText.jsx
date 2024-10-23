import React, { useState, useEffect, useRef } from "react";
import axios from "axios"; // Import Axios
import Test from "../components/Test";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

function SendText() {
  const [input, setInput] = useState("");
  const [Messages, setMessages] = useState([]);
  const [fetchChatLoading, setFetchChatLoading] = useState(true);
  const chatMainRef = useRef(null);
  const {patientId,therapistId} = useParams();
  const authUser = useAuthStore((state) => state.authUser);
    
  const senderId = authUser._id;
  const receiverId = authUser._id===patientId?therapistId:patientId;
  const my_role = authUser.role; 



  // Fetch chat log from the server
  const fetchChatLog = async () => {
    setFetchChatLoading(true);
    try {
      const response = await axios.get(`http://localhost:4000/api/v1/message`, {
        params: {
          userId: senderId,
          otherUserId: receiverId,
        },
      });
      setMessages(response.data.message);
    } catch (error) {
      console.error("Failed to fetch chat log", error);
    } finally {
      setFetchChatLoading(false);
    }
  };

  useEffect(() => {
    fetchChatLog();
  }, []);

  useEffect(() => {
    chatMainRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [Messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return; // Prevent sending empty messages

    try {
      // Sending message to the server
      await axios.post('http://localhost:4000/api/v1/message', {
        message: input,
        senderId, // current user ID
        receiverId, // other user's ID (in this case, the therapist)
      });

      // Clear the input field after sending
      setInput("");

      // Refetch messages after sending
      fetchChatLog();
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

 return (
    <>
      {/* <Navbar/> */}
      <Test />
      <div className="gptMain max-w-screen overflow-x-hidden">
        <div className={"chatMain"}>
          {fetchChatLoading && (
            <div className="h-full w-full text-center flex items-center justify-center">
              <p>Loading...</p>
            </div>
          )}
          {Messages &&
            Messages.map((message, index) => (
              <React.Fragment key={index}>
                {message.senderId===senderId  ? (
                  <div className={"user-message !bg-green-100 "}>
                    <div className={"message max-sm:text-sm rounded-xl "}>
                      <b>You</b>
                      <br />
                      {/* {my_id==message.senderId?message.message:null} */}
                      {message.message}
                    </div>
                  </div>
                ) : <div className={"assistant-message !bg-orange-100"}>
                  <div className={"message max-sm:text-sm rounded-xl"}>
                    <b>{my_role=="pro"?"Patient":"Therapist"}</b>
                    <br />
                     {message.message}
                  </div>
                </div>}
                
              </React.Fragment>
            ))}
          {Messages?.length<1 && !fetchChatLoading && (
            <div className="h-full w-full flex items-center justify-center italic  text-gray-600 ">
              <p>No chats, send the text to start the chat...</p>
            </div>
          )}
          
          <div ref={chatMainRef} />
        </div>

        <div className={"gptInput-container sm:px-28 max-sm:px-5"}>
          <form className={"flex gap-2 w-full"} onSubmit={handleSubmit}>
            <input
              className={"gptInput"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Send a message"
            />
            <button
              className={
                "p-2 rounded-md border-none outline-none bg-[#1ed159] text-white cursor-pointer shadow-md hover:opacity-80"
              }
              type="submit"
              disabled={!input.trim()}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
}

export default SendText;
