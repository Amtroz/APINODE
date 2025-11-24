const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/movimientosController");
//const verificarClave = require("../middleware/authMiddleware");

router.get("/", ctrl.getMovimientos);
router.get("/:id", ctrl.getMovimientoById);
router.post("/", ctrl.addMovimiento);
router.put("/:id", ctrl.updateMovimiento);
router.delete("/:id", ctrl.deleteMovimiento);

module.exports = router;
