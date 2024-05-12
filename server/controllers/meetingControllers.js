import randomId from 'random-id'
import { Meetings } from "../models/MeetingModel.js"

export const CreateMeeting = async (req, res) => {
    const { meetingName } = req.body

    const randomid = randomId(10, 'aA0')

    try {
        if (meetingName && randomid) {
            const newMeeting = await Meetings.create({
                name: meetingName,
                id: randomid
            })
            res.status(200).send({ message: "Meeting create sucessfully", meetingName: newMeeting.name, meetingId: newMeeting.id })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Server error" })
    }
}


export const FindMeeting = async (req, res) => {
    const { meetingID } = req.body
    console.log(meetingID)
    try {
        const meeting = await Meetings.findOne({ id: meetingID })
        if (meeting) {
            res.status(200).send({ name: meeting.name })
        } else {
            res.status(404).send({ message: 'Meeting not found' })
        }
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Server error" })
    }
}
