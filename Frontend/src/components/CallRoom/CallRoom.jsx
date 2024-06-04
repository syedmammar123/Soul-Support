// import React, { useEffect, useCallback, useState, useRef, } from "react";
// import ReactPlayer from "react-player";
// import peer from "../../service/peer";
// import './CallRoom.css'
// import { useSocket } from "../context/SocketProvider";
// import { useNavigate } from "react-router-dom";

// const CallRoom = () => {

//     const navigate = useNavigate()
//   const socket = useSocket();
//   const [remoteSocketId, setRemoteSocketId] = useState(null);
//   const [myStream, setMyStream] = useState();
//   const [remoteStream, setRemoteStream] = useState();
//   const [isClicked, setIsClicked] = useState(false);
//   const [isSendClicked, setIsSendClicked] = useState(false);

//   const handleUserJoined = useCallback(({  email,id }) => {
//     console.log(`Id ${id} joined room`);
//     setRemoteSocketId(id);
//   }, []);

//   const handleCallUser = useCallback(async () => {
//     setIsClicked(true);
    
//     const stream = await navigator.mediaDevices.getUserMedia({
//       audio: true,
//       video: true,
//     });
   
//     const offer = await peer.getOffer();
//     socket.emit("user:call", { to: remoteSocketId, offer });
//     setMyStream(stream);
//   }, [remoteSocketId, socket]);

//   const handleIncommingCall = useCallback(
//     async ({ from, offer }) => {
//       setRemoteSocketId(from);
//       const stream = await navigator.mediaDevices.getUserMedia({
//         audio: true,
//         video: true,
//       });
//       setMyStream(stream);
//       console.log(`Incoming Call`, from, offer);
//       const ans = await peer.getAnswer(offer);
//       socket.emit("call:accepted", { to: from, ans });
//     },
//     [socket]
//   );

//   const sendStreams = useCallback(() => {
//     setIsSendClicked(true);
//     for (const track of myStream.getTracks()) {
//       peer.peer.addTrack(track, myStream);
//     }
//   }, [myStream]);

//   const handleCallAccepted = useCallback(
//     ({ from, ans }) => {
//       peer.setLocalDescription(ans);
//       console.log("Call Accepted!");
//       sendStreams();
//     },
//     [sendStreams]
//   );

//   const handleNegoNeeded = useCallback(async () => {
//     const offer = await peer.getOffer();
//     socket.emit("peer:nego:needed", { offer, to: remoteSocketId });
//   }, [remoteSocketId, socket]);

//   useEffect(() => {
//     peer.peer.addEventListener("negotiationneeded", handleNegoNeeded);
//     return () => {
//       peer.peer.removeEventListener("negotiationneeded", handleNegoNeeded);
//     };
//   }, [handleNegoNeeded]);

//   const handleNegoNeedIncomming = useCallback(
//     async ({ from, offer }) => {
//       const ans = await peer.getAnswer(offer);
//       socket.emit("peer:nego:done", { to: from, ans });
//     },
//     [socket]
//   );
 
//   const handleNegoNeedFinal = useCallback(async ({ ans }) => {
//     await peer.setLocalDescription(ans);
//   }, []);

//   useEffect(() => {
//     peer.peer.addEventListener("track", async (ev) => {
//       const remoteStream = ev.streams;
//       console.log("GOT TRACKS!!");
//       setRemoteStream(remoteStream[0]);
//     });
//   }, []);

//   useEffect(() => {
//     socket.on("user:joined", handleUserJoined);
//     socket.on("incomming:call", handleIncommingCall);
//     socket.on("call:accepted", handleCallAccepted);
//     socket.on("peer:nego:needed", handleNegoNeedIncomming);
//     socket.on("peer:nego:final", handleNegoNeedFinal);

//     return () => {
//       socket.off("user:joined", handleUserJoined);
//       socket.off("incomming:call", handleIncommingCall);
//       socket.off("call:accepted", handleCallAccepted);
//       socket.off("peer:nego:needed", handleNegoNeedIncomming);
//       socket.off("peer:nego:final", handleNegoNeedFinal);
//     };
//   }, [
//     socket,
//     handleUserJoined,
//     handleIncommingCall,
//     handleCallAccepted,
//     handleNegoNeedIncomming,
//     handleNegoNeedFinal,
//   ]);

  
//   const toggleCamera = async () => {
//     let videoTrack = myStream.getTracks().find(track => track.kind === 'video')
//     console.log(videoTrack)

//     if(videoTrack.enabled){
//       console.log("CameraTouched")

//         videoTrack.enabled = false
//         document.getElementById('camera-btn').style.backgroundColor = 'rgb(255, 80, 80)'
//     }else{
//         videoTrack.enabled = true
//         document.getElementById('camera-btn').style.backgroundColor = 'rgb(179, 102, 249, .9)'
//     }
// }

// const toggleMic = async () => {
//   console.log("mictouched")
//   let audioTrack = myStream.getTracks().find(track => track.kind === 'audio')

//   if(audioTrack.enabled){
//       audioTrack.enabled = false
//       document.getElementById('mic-btn').style.backgroundColor = 'rgb(255, 80, 80)'
//   }else{
//       audioTrack.enabled = true
//       document.getElementById('mic-btn').style.backgroundColor = 'rgb(179, 102, 249, .9)'
//   }
// }
// const endCall = () => {
//     navigate('/therapy')
//   };
  
//   return (
//     <div  >
//       {!remoteStream && remoteSocketId ? (
//         <h1>Therapy Room</h1>) 
//         : !remoteStream && !remoteSocketId ? (
//        <h1>Waiting Room</h1>) 
//        : null}

//  {remoteSocketId ? null : <h4>Please wait...</h4>}

//        {myStream && remoteStream && <button className={isSendClicked ? 'clicked' : ''} onClick={sendStreams}>Share Webcam & Mic</button>}
           
//       {!remoteStream ? remoteSocketId  && <button onClick={handleCallUser} 
//        className={isClicked ? 'clicked' : ''}>Call</button> :""}
//        {!remoteStream ? remoteSocketId && isClicked?<h3>Waiting for user to share his media </h3>:"" :""}
 
//        <div className="videos">
//       {myStream && (
//         <>
//           <ReactPlayer
//             className="video-player"
//             id="user-1"
//             playsInline
//             playing
//             muted
//             url={myStream}
//           />
//         </>
//       )}
//       {remoteStream && (
//         <>
//           <ReactPlayer
//             playing
//             className="video-player2"
//             id="user-2"
//             // muted
//             url={remoteStream}
//           />
//         </>
//       )}
    
//     </div>
//       {myStream && remoteStream && <div id="controls">

//         <div onClick={toggleCamera} className="control-container" id="camera-btn">
//           <img src="https://cdn-icons-png.flaticon.com/512/83/83574.png" alt="" />
//         </div>

//         <div onClick={toggleMic} className="control-container" id="mic-btn">
//           <img src="https://www.iconpacks.net/icons/1/free-microphone-icon-342-thumb.png" alt="" />
//         </div>

//       <div onClick={endCall} className="control-container" id="leave-btn">
//         <img src="https://static.thenounproject.com/png/2515363-200.png" alt="" />
//        </div>
//       </div>}
      
//     </div>
//   );
// };

// export default CallRoom;
