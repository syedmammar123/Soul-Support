import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { backendUrl } from "../constants";

const useChat = () => {
  axios.defaults.withCredentials = true;
  const navigate = useNavigate();

  const [fetchChatLoading, setFetchChatLoading] = useState(false);

  const fetchChatLog = async (setMessages) => {
    try {
      setFetchChatLoading(true);
      const response = await axios.get(`${backendUrl}/api/v1/chat`);

      const data = response.data.message[0].messages;
      const combinedArray = data.map((item) => ({
        userMsg: item.userMsg,
        gptMessage: item.gptMessage,
      }));

      setMessages(combinedArray);
    } catch (error) {
      if (
        error.response &&
        error.response.status === 404 &&
        error.response.data.message === "No Chat found!"
      ) {
        setMessages([
          {
            userMsg: "",
            gptMessage:
              "Hi, I am your AI friend here to chat you and discuss you your issues, feel free and friendly with me and start the conversation by introducting yourself.",
          },
        ]);
      }
      if (error.response && error.response.status === 401) {
        try {
          // Send a request to the refresh-token route
          await axios.post(`${backendUrl}/api/v1/users/refresh-token`);

          // Retry the original request after token refresh
          await fetchChatLog();
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          navigate("/login/ai-chat");
          // Handle the error when refresh token fails
        }
      } else {
        // Handle other types of errors
        console.error("Error occurred:", error);
      }
    } finally {
      setFetchChatLoading(false);
    }
  };

  const submit = async (input, setMessages, setInput) => {
    if (input.trim() === "") {
      return;
    }

    setInput("");

    const response = await axios.post(`${backendUrl}/api/v1/chat`, {
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
    setInput("");
  };

  return { submit, fetchChatLog, fetchChatLoading };
};

export default useChat;
