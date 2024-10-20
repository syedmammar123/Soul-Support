import React, { useState, useEffect, useRef } from "react";
import Test from "../components/Test";
import useChat from "../hooks/useChat";

function Chat() {
  const [input, setInput] = useState("");
  const [Messages, setMessages] = useState([]);
  const chatMainRef = useRef(null);

  const { submit, fetchChatLoading, fetchChatLog } = useChat();

  useEffect(() => {
    chatMainRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [Messages]);

  useEffect(() => {
    fetchChatLog();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    submit(input, setMessages, setInput);
  };

  return (
    <>
      {/* <Navbar/> */}
      <Test />
      <div className="gptMain max-w-screen overflow-x-hidden">
        <div className={"chatMain"}>
          {fetchChatLoading && (
            <div className="h-full w-full text-center">
              <p>Loading...</p>
            </div>
          )}
          {Messages &&
            Messages.map((message, index) => (
              <React.Fragment key={index}>
                {message.userMsg !== "" ? (
                  <div className={"user-message"}>
                    <div className={"message max-sm:text-sm rounded-xl"}>
                      <b>You</b>
                      <br />
                      {message.userMsg}
                    </div>
                  </div>
                ) : null}
                <div className={"assistant-message"}>
                  <div className={"message max-sm:text-sm rounded-xl"}>
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
                "p-2 rounded-md border-none outline-none bg-[#313131] text-white cursor-pointer shadow-md hover:opacity-80"
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
export default Chat;
