// Authentification et affichage utilisateur
const token = localStorage.getItem('token');
const utilisateur = JSON.parse(localStorage.getItem('utilisateur'));

function formatDate(mysqlDate) {
    if (!mysqlDate || typeof mysqlDate !== "string") return "";
    const isoDate = mysqlDate.replace(" ", "T");
    const dateObj = new Date(isoDate);
    if (isNaN(dateObj.getTime())) return "";
    return dateObj.toLocaleDateString("fr-FR", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });
}

if (!token || !utilisateur || utilisateur.role_id !== 2) {
    window.location.href = 'login.html';
} else {
    document.getElementById('userInfo').innerHTML = `
    <img src="${utilisateur.photo_profil_url}" alt="Photo" class="avatar-admin">
    <p>${utilisateur.prenom} ${utilisateur.nom}</p>
  `;
}

const links = document.querySelectorAll('.sidebar-nav a');
const currentPage = window.location.pathname.split("/").pop();

links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
        link.classList.add('active');
    } else {
        link.classList.remove('active');
    }
});

// Toggle formulaire
document.addEventListener('DOMContentLoaded', () => {
    const toggleBtn = document.getElementById('toggleFormBtn');
    const formContainer = document.getElementById('formContainer');

    if (toggleBtn && formContainer) {
        toggleBtn.addEventListener('click', () => {
            formContainer.classList.toggle('show');
        });
    }

    loadAnimaux();
    loadHistoriqueNourriture();
});

let allConsommations = []; // on garde une copie globale

function applyFilters() {
  const selectedAnimalId = document.getElementById("animalFilter").value;
  const selectedDate = document.getElementById("dateFilter").value;

  let filtrées = [...allConsommations];

  if (selectedAnimalId) {
    filtrées = filtrées.filter(c => c.animal_id == selectedAnimalId);
  }

  if (selectedDate) {
    filtrées = filtrées.filter(c => {
      const localDate = new Date(c.date_don);
      const formatted = localDate.toLocaleDateString("fr-CA"); // "YYYY-MM-DD" en local
      return formatted === selectedDate;
    });
  }  
  

  afficherConso(filtrées);
}


// Chargement des animaux
function loadAnimaux() {
    fetch('http://localhost:2024/api/animals', {
        headers: { Authorization: `Bearer ${token}` }
    })
        .then(res => res.json())
        .then(data => {
            const select = document.getElementById('animal_id');
            if (!select) return;
            select.innerHTML = '<option value="">-- Sélectionner un animal --</option>';
            data.forEach(animal => {
                const option = document.createElement('option');
                option.value = animal.id;
                option.textContent = `${animal.prenom} (${animal.race})`;
                select.appendChild(option);
            });
            // Remplir le filtre animal aussi
            const filterSelect = document.getElementById("animalFilter");
            if (filterSelect) {
                filterSelect.innerHTML = '<option value="">Tous les animaux</option>';
                data.forEach(animal => {
                    const option = document.createElement('option');
                    option.value = animal.id;
                    option.textContent = `${animal.prenom} (${animal.race})`;
                    filterSelect.appendChild(option);
                });
            }

        })
        .catch(err => console.error("Erreur chargement animaux :", err));
}

// Chargement de l’historique
function afficherConso(consommations) {
    const container = document.getElementById("foodHistory");
    container.innerHTML = "";

    consommations.forEach(c => {
        const card = document.createElement("div");
        card.className = "rapport-card"; // ou "conso-card" si tu veux

        const date = new Date(c.date_don).toLocaleDateString("fr-FR");

        card.innerHTML = `
        <h4>${date} à ${c.heure_don}</h4>
        <p><strong>Animal :</strong> ${c.animal_nom}</p>
        <p><strong>Nourriture :</strong> ${c.nourriture}</p>
        <p><strong>Quantité :</strong> ${c.quantite} kg</p>
        <p><strong>Donnée par :</strong> ${c.donne_par}</p>
      `;

        container.appendChild(card);
    });
}


// Enregistrement du formulaire
const foodForm = document.getElementById('foodLogForm');
if (foodForm) {
    foodForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const data = {
            animal_id: document.getElementById('animal_id').value,
            employe_id: utilisateur.id,
            nourriture: document.getElementById('nourriture').value,
            quantite: document.getElementById('quantite').value,
            date_don: document.getElementById('date_don').value,
            heure_don: document.getElementById('heure_don').value
        };

        try {
            const res = await fetch('http://localhost:2024/api/food-log', {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
              },
              body: JSON.stringify(data)
            });
          
            let result;
            const contentType = res.headers.get("content-type");
          
            if (contentType && contentType.includes("application/json")) {
              result = await res.json();
            } else {
              result = { message: await res.text() }; // fallback si erreur texte ou HTML
            }
          
            if (res.ok) {
              alert("Enregistrement réussi !");
              foodForm.reset();
              loadHistoriqueNourriture();
            } else {
              alert(result.message || "Erreur lors de l'envoi");
            }
          
          } catch (err) {
            console.error("Erreur envoi :", err);
            alert("Erreur réseau ou serveur.");
          }          
    });
}

function loadHistoriqueNourriture() {
    fetch('http://localhost:2024/api/food-logs', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data)) {
          throw new Error("Données reçues invalides");
        }
        allConsommations = data; // <-- il manquait cette ligne !
        applyFilters(); // Et là, on applique le filtre sur la bonne source
      })
      .catch(err => {
        console.error("Erreur chargement historique :", err);
        alert("Impossible de charger l'historique.");
      });
  }

  const now = new Date();

const dateInput = document.getElementById('date_don');
const heureInput = document.getElementById('heure_don');

if (dateInput && heureInput) {
  dateInput.value = now.toISOString().split('T')[0]; // "YYYY-MM-DD"
  
  const hh = now.getHours().toString().padStart(2, '0');
  const mm = now.getMinutes().toString().padStart(2, '0');
  heureInput.value = `${hh}:${mm}`;
}

  

document.getElementById("animalFilter").addEventListener("change", applyFilters);
document.getElementById("dateFilter").addEventListener("change", applyFilters);
