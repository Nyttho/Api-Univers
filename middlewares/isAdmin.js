export const isAdmin = (req, res, next) => {
  try {
    const user = req.user;
    if (!user.is_admin) {
      return res.status(403).json({ message: "Access denied: Admins only" });
    }
    next();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Authorization error", error: error.message });
  }
};
