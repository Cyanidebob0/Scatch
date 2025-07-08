const jwt = require("jsonwebtoken");

module.exports = (user) => {
  return jwt.sign(
    { 
      email: user.email, 
      id: user._id, 
      role: user.role || 'owner' // Default to 'owner' if role doesn't exist
    },
    process.env.JWT_SECRET,
    { expiresIn: '1h' } // Add token expiration for security
  );
};
