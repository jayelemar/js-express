const express = require("express");
const { createLeave, getLeaves, getSingleLeave, deleteLeave, updateLeave } = require("../controllers/leaveController");
const protect = require("../middleWare/authMiddleware");

const router = express.Router();
router.use(protect);

router.post("/", createLeave)
router.get("/", getLeaves)
router.get("/:id", getSingleLeave)
router.delete("/:id", deleteLeave)
router.patch("/:id", updateLeave)

module.exports = router