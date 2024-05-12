import { useParams } from "react-router-dom";
import "../../assets/css/Home/MainMeetingPage.css";
import { My_app } from './PeerConnection';
import { useEffect } from "react";


function MainMeetingPage() {
  let { meetingID } = useParams();
  useEffect(() => {
    My_app._init("mayank", meetingID)
  }, [])

  return (

    <>
      <div id="main" style={{ marginTop: "50px" }}>
        <div
          id="users"
          style={{ border: "2px solid green", width: "100%", height: "100%" }}
        >
          <div>
            <div id="mic_mute_unmute">mic is off</div>
            <div id="vidoe_cam_on_off">video is off</div>
            <div id="screen_share_on_off">Screen share</div>
          </div>
          <div
            id="usertemplate"
            style={{
              display: "none",
              border: "2px solid yellow",
              width: 300,
              height: 300,
            }}
          >
            <h2 id="me" />
            <div>
              <video
                width="300px"
                height="300px"
                autoPlay
                id="localVidoPlayer"
              />
            </div>
          </div>
          <div
            id="other_Template"
            style={{
              display: "none",
              border: "2px solid red",
              width: 400,
              height: 400,
            }}
          >
            <h2 />
            <div>
              <video width="300px" height="300px" autoPlay />
              <audio autoPlay controls />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainMeetingPage;
