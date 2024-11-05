function checkAdminRole(req, res, next) {
  if (!req.user.roles.includes("admin")) {
    return res
      .status(403)
      .send({ success: false, message: "Acceso denegado." });
  }

  return next();
}

module.exports = {
  checkAdminRole,
};
