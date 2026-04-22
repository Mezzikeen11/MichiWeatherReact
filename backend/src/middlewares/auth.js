const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const secretKey = process.env.JWT_SECRET;

  if (!secretKey) {
    return res.status(500).json({ message: "JWT_SECRET no está configurado" });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: "No token provided" });

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, secretKey);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
};

module.exports = authMiddleware;
