const { ROUTES } = require("../constants");

const router = require("express").Router();

router.use(ROUTES.AUTH.BASE, require("../modules/auth/auth.routes"));

router.use(ROUTES.ACCOUNT.BASE, require("../modules/accounts/accounts.routes"));

router.use(
  ROUTES.DOCUMENT.BASE,
  require("../modules/documents/documents.routes"),
);

router.use(
  ROUTES.COURSE.BASE,
  require("../modules/courses/courses.routes"),
);

router.use(
  ROUTES.CLASS.BASE,
  require("../modules/classes/classes.routes"),
);

router.use(
  ROUTES.CERTIFICATE.BASE,
  require("../modules/certificates/certificates.routes"),
);
router.use(
  ROUTES.DEPARTMENT.BASE,
  require("../modules/departments/departments.routes"),
);
router.use(ROUTES.STAFF.BASE, require("../modules/staffs/staffs.routes"));

router.use(
  ROUTES.REGISTRATION.BASE,
  require("../modules/registrations/registrations.routes"),
);

router.use(ROUTES.STUDENT.BASE, require("../modules/students/students.routes"));

router.use(ROUTES.ROOM.BASE, require("../modules/rooms/rooms.routes"));

router.use(
  ROUTES.ENROLLMENT.BASE,
  require("../modules/enrollments/enrollments.routes"),
);
router.use(
  ROUTES.PAYMENT.BASE,
  require("../modules/payments/payments.routes"),
);


module.exports = router;
