
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { backendUrl } from "../../constants";



const JoinLiveCall = () => {
  const navigate = useNavigate()
  const {roomId} = useParams()
  const [userName,setUserName] = useState("")
  
  axios.defaults.withCredentials = true;

  const fetchUserDetail = async () => {
  try {
    const response = await axios.get(`${backendUrl}/api/v1/users/getUser`);
    
    const data = response.data.message; 


    setUserName(data.fName + " " +data.lName)

  } catch (error) {
    
    if(error.response && error.response.status === 404 && error.response.data.message==="No user found!"){
      alert("seems like issue in user id :(")
      navigate("/")
    }

    if (error.response && error.response.status === 401) {
    try {
      // Send a request to the refresh-token route
      await axios.post(`${backendUrl}/api/v1/users/refresh-token`);
      
      // Retry the original request after token refresh
      await fetchUserDetail();
    } catch (refreshError) {
      console.error('Error refreshing token:', refreshError);
      navigate(`/login/sessions`)
      // Handle the error when refresh token fails
    }
  } else {
    // Handle other types of errors
    console.error('Error occurred:', error);
  }     
  }
  };

  useEffect(()=>{
        fetchUserDetail();
  },[])



  function randomID(len) {
    let result = "";
    if (result) return result;
    var chars =
        "12345qwertyuiopasdfgh67890jklmnbvcxzMNBVCZXASDQWERTYHGFUIOLKJP",
      maxPos = chars.length,
      i;
    len = len || 5;
    for (i = 0; i < len; i++) {
      result += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return result;
  }


  let sharedLinks = [];


  let myMeeting = async (element) => {
    // generate Kit Token
    const appID = 1893540978;
    const serverSecret = "98903a78bfd68748377dd26ac43f16a5";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      randomID(5),
      userName
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);

    // zp.joinRoom({
    //   container: element,
    //   showAudioVideoSettingsButton: false,
    //   showLayoutButton: false,
    //   showLeavingView: false,
    //   showRoomDetailsButton: false,
    //   preJoinViewConfig: {
    //     title: "Enter Your Name" ,
    //   },
    //   // showPreJoinView: false,
    //   scenario: {
    //     mode: ZegoUIKitPrebuilt.LiveStreaming,
    //     config: {
    //       role:ZegoUIKitPrebuilt.Audience,
    //       liveStreamingMode: ZegoUIKitPrebuilt.LiveStreamingMode,
    //     },
    //   },
    //   sharedLinks,
    //   onLeaveRoom:()=>{navigate('/therapy')}
    //   ,
    // });
    zp.joinRoom({
        container: element,
        sharedLinks,
        scenario: {
          mode: ZegoUIKitPrebuilt.OneONoneCall,
          config: {
            role: "Audience",
          }
        },
        
        turnOnMicrophoneWhenJoining: false,
        turnOnCameraWhenJoining: false,
        showMyCameraToggleButton: true,
        showMyMicrophoneToggleButton: true,
        showAudioVideoSettingsButton: true,
        showScreenSharingButton: false,
        showTextChat: true,
        showUserList: false,
        maxUsers: 2,
        layout: "Auto",
        showLayoutButton: false,
            branding: {
              logoURL: "/images/NavLogo.png" // The branding LOGO URL.
            },
            showRoomTimer:true,
            showRoomDetailsButton:false,
            autoHideFooter:true,
            showAudioVideoSettingsButton:false,
            onLeaveRoom:()=>{navigate('/therapy')},
         
      });
    
  };

  return (
    <>
    {/* <Test/> */}
    <div
      className="myCallContainer"
      ref={myMeeting}
      style={{ width: "100%", height: "100vh" }}
    ></div>
    </>
  );
};

export default JoinLiveCall;
