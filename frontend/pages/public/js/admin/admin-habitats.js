
let currentHabitatId = null;

document.addEventListener("DOMContentLoaded", () => {
  if (!token) return (window.location.href = "../login.html");

  loadHabitats();

  document.getElementById("addHabitatForm").addEventListener("submit", handleHabitatSubmit);
});

function loadHabitats() {
  fetch("https://zoo-arcadia-back.onrender.com/api/habitats", {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .then((data) => {
      const container = document.getElementById("habitatList");
      container.innerHTML = "";

      data.forEach((habitat) => {
        const card = document.createElement("div");
        card.className = "admin-card";
        card.innerHTML = `
          <img src="${habitat.image_url}" alt="${habitat.nom}">
          <div class="admin-card-content">
            <h3>${habitat.nom}</h3>
            <p>${habitat.description}</p>
            <div class="admin-actions">
              <button class="edit-btn" onclick='editHabitat(${JSON.stringify(habitat)})'><i class="fa-solid fa-pen"></i></button>
              <button class="delete-btn" onclick="deleteHabitat(${habitat.id})"><i class="fa-solid fa-trash"></i></button>
            </div>
          </div>
        `;
        container.appendChild(card);
      });
    });
}

function editHabitat(habitat) {
  document.getElementById("formContainer").classList.add("show");
  document.getElementById("nom").value = habitat.nom;
  document.getElementById("description").value = habitat.description;
  document.getElementById("addHabitatForm").scrollIntoView({ behavior: "smooth" });

  document.querySelector("#addHabitatForm button").textContent = "Mettre à jour";
  currentHabitatId = habitat.id;
}

function deleteHabitat(id) {
  if (confirm("Voulez-vous vraiment supprimer cet habitat ?")) {
    fetch(`https://zoo-arcadia-back.onrender.com/api/habitats/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          alert("Habitat supprimé ✅");
          window.location.reload();
        } else {
          alert("Erreur lors de la suppression");
        }
      })
      .catch((err) => {
        console.error("Erreur suppression :", err);
        alert("Erreur serveur");
      });
  }
}

async function handleHabitatSubmit(e) {
  e.preventDefault();

  const nom = document.getElementById("nom").value;
  const description = document.getElementById("description").value;
  const image = document.getElementById("image").files[0];

  const formData = new FormData();
  formData.append("nom", nom);
  formData.append("description", description);
  if (image) formData.append("image", image);

  const url = currentHabitatId
    ? `https://zoo-arcadia-back.onrender.com/api/habitats/${currentHabitatId}`
    : "https://zoo-arcadia-back.onrender.com/api/habitats";

  const method = currentHabitatId ? "PUT" : "POST";

  try {
    const res = await fetch(url, {
      method,
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const data = await res.json();

    if (res.ok) {
      alert(currentHabitatId ? "Habitat mis à jour ✅" : "Habitat ajouté ✅");
      document.getElementById("addHabitatForm").reset();
      document.querySelector("#addHabitatForm .preview-grid").innerHTML = "";
      currentHabitatId = null;
      document.querySelector("#addHabitatForm button").textContent = "Ajouter";
      document.getElementById("formContainer").classList.remove("show");
      window.location.reload();
    } else {
      alert(data.message || "Erreur lors de l’envoi");
    }
  } catch (err) {
    console.error("Erreur envoi :", err);
    alert("Erreur serveur");
  }
}
