const crypto = require("crypto");
const bcrypt = require("bcryptjs");

const authRepository = require("../repositories/authRepository");
const { signAccessToken } = require("../utils/jwt");

const refreshTtlDays = Number(process.env.JWT_REFRESH_TTL_DAYS || 30);

function hashToken(token) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

function createRefreshTokenValue() {
  return crypto.randomBytes(64).toString("hex");
}

function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function sanitizeCustomer(row) {
  return {
    id: row.id,
    email: row.email,
    firstName: row.first_name,
    lastName: row.last_name,
    phone: row.phone,
    isActive: Boolean(row.is_active),
  };
}

function createAccessToken(customer) {
  return signAccessToken({
    sub: String(customer.id),
    email: customer.email,
  });
}

async function issueTokens(customer) {
  const accessToken = createAccessToken(customer);
  const refreshToken = createRefreshTokenValue();
  const tokenHash = hashToken(refreshToken);
  const expiresAt = addDays(new Date(), refreshTtlDays);

  await authRepository.createRefreshToken({
    customerId: customer.id,
    tokenHash,
    expiresAt,
  });

  return { accessToken, refreshToken };
}

async function register(payload) {
  const existing = await authRepository.findCustomerByEmail(payload.email);
  if (existing) {
    const error = new Error("Email already registered");
    error.status = 409;
    throw error;
  }

  const passwordHash = await bcrypt.hash(payload.password, 10);
  const customerId = await authRepository.createCustomer({
    email: payload.email,
    passwordHash,
    firstName: payload.firstName,
    lastName: payload.lastName,
    phone: payload.phone || null,
  });

  const customer = {
    id: customerId,
    email: payload.email,
  };

  const tokens = await issueTokens(customer);

  return {
    customer: {
      id: customerId,
      email: payload.email,
      firstName: payload.firstName,
      lastName: payload.lastName,
      phone: payload.phone || null,
    },
    ...tokens,
  };
}

async function login(payload) {
  const customer = await authRepository.findCustomerByEmail(payload.email);
  if (!customer) {
    const error = new Error("Invalid credentials");
    error.status = 401;
    throw error;
  }

  const matches = await bcrypt.compare(payload.password, customer.password_hash);
  if (!matches) {
    const error = new Error("Invalid credentials");
    error.status = 401;
    throw error;
  }

  const tokens = await issueTokens(customer);

  return {
    customer: sanitizeCustomer(customer),
    ...tokens,
  };
}

async function refresh(payload) {
  const tokenHash = hashToken(payload.refreshToken);
  const stored = await authRepository.findRefreshTokenByHash(tokenHash);

  if (!stored || stored.revoked_at) {
    const error = new Error("Invalid refresh token");
    error.status = 401;
    throw error;
  }

  if (new Date(stored.expires_at) <= new Date()) {
    const error = new Error("Refresh token expired");
    error.status = 401;
    throw error;
  }

  const customer = await authRepository.findCustomerById(stored.customer_id);
  if (!customer) {
    const error = new Error("Invalid refresh token");
    error.status = 401;
    throw error;
  }

  await authRepository.revokeRefreshToken(stored.id);

  const accessToken = createAccessToken(customer);
  const refreshToken = createRefreshTokenValue();
  const newHash = hashToken(refreshToken);
  const expiresAt = addDays(new Date(), refreshTtlDays);

  await authRepository.createRefreshToken({
    customerId: stored.customer_id,
    tokenHash: newHash,
    expiresAt,
  });

  return { accessToken, refreshToken };
}

async function logout(payload) {
  const tokenHash = hashToken(payload.refreshToken);
  const stored = await authRepository.findRefreshTokenByHash(tokenHash);
  if (stored && !stored.revoked_at) {
    await authRepository.revokeRefreshToken(stored.id);
  }
  return { success: true };
}

module.exports = { register, login, refresh, logout };
