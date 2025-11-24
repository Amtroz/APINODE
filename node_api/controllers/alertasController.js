const db = require("../config/firebase");

// 1. GET: Leer las alertas reales de la base de datos
// (Antes calculaba, ahora solo lee lo que Django guardó)
exports.getAlertas = async (req, res) => {
  try {
    const snapshot = await db.collection("alertas").get();
    const alertas = [];

    snapshot.forEach(doc => {
      // Devolvemos el documento tal cual está en Firebase
      // Incluimos el ID del documento para poder borrarlo después
      alertas.push({ id: doc.id, ...doc.data() });
    });

    res.status(200).json(alertas);
  } catch (error) {
    res.status(500).send("Error al obtener alertas: " + error.message);
  }
};

// 2. GET BY ID: (Se mantiene igual)
exports.getAlertaById = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await db.collection("alertas").doc(id).get();
    if (!doc.exists) return res.status(404).json({ error: "Alerta no encontrada" });
    res.status(200).json({ id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).send("Error al obtener alerta: " + error.message);
  }
};

// 3. ADD: Crear alerta (Se mantiene igual, Django la llama cuando detecta stock bajo)
exports.addAlerta = async (req, res) => {
  try {
    const nuevo = req.body;
    // Django nos manda el JSON, nosotros solo lo guardamos
    const ref = await db.collection("alertas").add(nuevo);
    res.status(201).json({ id: ref.id });
  } catch (error) {
    res.status(500).send("Error al agregar alerta: " + error.message);
  }
};

// 4. UPDATE: (Se mantiene igual)
exports.updateAlerta = async (req, res) => {
  try {
    const { id } = req.params;
    const datos = req.body;
    await db.collection("alertas").doc(id).set(datos, { merge: true });
    res.json({ mensaje: "Alerta actualizada" });
  } catch (error) {
    res.status(500).send("Error al actualizar alerta: " + error.message);
  }
};

// 5. DELETE: Borrar alerta (Se mantiene igual, Django la llama cuando recuperas stock)
exports.deleteAlerta = async (req, res) => {
  try {
    const { id } = req.params;
    await db.collection("alertas").doc(id).delete();
    res.json({ mensaje: "Alerta eliminada" });
  } catch (error) {
    res.status(500).send("Error al eliminar alerta: " + error.message);
  }
};