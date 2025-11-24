const express = require("express");
const cors = require("cors");
const os = require("os");
const admin = require("firebase-admin");
const { getApps, initializeApp } = require("firebase-admin/app");

// Routers
const productosRouter = require("./routes/productos");
const movimientosRouter = require("./routes/movimientos");
const alertasRouter = require("./routes/alertas");
const statsRouter = require("./routes/stats");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ============================
//   🔥 INICIALIZAR FIREBASE SOLO SI NO EXISTE
// ============================
const serviceAccount = require("./config/serviceAccountKey.json");

if (!getApps().length) {
  initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

app.use("/api/stats", statsRouter);

const PORT = process.env.PORT || 4000;

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (let iface in interfaces) {
    for (let alias of interfaces[iface]) {
      if (alias.family === "IPv4" && !alias.internal) {
        return alias.address;
      }
    }
  }
  return "127.0.0.1";
}

app.get("/", (req, res) => {
  res.send(`
        <h2>API StockFlow – Sistema de Inventario</h2>
        <p>Rutas disponibles:</p>
        <ul>
            <li><a href="/productos">/productos</a></li>
            <li><a href="/movimientos">/movimientos</a></li>
            <li><a href="/alertas">/alertas</a></li>
            <li><a href="/api/stats">/api/stats</a></li>
        </ul>
    `);
});

app.use("/productos", productosRouter);
app.use("/movimientos", movimientosRouter);
app.use("/alertas", alertasRouter);

app.listen(PORT, "0.0.0.0", () => {
  const localIP = getLocalIP();
  console.log("==============================");
  console.log(`Servidor StockFlow corriendo en:`);
  console.log(` → Local: http://localhost:${PORT}`);
  console.log(` → Red:   http://${localIP}:${PORT}`);
  console.log("==============================");
});
