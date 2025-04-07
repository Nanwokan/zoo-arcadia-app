document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("token");
  const utilisateur = JSON.parse(localStorage.getItem("utilisateur"));

  if (!token || !utilisateur || utilisateur.role_id !== 3) {
    window.location.href = "login.html";
    return;
  }

  // Affichage de l'utilisateur
  document.getElementById("userInfo").innerHTML = `
    <img src="${utilisateur.photo_profil_url}" alt="Photo" class="avatar-admin">
    <p>${utilisateur.prenom} ${utilisateur.nom}</p>
  `;
  let commentairesOriginaux = [];

  function loadCommentaires() {
    fetch('http://localhost:2024/api/commentaires-habitat', {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => res.json())
      .then(commentaires => {
        commentairesOriginaux = commentaires;
        remplirFiltreHabitat(commentaires);
        afficherCommentaires(commentaires);
      })
      .catch(err => {
        console.error("Erreur chargement commentaires :", err);
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
  
  function afficherCommentaires(commentaires) {
    const container = document.getElementById("habitatCommentaires");
    container.innerHTML = "";
  
    commentaires.forEach(c => {
      const card = document.createElement("div");
      card.className = "commentaire-card";
      const date = new Date(c.date_commentaire).toLocaleDateString("fr-FR");
  
      card.innerHTML = `
        <h4>${c.veterinaire} - <em>${c.habitat}</em></h4>
        <small>📅 ${date}</small>
        <p>${c.commentaire}</p>
      `;
      container.appendChild(card);
    });
  }
  
  function filtrerCommentaires() {
    const habitatChoisi = document.getElementById("habitatFilter").value.toLowerCase();
    const dateChoisie = document.getElementById("dateFilter").value;
    const searchText = document.getElementById("searchComment").value.toLowerCase();
  
    const résultats = commentairesOriginaux.filter(c => {
      const date = new Date(c.date_commentaire).toLocaleDateString("fr-CA");
      return (
        (habitatChoisi === "" || c.habitat.toLowerCase() === habitatChoisi) &&
        (dateChoisie === "" || date === dateChoisie) &&
        (searchText === "" || c.commentaire?.toLowerCase().includes(searchText))
      );
    });
  
    afficherCommentaires(résultats);
  }
  
  // Événements
  document.getElementById("habitatFilter").addEventListener("change", filtrerCommentaires);
  document.getElementById("dateFilter").addEventListener("change", filtrerCommentaires);
  document.getElementById("searchComment").addEventListener("input", filtrerCommentaires);
  document.getElementById("clearSearchComment").addEventListener("click", () => {
    document.getElementById("searchComment").value = "";
    filtrerCommentaires();
  });
  

  // Charger la liste des habitats
  fetch("http://localhost:2024/api/habitats", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(habitats => {
      const select = document.getElementById("habitatChoice");
      habitats.forEach(h => {
        const option = document.createElement("option");
        option.value = h.id;
        option.textContent = h.nom;
        select.appendChild(option);
      });
    })
    .catch(err => {
      console.error("Erreur chargement habitats :", err);
    });

  // Soumission du commentaire
  const form = document.getElementById("commentForm");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const habitatId = form.habitat_id.value;
    const commentaire = form.Commentaire.value;

    const payload = {
      veterinaire_id: utilisateur.id,
      commentaire: commentaire
    };

    try {
      const res = await fetch(`http://localhost:2024/api/habitats/${habitatId}/commentaires`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        alert("✅ Commentaire envoyé avec succès !");
        form.reset();
        loadCommentaires();
      } else {
        const error = await res.json();
        alert("❌ " + (error.message || "Erreur lors de l'envoi"));
      }
    } catch (err) {
      console.error("Erreur envoi commentaire :", err);
      alert("❌ Erreur serveur");
    }
  });

  // Appel initial
  loadCommentaires();
});
