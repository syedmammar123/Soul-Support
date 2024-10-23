import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { io } from "socket.io-client"; // Import socket.io-client
import Test from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import Spinner from "../components/Spinner";

function SendText() {
  const [input, setInput] = useState("");
  const [Messages, setMessages] = useState([]);
  const [fetchChatLoading, setFetchChatLoading] = useState(true);
  const chatMainRef = useRef(null);
  const { patientId, therapistId } = useParams();
  const authUser = useAuthStore((state) => state.authUser);

  const senderId = authUser._id;
  const receiverId = authUser._id === patientId ? therapistId : patientId;
  const my_role = authUser.role;

  // Initialize Socket.IO connection
  const socket = useRef(null);

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
    socket.current = io("http://localhost:4000");

    // Listen for incoming messages
    socket.current.on("receiveMessage", (newMessage) => {
      if (
        (newMessage.senderId == patientId ||
          newMessage.senderId == therapistId) &&
        (newMessage.receiverId == patientId ||
          newMessage.receiverId == therapistId)
      )
        setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    fetchChatLog();

    return () => {
      socket.current.disconnect();
    };
  }, []);

  // Scroll to the latest message
  useEffect(() => {
    chatMainRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [Messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    try {
      // Sending message to the server
      const response = await axios.post(
        "http://localhost:4000/api/v1/message",
        {
          message: input,
          senderId,
          receiverId,
        }
      );

      setInput("");

      // Emit the new message to the socket
      socket.current.emit("sendMessage", response.data.data);
    } catch (error) {
      console.error("Failed to send message", error);
    }
  };

  return (
    <>
      <Test />
      <div className="gptMain max-w-screen overflow-x-hidden">
        <div className={"chatMain"}>
          {fetchChatLoading && (
            <div className="h-full w-full text-center flex items-center justify-center">
              <Spinner/>
            </div>
          )}
          {Messages &&
            Messages.map((message, index) => (
              <React.Fragment key={index}>
                {message.senderId === senderId ? (
                  <div className={"user-message !bg-green-100 "}>
                    <div className={"message max-sm:text-sm rounded-xl "}>
                      <b>You</b>
                      <br />
                      {message.message}
                    </div>
                    <p className="text-xs italic text-gray-400 ml-1 mt-1">
                      {new Date(message.createdAt).toLocaleString(undefined, {
                        hour: "2-digit",
                        minute: "2-digit",
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </p>
                  </div>
                ) : (
                  <>
                    {message.message != null && (
                      <div className={"assistant-message !bg-orange-100"}>
                        <div
                          className={"message max-sm:text-sm rounded-xl  ml-1"}
                        >
                          <b>{my_role === "pro" ? "Patient" : "Therapist"}</b>
                          <br />
                          {message.message}
                        </div>
                        <p className="text-xs italic text-gray-400 ml-1 mt-1">
                          {new Date(message.createdAt).toLocaleString(
                            undefined,
                            {
                              hour: "2-digit",
                              minute: "2-digit",
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </p>
                      </div>
                    )}
                  </>
                )}
              </React.Fragment>
            ))}
          {Messages?.length < 1 && !fetchChatLoading && (
            <div className="h-full w-full flex items-center justify-center italic text-gray-600 ">
              <p>No chats, send the text to start the chat...</p>
            </div>
          )}

          <div className="mt-16" ref={chatMainRef} />
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
