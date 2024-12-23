// middleware/auth.js
import jwt from 'jsonwebtoken';

export const authenticateToken = (req, res, next) => {
  // Get auth's header
  const token = req.headers['authorization'];

  if (!token) { 
    return res.sendStatus(401).json({
      result : false,
      status : "error",
      msg    : "Authorization token is required"
    });
  }

  const authHeader = token.split(" ");
  // Guard Header incorrect form
  if (authHeader[0] != "Bearer" || authHeader.length !== 2) {
    return res.status(400).json({
      result : false,
      status : "error",
      msg    : "Invalid token format"
    });
  }

  const authToken = authHeader[1];
  // verifying token
  jwt.verify(authToken, process.env.JWT_SECRET, async (err, user) => {
    if (err) {
      return res.sendStatus(403).json({
        result : false,
        status : "error",
        msg    : "Token invalid or expired"
      });
    }
    
    req.user = user;
    next();
  });
};
