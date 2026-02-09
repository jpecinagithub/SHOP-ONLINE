const healthService = require("../services/healthService");

function getHealth(req, res) {
  res.json(healthService.getStatus());
}

module.exports = { getHealth };
