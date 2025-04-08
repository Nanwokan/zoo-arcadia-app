document.addEventListener("DOMContentLoaded", () => {
    const token = localStorage.getItem("token");
    const utilisateur = JSON.parse(localStorage.getItem("utilisateur"));
    
  
    if (!token || !utilisateur || utilisateur.role_id !== 3) {
      window.location.href = "../login.html";
      return;
    }
  
    const userInfo = document.getElementById("userInfo");
    userInfo.innerHTML = `
      <img src="${utilisateur.photo_profil_url}" alt="Photo" class="avatar-admin">
      <p>${utilisateur.prenom} ${utilisateur.nom}</p>
    `;
  
    const selectAnimal = document.getElementById("animalFilter");
    const dateFilter = document.getElementById("dateFilter");
    const container = document.getElementById("consoHistorique");
  
    let consoData = [];
  
    // Charger la liste des animaux
    fetch("https://zoo-arcadia-back.onrender.com/api/animals", {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(animals => {
        animals.forEach(a => {
          const option = document.createElement("option");
          option.value = a.id;
          option.textContent = a.prenom;
          selectAnimal.appendChild(option);
        });
      })
      .catch(err => {
        console.error("Erreur chargement animaux :", err);
      });
  
    // Charger les consommations pour un animal donné
    function loadConsommation(animalId) {
      if (!animalId) {
        container.innerHTML = "<p>Veuillez sélectionner un animal.</p>";
        return;
      }
  
      fetch(`https://zoo-arcadia-back.onrender.com/api/food-log/${animalId}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then(res => res.json())
        .then(data => {
          consoData = data;
          afficherConsoFiltrée();
        })
        .catch(err => {
          console.error("Erreur chargement consommations :", err);
        });
    }
  
    // Afficher les consommations filtrées
    function afficherConsoFiltrée() {
      container.innerHTML = "";
  
      const dateChoisie = dateFilter.value;
  
      const resultats = consoData.filter(c => {
        const dateConso = new Date(c.date_don).toLocaleDateString("fr-CA");
        return dateChoisie === "" || dateConso === dateChoisie;
      });
  
      if (resultats.length === 0) {
        container.innerHTML = "<p>Aucune consommation trouvée.</p>";
        return;
      }
  
      resultats.forEach(c => {
        const card = document.createElement("div");
        card.className = "rapport-card"; // ou conso-card si tu veux personnaliser
  
        const date = new Date(c.date_don).toLocaleDateString("fr-FR");
        card.innerHTML = `
          <h4>${date} à ${c.heure_don}</h4>
          <p><strong>Nourriture :</strong> ${c.nourriture}</p>
          <p><strong>Quantité :</strong> ${c.quantite} kg</p>
          <p><strong>Donnée par :</strong> ${c.donne_par}</p>
        `;
  
        container.appendChild(card);
      });
    }
  
    // Événements
    selectAnimal.addEventListener("change", () => {
      const id = selectAnimal.value;
      loadConsommation(id);
    });
  
    dateFilter.addEventListener("change", afficherConsoFiltrée);
  });
  