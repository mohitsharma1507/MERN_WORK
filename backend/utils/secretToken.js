require("dotenv").config();

const jwt = require("jsonwebtoken");

module.exports.createSecretToken = (id, name, country) => {
  return jwt.sign({ id, name, country }, process.env.TOKEN_KEY, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};
