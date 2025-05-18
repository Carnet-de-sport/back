const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Accès non autorisé : token manquant" });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET || "dev-secret");
    req.user = payload; // On stocke le user dans la requête pour le resolver
    next();
  } catch (err) {
    return res.status(403).json({ message: "Token invalide ou expiré" });
  }
};
