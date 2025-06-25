const prisma = require("../prisma/index");
require("dotenv").config();
const jwt = require("jsonwebtoken");

const userVerification = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ status: false });
  }

  jwt.verify(token, process.env.TOKEN_KEY, async (err, data) => {
    if (err) {
      return res.json({ status: false });
    }

    try {
      const user = await prisma.user.findUnique({
        where: { id: data.id },
      });

      if (user) {
        req.user = user;
        return next();
      } else {
        return res.json({ status: false });
      }
    } catch (error) {
      console.error("User verification error:", error);
      return res.json({ status: false });
    }
  });
};

module.exports = userVerification;
