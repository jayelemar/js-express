const express = require("express");
const { createLeave, getLeaves, getSingleLeave, deleteLeave, updateLeave } = require("../controllers/leaveController");
const protect = require("../middleWare/authMiddleware");

const router = express.Router();

router.post("/", protect, createLeave)
router.get("/", protect, getLeaves)
router.get("/:id", protect, getSingleLeave)
router.delete("/:id", protect, deleteLeave)
router.patch("/:id", protect, updateLeave)

module.exports = router