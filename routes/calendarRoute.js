const express = require("express");
const { createEvent } = require("../controllers/calendarController");
const protect = require("../middleWare/authMiddleware");

const router = express.Router();

router.post("/", protect, createEvent)

module.exports = router