const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const authenticateTokenWhilePending = (req, res, next) => {
  const token = req.session.token;

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      res.sendStatus(401);
    } else {
      req.userId = user.userId;
      req.userRole = user.userRole;
      req.userStatus = user.userStatus;

      next();
    }
  });
};

module.exports = authenticateTokenWhilePending;
