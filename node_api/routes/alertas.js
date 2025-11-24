const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/alertasController");
//const verificarClave = require("../middleware/authMiddleware");

router.get("/", ctrl.getAlertas);
router.get("/:id", ctrl.getAlertaById);
router.post("/", ctrl.addAlerta);
router.put("/:id", ctrl.updateAlerta);
router.delete("/:id", ctrl.deleteAlerta);

module.exports = router;
