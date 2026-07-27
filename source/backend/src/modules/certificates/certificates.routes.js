const express = require("express");

const router = express.Router();

const { ROLES, ROUTES } = require("../../constants");

const { authenticate, authorize } = require("../../middlewares");

const certificatesController = require("./certificates.controller");

router.get(ROUTES.CERTIFICATE.ROOT, certificatesController.getList);

router.post(ROUTES.CERTIFICATE.ROOT, certificatesController.create);

router.get(ROUTES.CERTIFICATE.DETAIL, certificatesController.getById);

// router.patch(ROUTES.CERTIFICATE.DETAIL, certificatesController.update);

// router.delete(ROUTES.CERTIFICATE.DETAIL, certificatesController.remove);

// router.get(ROUTES.CERTIFICATE.DOWNLOAD, certificatesController.download);

// router.patch(ROUTES.CERTIFICATE.REVOKE, certificatesController.revoke);

module.exports = router;
