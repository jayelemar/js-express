const asyncHandler = require("express-async-handler");
const Event = require("../models/calendarModel");
const moment = require("moment")

const createEvent = asyncHandler(async ( req, res) => {
  const {start, end, title} = req.body

  if( !start || !end || !title ) {
    res.status(400)
    throw new Error("Please fill in all fields")
  }

  // Create Event
  const event = await Event.create({
    user: req.user.id,
    start,
    end,
    title,
  })
  res.status(201).json(event)

});

// const getEvents = asyncHandler(async ( req, res) => {

// });

module.exports = {
  createEvent,
}