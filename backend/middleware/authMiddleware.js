const jwt = require("jsonwebtoken");
const User = require("../models/User");

// const authenticateUser = async (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   console.log("authHeader =>", authHeader);

//   if (!authHeader) {
//     return res.status(401).json({ message: "No token provided" });
//   }

//   const token = authHeader.split(" ")[1];

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET || "key123");

//     if (decoded.email === "admin@gmail.com") {
//       req.user = {
//         email: "admin@gmail.com",
//         isAdmin: true,
//       };
//       return next();
//     }

//     // Regular user flow
//     const user = await User.findOne({ email: decoded.email });
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     req.user = {
//       id: user._id,
//       email: user.email,
//       name: user.name,
//       isAdmin: false,
//     };

//     next();
//   } catch (err) {
//     console.error("Auth error:", err);
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// };


const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  
  
  console.log("token",token);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || "key123");

    // Admin logic
    if (decoded.email === "admin@gmail.com") {
      req.user = {
        email: "admin@gmail.com",
        isAdmin: true,
        isPremium: true,
      };
      return next();
    }

    // Regular user logic
    const user = await User.findById(decoded.userId); // ✅ reliable match
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = {
      id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: false,
      isPremium: user.isPremium,
    };

    next();
  } catch (err) {
    console.error("Auth error:", err);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};


const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    try {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, "secret"); // replace "secret" with your actual secret

      const user = await User.findById(decoded.id).select("-password");
      req.user = user;
    } catch (error) {
      req.user = null; // allow guest access even if token invalid
    }
  } else {
    req.user = null; // no token provided
  }

  next();
};

const checkAdmin = (req, res, next) => {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ message: "Access Denied" });
  }

  next();
};


module.exports = { authenticateUser, checkAdmin, protect };

