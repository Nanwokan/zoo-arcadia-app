const token = localStorage.getItem('token');
const utilisateur = JSON.parse(localStorage.getItem('utilisateur'));

if (!token || !utilisateur || utilisateur.role_id !== 3) {
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

// Charger la liste des animaux
fetch('http://localhost:2024/api/animals')
.then(res => res.json())
.then(animals => {
  const select = document.getElementById('animalChoice');
  animals.forEach(a => {
    const option = document.createElement('option');
    option.value = a.id;
    option.textContent = a.prenom;
    select.appendChild(option);
  });
})
.catch(err => console.error('Erreur chargement animaux :', err));

// Gestion du submit du formulaire
const form = document.getElementById('rapportForm');
form.addEventListener('submit', async (e) => {
e.preventDefault();

const data = {
  animal_id: form.animal_id.value,
  veterinaire_id: utilisateur.id,
  etat: form.etat.value,
  nourriture: form.nourriture.value,
  grammage: form.grammage.value,
  detail: form.detail.value
};

try {
  const res = await fetch('http://localhost:2024/api/rapports-veterinaires', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(data)
  });

  if (res.ok) {
    alert("✅ Rapport vétérinaire enregistré !");
    form.reset();
  } else {
    const error = await res.json();
    alert("❌ " + (error.message || "Erreur serveur"));
  }
} catch (err) {
  console.error("Erreur création rapport :", err);
  alert("❌ Une erreur est survenue");
}
});

let rapportsOriginaux = [];

function loadHistoriqueRapports() {
  fetch("http://localhost:2024/api/rapports-veterinaires", {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(data => {
      rapportsOriginaux = data;
      remplirFiltreAnimal(data);
      afficherRapports(data);
    })
    .catch(err => {
      console.error("Erreur chargement historique rapports :", err);
    });
}

function afficherRapports(rapports) {
  const container = document.getElementById("rapportHistorique");
  container.innerHTML = "";

  rapports.forEach(r => {
    const card = document.createElement("div");
    card.className = "rapport-card";
    const date = new Date(r.date_passage).toLocaleString("fr-FR");

    card.innerHTML = `
      <h4>Animal : ${r.animal_prenom}</h4>
      <small>📅 ${date}</small>
      <p><strong>État :</strong> ${r.etat || "Non précisé"}</p>
      <p><strong>Nourriture :</strong> ${r.nourriture || "Non précisé"} - <strong>Grammage :</strong> ${r.grammage || "?"} kg</p>
      <p><strong>Détails :</strong> ${r.detail || "Aucun détail"}</p>
    `;
    container.appendChild(card);
  });
}

function remplirFiltreAnimal(rapports) {
  const select = document.getElementById("animalFilter");
  const animauxUniques = [...new Set(rapports.map(r => r.animal_prenom))];

  animauxUniques.forEach(nom => {
    const option = document.createElement("option");
    option.value = nom;
    option.textContent = nom;
    select.appendChild(option);
  });
}

function filtrerRapports() {
  const animalChoisi = document.getElementById("animalFilter").value.toLowerCase();
  const dateChoisie = document.getElementById("dateFilter").value;
  const searchText = document.getElementById("searchReport").value.toLowerCase();

  const resultats = rapportsOriginaux.filter(r => {
    const dateRapport = new Date(r.date_passage).toLocaleDateString('fr-CA');
    return (
      (animalChoisi === "" || r.animal_prenom.toLowerCase() === animalChoisi) &&
      (dateChoisie === "" || dateRapport === dateChoisie) &&
      (searchText === "" || r.detail?.toLowerCase().includes(searchText))
    );
  });

  afficherRapports(resultats);
}

document.getElementById("animalFilter").addEventListener("change", filtrerRapports);
document.getElementById("dateFilter").addEventListener("change", filtrerRapports);
document.getElementById("searchReport").addEventListener("input", filtrerRapports);
document.getElementById("clearSearchReport").addEventListener("click", () => {
  document.getElementById("searchReport").value = "";
  filtrerRapports();
});

document.addEventListener("DOMContentLoaded", loadHistoriqueRapports);

fetch('http://localhost:2024/api/notifications-veto', {
  headers: {
    Authorization: `Bearer ${token}`
  }
})
.then(res => {
  if (!res.ok) throw new Error("Erreur notifications");
  return res.json();
})
.then(notifs => {
  notifCount.textContent = notifs.length || 0;
  notifDropdown.innerHTML = '';
  notifs.forEach(n => {
    const p = document.createElement('p');
    p.textContent = `🔔 ${n.message}`;
    notifDropdown.appendChild(p);
  });
})
.catch(err => {
  console.error("Erreur notifications :", err);
  notifCount.textContent = 0;
});

// === Dropdown toggle
notifBtn.addEventListener('click', () => {
  notifDropdown.style.display = notifDropdown.style.display === 'block' ? 'none' : 'block';
  messageDropdown.style.display = 'none';
});

// Fermer les dropdowns si clic extérieur
document.addEventListener('click', (e) => {
  if (!e.target.closest('.icon-wrapper')) {
    notifDropdown.style.display = 'none';
  }
});