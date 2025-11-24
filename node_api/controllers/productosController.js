const db = require("../config/firebase");

exports.getProductos = async (req, res) => {
  try {
    const snapshot = await db.collection("productos").get();
    const arr = [];
    snapshot.forEach(doc => arr.push({ id: doc.id, ...doc.data() }));
    res.status(200).json(arr);
  } catch (error) {
    res.status(500).send("Error al obtener productos: " + error.message);
  }
};

exports.getProductoById = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection("productos").doc(id).get();
    if (!doc.exists) return res.status(404).json({ error: "Producto no encontrado" });
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).send("Error al obtener producto: " + error.message);
  }
};

exports.addProducto = async (req, res) => {
  try {
    const nuevo = req.body;
    const ref = await db.collection("productos").add(nuevo);
    res.status(201).json({ id: ref.id });
  } catch (error) {
    res.status(500).send("Error al agregar producto: " + error.message);
  }
};

exports.updateProducto = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = req.body;
    await db.collection("productos").doc(id).set(datos, { merge: true });
    res.json({ mensaje: "Producto actualizado" });
  } catch (error) {
    res.status(500).send("Error al actualizar producto: " + error.message);
  }
};

exports.deleteProducto = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("productos").doc(id).delete();
    res.json({ mensaje: "Producto eliminado" });
  } catch (error) {
    res.status(500).send("Error al eliminar producto: " + error.message);
  }
};
