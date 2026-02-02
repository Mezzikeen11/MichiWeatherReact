const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.JWT_SECRET || "miclave123";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1]; // Authorization: Bearer <token>

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = { id: decoded.id };
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

module.exports = authMiddleware;
