const jwt = require("jsonwebtoken");

function checkAuth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({
      error: "Token Missing",
    });
  }
  try {
    const decoded = jwt.verify(authHeader, "vikas-secret-key");
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      error: "Invalid Token",
    });
  }
}
module.exports = checkAuth;
