import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "No tokem provided",
    });
  }
  const token = authHeader.split("")[1];

  try {
    const decode = jwt.verify(token, process.env.JWT_TOKEN);
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
