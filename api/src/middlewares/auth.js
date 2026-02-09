const { verifyAccessToken } = require("../utils/jwt");

function requireAuth(req, res, next) {
  const header = req.headers.authorization || "";
  const [, token] = header.split(" ");
  if (!token) {
    return res.status(401).json({ error: "Missing access token" });
  }

  try {
    const payload = verifyAccessToken(token);
    req.user = {
      id: Number(payload.sub),
      email: payload.email,
    };
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid access token" });
  }
}

module.exports = { requireAuth };
