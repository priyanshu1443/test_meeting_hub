import axios from "axios";
import "../../assets/css/Home/CreateMeeting.css";
import { useState } from "react";
function CreateMeetingPage() {
  const url = import.meta.env.VITE_APP_URL;
  const [meetingName, setMeetingName] = useState("");
  const [meeting_created, setMeetingCreated] = useState(false);
  const [meetingID , setMeetingId] = useState("");
  const handleMeetingCreation = async () => {
    await axios({
      method: "post",
      url: `${url}/api/createmeeting`,
      data: { meetingName: meetingName },
    })
      .then((response) => {
        console.log(response.data);
        setMeetingId(response.data.meetingId)
        setMeetingName(response.data.meetingName)
        setMeetingCreated(true)

      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div className="createmeeting-main-div">
      <div
        className="createmeeting-insider-div"
        data-aos="fade-up"
        data-aos-duration="500"
        data-aos-easing="ease-in-out"
      >
        <div className="meeting-image"></div>
        <div className="meeting-fields">
          <p>
            Let{"'"}s craft our virtual gathering with Meeting Hub, ensuring a
            seamless experience for all attendees.
          </p>
          {meeting_created ? (
            <>
              <h6>meeting name : {meetingName}</h6>
              <br />
              <h6>Code:{meetingID}</h6>
              <button>Go to meeting</button>
              <br />
            </>
          ) : (
            <>
              <input
                type="text"
                value={meetingName}
                onChange={(e) => {
                  setMeetingName(e.target.value);
                }}
                placeholder="Enter meeting name"
              />
              <br />
              <button onClick={handleMeetingCreation}>create</button>
              <br />
            </>
          )}

          <span>
            Share the key to connect effortlessly – send the link or code to
            your desired attendees and gather for a smooth, secure meeting
            experience.
          </span>
        </div>
      </div>
    </div>
  );
}

export default CreateMeetingPage;
