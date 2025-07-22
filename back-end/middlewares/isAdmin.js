export const isAdmin = (req, res, next) => {
  if (!req.user || !["admin", "super-admin"].includes(req.user.role)) {
    return res.status(403).json({
      message: "You are not an admin",
    });
  }
  next();
};
