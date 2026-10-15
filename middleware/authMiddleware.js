const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  let token;

  // Checks if the request header has an authorization starting with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Gets token from header (split "Bearer <token>" and take index 1)
      token = req.headers.authorization.split(" ")[1];

      // Verifys token using our secret key from .env
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attachs user info to request object so other parts of the app can use it
      req.user = decoded;

      // Moves on to the next function/controller
      next();
    } catch (error) {
      console.error(error);
      return res.status(401).json({
        success: false,
        message: "Not authorized, token failed",
      });
    }
  }

  // If there is no token at all in the headers
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, no token provided",
    });
  }
};

module.exports = { protect };
