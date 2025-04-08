document.addEventListener("DOMContentLoaded", async () => {
  const token = localStorage.getItem("token");
  let commentairesOriginaux = [];

  // === 1. Charger les statistiques admin
  try {
    const res = await fetch("https://zoo-arcadia-app-production.up.railway.app/api/admin/stats", {
      headers: { Authorization: `Bearer ${token}` }
    });
    const stats = await res.json();

    animateCount(document.getElementById("totalAnimaux"), stats.total_animaux);
    animateCount(document.getElementById("totalUsers"), stats.total_users);
    animateCount(document.getElementById("totalEmployes"), stats.employes);
    animateCount(document.getElementById("totalVeto"), stats.veterinaires);
  } catch (err) {
    console.error("Erreur stats admin :", err);
  }

  // === 2. Moyenne des consultations
  fetch("https://zoo-arcadia-app-production.up.railway.app/api/consultations")
    .then(res => res.json())
    .then(data => {
      const total = data.reduce((sum, a) => sum + a.vues, 0);
      const moyenne = data.length > 0 ? (total / data.length).toFixed(2) : 0;
      document.getElementById("moyenneConsultations").textContent = moyenne;
    });

  // === 3. Nombre total de rapports
  fetch("https://zoo-arcadia-app-production.up.railway.app/api/rapports-veterinaires")
    .then(res => res.json())
    .then(data => {
      document.getElementById("totalRapports").textContent = data.length;
    });

  // === 4. Graphique consultations
  fetch("https://zoo-arcadia-app-production.up.railway.app/api/consultations")
    .then(res => res.json())
    .then(data => {
      const ctx = document.getElementById("viewsChart").getContext("2d");
      const top5 = data.slice(0, 5);
      new Chart(ctx, {
        type: "bar",
        data: {
          labels: top5.map(a => a.nom),
          datasets: [{
            label: "Nombre de vues",
            data: top5.map(a => a.vues),
            backgroundColor: ['#4caf50', '#2196f3', '#ff9800', '#e91e63', '#9c27b0']
          }]
        },
        options: { responsive: true }
      });
    });

  // === 5. Graphique camembert animaux par habitat
  fetch("https://zoo-arcadia-app-production.up.railway.app/api/statistiques/animaux-par-habitat", {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(data => {
      const ctx = document.getElementById("habitatChart").getContext("2d");
      new Chart(ctx, {
        type: "pie",
        data: {
          labels: data.map(d => d.habitat),
          datasets: [{
            data: data.map(d => d.total),
            backgroundColor: ['#4caf50', '#ff9800', '#2196f3', '#e91e63', '#9c27b0']
          }]
        }
      });
    });

  // === 6. Charger tous les commentaires d’habitat
  fetch("https://zoo-arcadia-app-production.up.railway.app/api/commentaires-habitat", {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(commentaires => {
      commentairesOriginaux = commentaires;
      remplirFiltreHabitat(commentaires);
      afficherCommentaires(commentaires);
    });

  function afficherCommentaires(commentaires) {
    const container = document.getElementById("adminCommentaires");
    container.innerHTML = "";
    commentaires.forEach(c => {
      const date = new Date(c.date_commentaire).toLocaleDateString("fr-FR");
      const p = document.createElement("p");
      p.innerHTML = `💬 <strong>${c.veterinaire}</strong> sur <em>${c.habitat}</em> (${date})<br>${c.commentaire}`;
      container.appendChild(p);
    });
  }

  function remplirFiltreHabitat(commentaires) {
    const select = document.getElementById("habitatFilter");
    const habitatsUniques = [...new Set(commentaires.map(c => c.habitat))];
    habitatsUniques.forEach(nom => {
      const option = document.createElement("option");
      option.value = nom;
      option.textContent = nom;
      select.appendChild(option);
    });
  }

  function filtrerCommentaires() {
    const habitatChoisi = document.getElementById("habitatFilter").value.toLowerCase();
    const dateChoisie = document.getElementById("dateFilter").value;

    const resultats = commentairesOriginaux.filter(c => {
      const date = new Date(c.date_commentaire).toLocaleDateString("fr-CA");
      return (
        (habitatChoisi === "" || c.habitat.toLowerCase() === habitatChoisi) &&
        (dateChoisie === "" || date === dateChoisie)
      );
    });

    afficherCommentaires(resultats);
  }

  document.getElementById("habitatFilter").addEventListener("change", filtrerCommentaires);
  document.getElementById("dateFilter").addEventListener("change", filtrerCommentaires);

  // === 7. Horaires
  const form = document.getElementById("horaireForm");
  fetch("https://zoo-arcadia-app-production.up.railway.app/api/horaires", {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(data => {
      if (data && data.jours) {
        Object.entries(data.jours).forEach(([jour, horaires]) => {
          form.elements[`${jour}_ouverture`].value = horaires.ouverture;
          form.elements[`${jour}_fermeture`].value = horaires.fermeture;
        });
      }
    });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const jours = {};
    ["lundi", "mardi", "mercredi", "jeudi", "vendredi", "samedi", "dimanche"].forEach(jour => {
      jours[jour] = {
        ouverture: form.elements[`${jour}_ouverture`].value,
        fermeture: form.elements[`${jour}_fermeture`].value
      };
    });

    try {
      const res = await fetch("https://zoo-arcadia-app-production.up.railway.app/api/horaires", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ jours })
      });

      if (res.ok) alert("✅ Horaires mis à jour !");
      else alert("❌ Erreur mise à jour des horaires !");
    } catch (err) {
      console.error("Erreur horaires :", err);
    }
  });
});

// Animation des compteurs
function animateCount(el, to, duration = 800) {
  const frameRate = 20;
  const steps = Math.ceil(duration / frameRate);
  const increment = Math.max(1, Math.floor(to / steps));
  let current = 0;

  const update = () => {
    current += increment;
    el.textContent = current >= to ? to : current;
    if (current < to) setTimeout(update, frameRate);
  };
  update();
}
