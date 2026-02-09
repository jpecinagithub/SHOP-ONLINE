function getStatus() {
  return {
    status: "ok",
    uptime: Math.floor(process.uptime()),
  };
}

module.exports = { getStatus };
