let currentAnimalId = null;
let allAnimals = [];

document.addEventListener("DOMContentLoaded", () => {
  if (!token) return (window.location.href = "login.html");

  loadHabitats();
  loadRaces();
  loadAnimals();

  document.getElementById("showRaceForm").addEventListener("click", () => {
    document.getElementById("addRaceForm").classList.toggle("show");
  });

  document.getElementById("submitNewRace").addEventListener("click", createRace);

  document.getElementById("addAnimalForm").addEventListener("submit", handleAnimalSubmit);

  document.getElementById("searchInput").addEventListener("input", renderFilteredAnimals);
  document.getElementById("raceFilter").addEventListener("change", renderFilteredAnimals);
  document.getElementById("habitatFilter").addEventListener("change", renderFilteredAnimals);
  document.getElementById("clearSearch").addEventListener("click", () => {
    document.getElementById("searchInput").value = "";
    renderFilteredAnimals();
  });
});

// === CHARGEMENT DONNÉES ===

function loadHabitats() {
  fetch("http://localhost:2024/api/habitats")
    .then(res => res.json())
    .then(habitats => {
      const select = document.getElementById("habitatChoice");
      habitats.forEach(h => {
        const opt = document.createElement("option");
        opt.value = h.id;
        opt.textContent = h.nom;
        select.appendChild(opt);
      });
    });
}

function loadRaces() {
  fetch("http://localhost:2024/api/races")
    .then(res => res.json())
    .then(races => {
      const select = document.getElementById("raceChoice");
      races.forEach(r => {
        const opt = document.createElement("option");
        opt.value = r.id;
        opt.textContent = r.label;
        select.appendChild(opt);
      });
    });
}

function loadAnimals() {
  fetch("http://localhost:2024/api/animals", {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(data => {
      allAnimals = data;
      populateFilters(data);
      renderFilteredAnimals();
    });
}

// === FORMULAIRES ===

function createRace() {
  const label = document.getElementById("newRace").value.trim();
  if (!label) return alert("Veuillez saisir un nom de race.");

  fetch("http://localhost:2024/api/races", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ label })
  })
    .then(res => res.json())
    .then(data => {
      if (data.id) {
        const raceSelect = document.getElementById("raceChoice");
        const opt = document.createElement("option");
        opt.value = data.id;
        opt.textContent = data.label;
        opt.selected = true;
        raceSelect.appendChild(opt);

        alert("Race ajoutée ✅");
        document.getElementById("newRace").value = "";
        document.getElementById("addRaceForm").classList.remove("show");
      } else {
        alert("Erreur lors de l'ajout.");
      }
    })
    .catch(err => {
      console.error(err);
      alert("Erreur serveur");
    });
}

async function handleAnimalSubmit(e) {
  e.preventDefault();

  const prenom = document.getElementById("prenom").value;
  const habitat_id = document.getElementById("habitatChoice").value;
  const race_id = document.getElementById("raceChoice").value;

  const formData = new FormData();
  formData.append("prenom", prenom);
  formData.append("habitat_id", habitat_id);
  formData.append("race_id", race_id);

  const url = currentAnimalId
    ? `http://localhost:2024/api/animals/${currentAnimalId}`
    : "http://localhost:2024/api/animals";

  const method = currentAnimalId ? "PUT" : "POST";

  try {
    const res = await fetch(url, {
      method,
      headers: { Authorization: `Bearer ${token}` },
      body: formData
    });

    const animal = await res.json();

    if (!res.ok) {
      alert(animal.message || "Erreur lors de l'enregistrement");
      return;
    }

    if (selectedFiles.length > 0) {
      const imgForm = new FormData();
      selectedFiles.forEach(file => imgForm.append("images", file));

      const resImg = await fetch(`http://localhost:2024/api/animals/${animal.id}/images`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: imgForm
      });

      if (!resImg.ok) {
        alert("Animal enregistré mais échec upload image");
      }
    }

    alert(currentAnimalId ? "Animal modifié ✅" : "Animal ajouté ✅");

    document.getElementById("addAnimalForm").reset();
    document.querySelector(".preview-grid").innerHTML = "";
    currentAnimalId = null;
    document.querySelector("#addAnimalForm button").textContent = "Ajouter";
    window.location.reload();
  } catch (err) {
    console.error(err);
    alert("Erreur serveur");
  }
}

// === AFFICHAGE & FILTRAGE ===

function populateFilters(data) {
  const races = [...new Set(data.map(a => a.race))];
  const habitats = [...new Set(data.map(a => a.habitat))];

  const raceSelect = document.getElementById("raceFilter");
  const habitatSelect = document.getElementById("habitatFilter");

  races.forEach(r => {
    const opt = document.createElement("option");
    opt.value = r;
    opt.textContent = r;
    raceSelect.appendChild(opt);
  });

  habitats.forEach(h => {
    const opt = document.createElement("option");
    opt.value = h;
    opt.textContent = h;
    habitatSelect.appendChild(opt);
  });
}

function renderFilteredAnimals() {
  const container = document.getElementById("animalList");
  container.innerHTML = "";

  const search = document.getElementById("searchInput").value.toLowerCase();
  const selectedRace = document.getElementById("raceFilter").value;
  const selectedHabitat = document.getElementById("habitatFilter").value;

  const filtered = allAnimals.filter(animal => {
    const matchRace = !selectedRace || animal.race === selectedRace;
    const matchHabitat = !selectedHabitat || animal.habitat === selectedHabitat;
    const matchName = animal.prenom.toLowerCase().includes(search);
    return matchRace && matchHabitat && matchName;
  });

  filtered.forEach(animal => {
    const image = animal.image_url || "assets/image/placeholder.jpg";
    const card = document.createElement("div");
    card.className = "animal-card";
    card.innerHTML = `
      <img src="${image}" alt="${animal.prenom}">
      <div class="animal-card-content">
        <h3>${animal.prenom}</h3>
        <p>•${animal.race}</p>
      </div>
      <div class="admin-actions">
        <button class="edit-btn" onclick='editAnimal(${JSON.stringify(animal)})'><i class="fa-solid fa-pen"></i></button>
        <button class="delete-btn" onclick="deleteAnimal(${animal.id})"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;
    container.appendChild(card);
  });
}

// === MODIFICATION / SUPPRESSION ===

function editAnimal(animal) {
  document.getElementById("formContainer").classList.add("show");
  document.getElementById("prenom").value = animal.prenom;
  document.getElementById("habitatChoice").value = animal.habitat_id;
  document.getElementById("raceChoice").value = animal.race_id;
  document.querySelector("#addAnimalForm button").textContent = "Mettre à jour";
  currentAnimalId = animal.id;

  fetch(`http://localhost:2024/api/animals/${animal.id}/images`, {
    headers: { Authorization: `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(images => {
      const preview = document.querySelector(".preview-grid");
      preview.innerHTML = "";

      images.forEach(img => {
        const item = document.createElement("li");
        item.className = "preview-item";
        item.innerHTML = `
          <img src="${img.url}" alt="Image">
          <button type="button" class="remove-btn" onclick="deleteAnimalImage(${img.id}, this)">
            <i class="fa-solid fa-trash"></i>
          </button>
        `;
        preview.appendChild(item);
      });

      updatePreview(); // si utilisé
    })
    .catch(err => {
      console.error("Erreur images :", err);
    });
}

function deleteAnimal(id) {
  if (confirm("Supprimer cet animal ?")) {
    fetch(`http://localhost:2024/api/animals/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (res.ok) {
          alert("Animal supprimé ✅");
          window.location.reload();
        } else {
          alert("Erreur lors de la suppression ❌");
        }
      })
      .catch(err => {
        console.error("Erreur suppression :", err);
        alert("Erreur serveur");
      });
  }
}

function deleteAnimalImage(id, button) {
  if (confirm("Supprimer cette image ?")) {
    fetch(`http://localhost:2024/api/animals/images/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(res => {
        if (res.ok) button.parentElement.remove();
        else alert("Erreur suppression image");
      })
      .catch(err => {
        console.error("Erreur suppression image :", err);
        alert("Erreur serveur");
      });
  }
}
