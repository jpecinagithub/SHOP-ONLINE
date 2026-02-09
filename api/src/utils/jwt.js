const jwt = require("jsonwebtoken");

const accessTtl = process.env.JWT_ACCESS_TTL || "15m";
const issuer = process.env.JWT_ISSUER || "shop-online";
const audience = process.env.JWT_AUDIENCE || "shop-online-users";

function signAccessToken(payload) {
  return jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: accessTtl,
    issuer,
    audience,
  });
}

function verifyAccessToken(token) {
  return jwt.verify(token, process.env.JWT_SECRET, {
    issuer,
    audience,
  });
}

module.exports = { signAccessToken, verifyAccessToken };
