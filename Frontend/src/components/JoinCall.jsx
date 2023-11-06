import  { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";



const JoinCall = () => {
  const [email, setEmail] = useState("userOne");
  const [room, setRoom] = useState("g");

  const navigate = useNavigate();

  const handleSubmitForm = useCallback(
    (e) => {
      e.preventDefault();
    },
    []
  );

  const handleJoinRoom = useCallback(
    () => {
      
    },
    []
  );

  useEffect(() => {
    return () => {
    };
  }, []);

  return (
    <div>
      <h1>Lobby</h1>
      <form onSubmit={handleSubmitForm}>
        <label htmlFor="email">User name</label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <label htmlFor="room">Room Number</label>
        <input
          type="text"
          id="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
        />
        <br />
        <button>Join</button>
      </form>
    </div>
  );
};

export default JoinCall;
