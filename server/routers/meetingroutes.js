import express from 'express'
import cors from 'cors'
import { CreateMeeting, FindMeeting } from "../controllers/meetingControllers.js"

const router = express.Router()


router.post("/createmeeting", CreateMeeting)
router.post("/joinmeeting", FindMeeting)

export default router
