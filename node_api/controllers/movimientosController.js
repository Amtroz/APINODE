const db = require("../config/firebase");

exports.getMovimientos = async (req, res) => {
  try {
    const snapshot = await db.collection("movimientos").get();
    const arr = [];
    snapshot.forEach(doc => arr.push({ id: doc.id, ...doc.data() }));
    res.status(200).json(arr);
  } catch (error) {
    res.status(500).send("Error al obtener movimientos: " + error.message);
  }
};

exports.getMovimientoById = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection("movimientos").doc(id).get();
    if (!doc.exists) return res.status(404).json({ error: "Movimiento no encontrado" });
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).send("Error al obtener movimiento: " + error.message);
  }
};

exports.addMovimiento = async (req, res) => {
  try {
    const nuevo = req.body; 
    const ref = await db.collection("movimientos").add(nuevo);
    res.status(201).json({ id: ref.id });
  } catch (error) {
    res.status(500).send("Error al agregar movimiento: " + error.message);
  }
};

exports.updateMovimiento = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = req.body;
    await db.collection("movimientos").doc(id).set(datos, { merge: true });
    res.json({ mensaje: "Movimiento actualizado" });
  } catch (error) {
    res.status(500).send("Error al actualizar movimiento: " + error.message);
  }
};

exports.deleteMovimiento = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("movimientos").doc(id).delete();
    res.json({ mensaje: "Movimiento eliminado" });
  } catch (error) {
    res.status(500).send("Error al eliminar movimiento: " + error.message);
  }
};
