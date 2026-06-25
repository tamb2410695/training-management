const router = require("express").Router();

router.use("/auth", require("../modules/auth/auth.routes"));

router.use("/accounts", require("../modules/accounts/accounts.routes"));

router.use("/students", require("../modules/students/students.routes"));

router.use("/instructors", require("../modules/instructors/instructors.routes"));

router.use("/courses", require("../modules/courses/courses.routes"));

router.use("/classes", require("../modules/classes/classes.routes"));

router.use("/enrollments", require("../modules/enrollments/enrollments.routes"));

module.exports = router;
