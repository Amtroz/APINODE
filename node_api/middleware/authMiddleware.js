//Clave simple debido a problemas con el POSTMAN
const API_KEY = "clave123"; 

function verificarClave(req, res, next) {
    const clave = req.header("Clave-De-Autenticacion");

    if (!clave || clave !== API_KEY) {
        return res.status(401).json({ error: "Clave de autenticación inválida o faltante" });
    }

    next(); 
}

module.exports = verificarClave;
