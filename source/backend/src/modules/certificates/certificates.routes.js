const express = require("express");

const router = express.Router();

const { ROLES, ROUTES } = require("../../constants");

const { authenticate, authorize } = require("../../middlewares");

router.get(ROUTES.CERTIFICATE.ROOT, controller.getList);

router.post(ROUTES.CERTIFICATE.ROOT, controller.create);

router.get(ROUTES.CERTIFICATE.DETAIL, controller.getById);

router.patch(ROUTES.CERTIFICATE.DETAIL, controller.update);

router.delete(ROUTES.CERTIFICATE.DETAIL, controller.remove);

router.get(ROUTES.CERTIFICATE.DOWNLOAD, controller.download);

router.patch(ROUTES.CERTIFICATE.REVOKE, controller.revoke);

module.exports = router;
