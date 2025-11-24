const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/productosController");
//const verificarClave = require("../middleware/authMiddleware");

router.get("/", ctrl.getProductos);
router.get("/:id", ctrl.getProductoById);
router.post("/", ctrl.addProducto);
router.put("/:id", ctrl.updateProducto);
router.delete("/:id", ctrl.deleteProducto);

module.exports = router;
