
const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
    // 1. Request headers se token lena
    const authHeader = req.headers.authorization;

    // 2. Check karna ke token mila hai ya nahi
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Access denied. Token is required.",
      });
    }

    // 3. Bearer ke baad wala token nikalna
    const token = authHeader.split(" ")[1];

    // 4. Token ko secret key se verify karna
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // 5. Decoded user information request mein rakhna
    req.user = decoded;

    // 6. Agle middleware ya controller par jana
    next();

  } catch (error) {
    // Token invalid ya expired ho to error dena
    return res.status(401).json({
      message: "Invalid or expired token.",
    });
  }
};

module.exports = authMiddleware;
