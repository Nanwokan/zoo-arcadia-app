function formatDate(mysqlDate) {
  if (!mysqlDate) return "";
  const iso = mysqlDate.replace(" ", "T");
  const d = new Date(iso);
  return d.toLocaleDateString("fr-FR", {
    day: "2-digit",
    month: "long",
    year: "numeric"
  });
}
