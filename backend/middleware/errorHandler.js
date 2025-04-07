module.exports = (err, req, res, next) => {
  console.error("❌ Erreur capturée :", err);

  const status = err.status || 500;
  const message = err.message || "Erreur serveur inattendue.";

  res.status(status).json({ message });
};
