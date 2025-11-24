const express = require("express");
const router = express.Router();
const admin = require("firebase-admin");

const db = admin.firestore();

router.get("/", async (req, res) => {
  try {
    const snapshot = await db.collection("productos").get();

    let total = 0;
    let bajoStock = 0;

    snapshot.forEach((doc) => {
      total++;
      const data = doc.data();

      if (data.stock !== undefined && data.stock <= 5) {
        bajoStock++;
      }
    });

    res.json({
      total,
      bajo_stock: bajoStock,
    });
  } catch (error) {
    console.error("Error en /api/stats:", error);
    res.status(500).json({ error: "Error obteniendo estadísticas" });
  }
});

module.exports = router;
