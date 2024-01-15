const asyncHandler = require("express-async-handler");
const Leave = require("../models/leaveModel");
const { param } = require("../routes/userRoute");


const createLeave = asyncHandler(async ( req, res) => {
    const data = req.body
    console.log('Received data:', data);
    const { leaveType, startDate, endDate, note } = data;

    if( !leaveType || !startDate || !endDate || !note ) {
      res.status(400);
      throw new Error("Please fill in all fields");
    }

    // Create Leave
    const leave = await Leave.create({
      user: req.user.id,
      leaveType,
      startDate,
      endDate,
      note,
    })
    res.status(201).json(leave)
});

const getLeaves = asyncHandler(async ( req, res) => {
  const leaves = await Leave
    .find({ user: req.user.id })
    .sort("-createdAt") // sort from latest to oldest
    res.status(200).json(leaves)
});

const getSingleLeave = asyncHandler(async ( req, res) => {
  const leave = await Leave.findById(req.params.id)

  //Check if leave doesnt exist 
  if(!leave) {
    res.status(404)
    throw new Error("Leave Not Found")
  }

  // Match Leave to its user
  if(leave.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("User not authorized")
  }

  res.status(200).json(leave);
});

const deleteLeave = asyncHandler(async ( req, res) => {
  const leave = await Leave.findById(req.params.id)

    //Check if leave doesnt exist 
  if(!leave) {
    res.status(404)
    throw new Error("Leave doesnt found")
  }

  // Match Leave to its user
  if(leave.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error("User not authorized")
  }

  await leave.deleteOne();
  res.status(200).json({ message: "Leave Deleted."});

});

const updateLeave = asyncHandler(async ( req, res) => {
  const { leaveType, status, startDate, endDate, note } = req.body
  const { id } = req.params

  const leave = await Leave.findById(id)

 // if Leave doesnt found
  if(!leave) {
    res.status(404)
    throw new Error("Leave not found")
  }

  // Match leave to its user
  if( leave.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error ("User not authorized")
  }

  const updatedLeave = await Leave.findByIdAndUpdate(
    {_id: id },
    {
      leaveType,
      startDate,
      endDate,
      note,
    },
    {
      new: true,
      runValidators:true,
    }
  )

  res.status(200).json(updatedLeave)

});




module.exports = {
  createLeave, getLeaves, getSingleLeave, deleteLeave, updateLeave
}