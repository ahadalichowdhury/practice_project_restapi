var jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  let Token = req.header["token-key"];

  jwt.verify(Token, "secretKey123", function (error, decoded) {
    if (error) {
      res.status(401).json({ status: "unauthorized" });
    } else {
      next();
    }
  });
};
