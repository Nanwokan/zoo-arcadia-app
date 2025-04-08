
let currentServiceId = null;

document.addEventListener("DOMContentLoaded", () => {
  if (!token) return window.location.href = "../login.html";

  loadServices();

  document.getElementById('addServiceForm').addEventListener('submit', handleFormSubmit);
});

function loadServices() {
  fetch('https://zoo-arcadia-back.onrender.com/api/services', {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById('serviceList');
      container.innerHTML = "";

      data.forEach(service => {
        const card = document.createElement('div');
        card.className = 'admin-card';
        card.innerHTML = `
          <img src="${service.image_url}" alt="${service.nom}">
          <div class="admin-card-content">
            <h3>${service.nom}</h3>
            <p>${service.description}</p>
            <div class="admin-actions">
              <button class="edit-btn" onclick='editService(${JSON.stringify(service)})'><i class="fa-solid fa-pen"></i></button>
              <button class="delete-btn" onclick="deleteService(${service.id})"><i class="fa-solid fa-trash"></i></button>
            </div>
          </div>
        `;
        container.appendChild(card);
      });
    });
}

function deleteService(id) {
  if (confirm('Voulez-vous vraiment supprimer ce service ?')) {
    fetch(`https://zoo-arcadia-back.onrender.com/api/services/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (res.ok) {
          alert('Service supprimé ✅');
          window.location.reload();
        } else {
          alert('Erreur lors de la suppression');
        }
      });
  }
}

function handleFormSubmit(e) {
  e.preventDefault();

  const nom = document.getElementById('nom').value;
  const description = document.getElementById('description').value;
  const image = document.getElementById('image').files[0];

  const formData = new FormData();
  formData.append('nom', nom);
  formData.append('description', description);
  if (image) formData.append('image', image);

  const url = currentServiceId
    ? `https://zoo-arcadia-back.onrender.com/api/services/${currentServiceId}`
    : 'https://zoo-arcadia-back.onrender.com/api/services';

  const method = currentServiceId ? 'PUT' : 'POST';

  fetch(url, {
    method: method,
    headers: { Authorization: `Bearer ${token}` },
    body: formData
  })
    .then(res => res.json())
    .then(data => {
      if (data.message || res.ok) {
        alert(currentServiceId ? "Service mis à jour ✅" : "Service ajouté ✅");
        document.getElementById('addServiceForm').reset();
        document.querySelector('#addServiceForm .preview-grid').innerHTML = '';
        document.getElementById('formContainer').classList.remove('show');
        currentServiceId = null;
        document.querySelector('#addServiceForm button').textContent = "Ajouter";
        window.location.reload();
      } else {
        alert(data.message || "Erreur lors de l’envoi");
      }
    })
    .catch(err => {
      console.error("Erreur :", err);
      alert("Erreur serveur");
    });
}

function editService(service) {
  document.getElementById('formContainer').classList.add('show');
  document.getElementById('nom').value = service.nom;
  document.getElementById('description').value = service.description;
  document.getElementById('addServiceForm').scrollIntoView({ behavior: 'smooth' });
  document.querySelector('#addServiceForm button').textContent = "Mettre à jour";
  currentServiceId = service.id;
}
