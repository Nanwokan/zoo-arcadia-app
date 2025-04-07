const nodemailer = require("nodemailer");

module.exports = async (req, res) => {
  const { prenom, nom, email, message } = req.body;

  if (!prenom || !nom || !email || !message) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  try {
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false, // true pour port 465, false pour 587
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: `"${prenom} ${nom}" <${email}>`,
      to: process.env.EMAIL_USER, // tu reçois le mail
      subject: "📩 Nouveau message via Zoo Arcadia",
      html: `
        <p><strong>De :</strong> ${prenom} ${nom}</p>
        <p><strong>Email :</strong> ${email}</p>
        <p><strong>Message :</strong></p>
        <p>${message}</p>
      `
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Message envoyé avec succès !" });
  } catch (error) {
    console.error("Erreur envoi email :", error);
    res.status(500).json({ message: "Erreur serveur lors de l'envoi." });
  }
};
