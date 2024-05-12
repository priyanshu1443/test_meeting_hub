import axios from "axios";
import "../../assets/css/Home/JoinMeeting.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function JoinMeeting() {
  const url = import.meta.env.VITE_APP_URL;
  const navigate = useNavigate();
  const [meetingId, setMeetingId] = useState("");
  const handleJoinMeeting = async () => {
    await axios({
      method: "post",
      url: `${url}/api/joinmeeting`,
      data: { meetingID: meetingId },
    })
    .then((response)=>{
      console.log(response)
      if (response.status === 200){
        navigate(`/Meet/:${meetingId}`)
      }

    })
    .catch((error)=>{
      console.log(error)
    })
    ;
  };
  return (
    <div className="joinmeeting-main-div">
      <div
        className="joinmeeting-insider-div"
        data-aos="fade-up"
        data-aos-duration="500"
        data-aos-easing="ease-in-out"
      >
        <div className="join-meeting-image"></div>
        <div className="join-meeting-fields">
          <p>
            Please enter the provided code to access the Meeting Hub and join
            our session promptly.
          </p>
          <input
            type="text"
            value={meetingId}
            onChange={(e) => {
              setMeetingId(e.target.value);
            }}
            placeholder="Enter Code"
          />
          <br />
          <button onClick={handleJoinMeeting}>Join Now</button>
        </div>
      </div>
    </div>
  );
}

export default JoinMeeting;
