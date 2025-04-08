document.getElementById("contactForm").addEventListener("submit", async (e) => {
    e.preventDefault();
  
    const data = {
      nom: document.getElementById("nom").value,
      prenom: document.getElementById("prenom").value,
      email: document.getElementById("email").value,
      message: document.getElementById("message").value,
    };
  
    try {
      const res = await fetch("https://zoo-arcadia-app-production.up.railway.app/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      });
  
      const contentType = res.headers.get("content-type");
      const text = await res.text();
  
      if (res.ok) {
        if (contentType && contentType.includes("application/json")) {
          const result = JSON.parse(text);
          alert(result.message || "Message envoyé !");
        } else {
          alert("Message envoyé !");
        }
        document.getElementById("contactForm").reset();
      } else {
        console.error("💥 Erreur brute :", text);
        alert("Erreur : " + text);
      }
  
    } catch (err) {
      console.error("Erreur contact :", err);
      alert("Erreur réseau ou serveur.");
    }
  });
  