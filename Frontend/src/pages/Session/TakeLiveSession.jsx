import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import Test from "../../components/Navbar";
import { backendUrl } from "../../constants";

const TakeLiveSession = () => {
  const navigate = useNavigate();

  const { roomId } = useParams();
  const [userName, setUserName] = useState("");

  axios.defaults.withCredentials = true;

  const fetchUserDetail = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/v1/users/getUser`);

      const data = response.data.message;

      if (data.role != "pro") {
        navigate("/");
      }

      setUserName(data.fName + " " + data.lName);
    } catch (error) {
      if (
        error.response &&
        error.response.status === 404 &&
        error.response.data.message === "No user found!"
      ) {
        alert("seems like issue in user id :(");
        navigate("/");
      }

      if (error.response && error.response.status === 401) {
        try {
          // Send a request to the refresh-token route
          await axios.post(`${backendUrl}/api/v1/users/refresh-token`);

          // Retry the original request after token refresh
          await fetchUserDetail();
        } catch (refreshError) {
          console.error("Error refreshing token:", refreshError);
          navigate(`/login/therapist`);
          // Handle the error when refresh token fails
        }
      } else {
        // Handle other types of errors
        console.error("Error occurred:", error);
      }
    }
  };

  useEffect(() => {
    fetchUserDetail();
  }, []);

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

  sharedLinks.push({
    name: "Join Now!",
    url: window.location.href.replace("/therapist", ""),
  });

  let myMeeting = async (element) => {
    // generate Kit Token
    const appID = 683948355;
    const serverSecret = "021d4e0c0dcb7a0336f5de0858bb8066";
    const kitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      roomId,
      randomID(5),
      userName
    );

    const zp = ZegoUIKitPrebuilt.create(kitToken);

    zp.joinRoom({
      container: element,
      showAudioVideoSettingsButton: false,
      showLayoutButton: false,
      showLeavingView: false,
      showRoomDetailsButton: false,
      preJoinViewConfig: {
        title: "Enter Your Name",
      },
      //   showPreJoinView: false,
      scenario: {
        mode: ZegoUIKitPrebuilt.LiveStreaming,
        config: {
          role: ZegoUIKitPrebuilt.Host,
          liveStreamingMode: ZegoUIKitPrebuilt.LiveStreamingMode,
        },
      },
      sharedLinks,
      onLeaveRoom: () => {
        navigate("/therapist");
      },
    });
  };

  return (
    <>
      <Test />
      <div
        className="myCallContainer"
        ref={myMeeting}
        style={{ width: "100%", height: "90vh" }}
      ></div>
    </>
  );
};

export default TakeLiveSession;
