// src/modules/staff/staffs.routes.js
const express = require("express");
const router = express.Router();

const profileRoutes = require("./profiles/profiles.routes");
const departmentRoutes = require("./departments/departments.routes");
const capabilityRoutes = require("./capabilities/capabilities.routes");

router.use("/profiles", profileRoutes);
router.use("/departments", departmentRoutes);
router.use("/capabilities", capabilityRoutes);

module.exports = router;