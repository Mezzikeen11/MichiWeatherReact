const db = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const JWT_SECRET = "supersecreto123"; // ..

// ---------------------- REGISTRO ----------------------
const register = async (req, res) => {
  try {
    const { nombre, email, password } = req.body;

    const existe = await db("usuarios").where({ email }).first();
    if (existe) return res.status(400).json({ message: "Usuario ya registrado" });

    const hashed = await bcrypt.hash(password, 10);

    await db("usuarios").insert({
      nombre,
      email,
      password: hashed,
    });

    res.json({ message: "Usuario registrado correctamente" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

// ---------------------- LOGIN ----------------------
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await db("usuarios").where({ email }).first();

    if (!user) return res.status(400).json({ message: "Usuario no encontrado" });

    const esValida = await bcrypt.compare(password, user.password);
    if (!esValida) return res.status(400).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: "1d" });

    return res.json({
      message: "Login exitoso",
      token,
      nombre: user.nombre,     // ...
      email: user.email,       // ...
      id: user.id              
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error en el servidor" });
  }
};

module.exports = { register, login };
