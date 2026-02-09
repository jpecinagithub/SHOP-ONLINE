const authService = require("../services/authService");

function badRequest(res, message) {
  return res.status(400).json({ error: message });
}

async function register(req, res, next) {
  try {
    const { email, password, firstName, lastName, phone } = req.body || {};
    if (!email || !password || !firstName || !lastName) {
      return badRequest(res, "Missing required fields");
    }
    const result = await authService.register({ email, password, firstName, lastName, phone });
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
}

async function login(req, res, next) {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return badRequest(res, "Missing credentials");
    }
    const result = await authService.login({ email, password });
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function refresh(req, res, next) {
  try {
    const { refreshToken } = req.body || {};
    if (!refreshToken) {
      return badRequest(res, "Missing refresh token");
    }
    const result = await authService.refresh({ refreshToken });
    res.json(result);
  } catch (err) {
    next(err);
  }
}

async function logout(req, res, next) {
  try {
    const { refreshToken } = req.body || {};
    if (!refreshToken) {
      return badRequest(res, "Missing refresh token");
    }
    const result = await authService.logout({ refreshToken });
    res.json(result);
  } catch (err) {
    next(err);
  }
}

module.exports = { register, login, refresh, logout };
