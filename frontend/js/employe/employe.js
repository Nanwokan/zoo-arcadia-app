// Authentification et affichage utilisateur
const token = localStorage.getItem('token');
const utilisateur = JSON.parse(localStorage.getItem('utilisateur'));

function formatDate(mysqlDate) {
  if (!mysqlDate || typeof mysqlDate !== "string") return "";
  const isoDate = mysqlDate.replace(" ", "T"); // transforme en ISO
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

// --- Gestion des Avis ---
function loadAvisValidés() {
  fetch("http://localhost:2024/api/avis/valides")
    .then((res) => res.json())
    .then((data) => {
      const container = document.getElementById("avis-valides");
      if (!container) return;
      container.innerHTML = "";

      data.forEach((avis) => {
        console.log("DATE REÇUE =>", avis.date_creation);
        console.log("AVIS ENTIER =>", avis);


        const avatar = avis.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(avis.prenom)}+${encodeURIComponent(avis.nom)}&background=random&size=128`;

        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
        <div>
         <div class="card-content-head">
            <img src="${avatar}" alt="${avis.nom}" class="avatar">
            <h3>${avis.prenom} ${avis.nom}</h3>
            <small>${formatDate(avis.date_creation)}</small>
          </div>
         <div class="card-content">
           <p>${avis.avis_text}</p>
         </div>
        </div>
        <div class="actions">
            <button class="delete" onclick="supprimerAvis(${avis.id})"><i class="fa-solid fa-trash"></i></button>
        </div>
        `;
        container.appendChild(card);
      });
    })
    .catch((err) => console.error("Erreur chargement avis validés:", err));
}


function loadAvisAttente() {
  fetch("http://localhost:2024/api/avis/en-attente", {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .then((data) => {
      const container = document.getElementById("avis-attente");
      if (!container) return;
      container.innerHTML = "";

      data.forEach((avis) => {
        console.log("DATE REÇUE =>", avis.date_creation);
        console.log("AVIS ENTIER =>", avis);


        const avatar = avis.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(avis.prenom)}+${encodeURIComponent(avis.nom)}&background=random&size=128`;

        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
        <div>
         <div class="card-content-head">
            <img src="${avatar}" alt="${avis.nom}" class="avatar">
            <h3>${avis.prenom} ${avis.nom}</h3>
            <small>${formatDate(avis.date_creation)}</small>
          </div>
         <div class="card-content">
           <p>${avis.avis_text}</p>
         </div>
        </div>
        <div class="actions">
            <button class="valid" onclick="validerAvis(${avis.id})">Valider</button>
            <button class="delete" onclick="supprimerAvis(${avis.id})">Supprimer</button>
        </div>
        `;
        container.appendChild(card);
      });
    })
    .catch((err) => console.error("Erreur chargement avis attente:", err));
}



function validerAvis(id) {
  fetch(`http://localhost:2024/api/avis/${id}/valider`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(() => {
      loadAvisValidés();
      loadAvisAttente();
    })
    .catch((err) => console.error("Erreur validation:", err));
}

function supprimerAvis(id) {
  fetch(`http://localhost:2024/api/avis/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(() => {
      loadAvisAttente();
    })
    .catch((err) => console.error("Erreur suppression:", err));
}

const serviceList = document.getElementById("serviceList");
const formContainer = document.getElementById("formContainer");
const editForm = document.getElementById("editServiceForm");

let serviceIdToEdit = null;

function editService(service) {
  document.getElementById("nom").value = service.nom;
  document.getElementById("description").value = service.description;
  serviceIdToEdit = service.id;

  formContainer.classList.add("show"); // ✅ On utilise la classe CSS prévue
  formContainer.scrollIntoView({ behavior: "smooth" });
}

function cancelEdit() {
  editForm.reset();
  serviceIdToEdit = null;
  formContainer.classList.remove("show");
}


function loadServices() {
  fetch("http://localhost:2024/api/services", {
    headers: {
      Authorization: `Bearer ${token}`,
    }
  })
    .then(res => res.json())
    .then(services => {
      serviceList.innerHTML = "";
      services.forEach(service => {
        const card = document.createElement("div");
        card.className = "admin-card";
        card.innerHTML = `
          <img src="${service.image_url}" alt="${service.nom}">
          <div class="admin-card-content">
            <h3>${service.nom}</h3>
            <p>${service.description}</p>
            <div class="admin-actions">
              <button class="edit-btn" onclick='editService(${JSON.stringify(service)})'>
                <i class="fa-solid fa-pen"></i>
              </button>
            </div>
          </div>
        `;
        serviceList.appendChild(card);
      });
    })
    .catch(err => console.error("Erreur chargement services :", err));
}

editForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!serviceIdToEdit) return alert("Aucun service sélectionné.");

  const formData = new FormData();
  formData.append("nom", document.getElementById("nom").value);
  formData.append("description", document.getElementById("description").value);
  const image = document.getElementById("image").files[0];
  if (image) formData.append("file", image);

  fetch(`http://localhost:2024/api/services/${serviceIdToEdit}`, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      alert("Service mis à jour !");
      editForm.reset();
      serviceIdToEdit = null;
      formContainer.classList.remove("show");
      loadServices();
    })    
    .catch(err => {
      console.error("Erreur modification :", err);
      alert("Erreur lors de la mise à jour.");
    });
});


// Chargement global au chargement de la page
document.addEventListener("DOMContentLoaded", () => {
  loadAvisValidés?.(); 
  loadAvisAttente?.();  
  loadServices?.();
});
