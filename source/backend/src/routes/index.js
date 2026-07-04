const { ROUTES } = require("../constants");

const router = require("express").Router();

router.use(ROUTES.AUTH.BASE, require("../modules/auth/auth.routes"));

router.use(ROUTES.ACCOUNT.BASE, require("../modules/accounts/accounts.routes"));

router.use(ROUTES.DOCUMENT.BASE, require("../modules/documents/documents.routes"));

router.use(ROUTES.STAFF.BASE, require("../modules/staffs/staffs.routes"));

router.use(
  ROUTES.REGISTRATION.BASE,
  require("../modules/registrations/registrations.routes"),
);

router.use(ROUTES.STUDENT.BASE, require("../modules/students/students.routes"));


module.exports = router;
