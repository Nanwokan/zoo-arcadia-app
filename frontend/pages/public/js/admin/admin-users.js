let currentUserId = null;
let allUsers = [];

document.addEventListener("DOMContentLoaded", () => {
  if (!token) return (window.location.href = "login.html");

  loadRoles();
  loadUsers();

  document.getElementById("searchInput").addEventListener("input", renderFilteredUsers);
  document.getElementById("roleFilter").addEventListener("change", renderFilteredUsers);
  document.getElementById("clearSearch").addEventListener("click", () => {
    document.getElementById("searchInput").value = "";
    renderFilteredUsers();
  });

  document.getElementById("addUserForm").addEventListener("submit", handleUserSubmit);
});

function loadRoles() {
  fetch("http://localhost:2024/api/roles", {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .then((roles) => {
      const select = document.getElementById("roleChoice");

      roles.forEach((role) => {
        if (role.id !== 1) {
          const opt = document.createElement("option");
          opt.value = role.id;
          opt.textContent = role.label;
          select.appendChild(opt);
        }
      });
    });
}

function populateRoleFilter(data) {
  const select = document.getElementById("roleFilter");
  const roles = [...new Set(data.map((u) => u.role_label))];

  roles.forEach((role) => {
    const opt = document.createElement("option");
    opt.value = role;
    opt.textContent = role;
    select.appendChild(opt);
  });
}

function loadUsers() {
  fetch("http://localhost:2024/api/utilisateurs", {
    headers: { Authorization: `Bearer ${token}` },
  })
    .then((res) => res.json())
    .then((utilisateurs) => {
      allUsers = utilisateurs;
      populateRoleFilter(utilisateurs);
      renderFilteredUsers();
    })
    .catch((err) => {
      console.error("Erreur chargement utilisateurs :", err);
      alert("Erreur lors du chargement des utilisateurs.");
    });
}

function renderFilteredUsers() {
  const container = document.getElementById("usersList");
  container.innerHTML = "";

  const search = document.getElementById("searchInput").value.toLowerCase();
  const selectedRole = document.getElementById("roleFilter").value;

  const filtered = allUsers.filter((user) => {
    const matchRole = !selectedRole || user.role_label === selectedRole;
    const matchText =
      user.nom.toLowerCase().includes(search) ||
      user.prenom.toLowerCase().includes(search) ||
      user.email.toLowerCase().includes(search);

    return matchRole && matchText;
  });

  filtered.forEach((utilisateur) => {
    const fullName = `${utilisateur.prenom} ${utilisateur.nom}`;
    const initials = `${utilisateur.prenom?.[0] || ""}${utilisateur.nom?.[0] || ""}`;
    const imageUrl =
      utilisateur.photo_profil_url ||
      `https://ui-avatars.com/api/?name=${initials}&background=random&bold=true&size=256`;

    const card = document.createElement("div");
    card.className = "user-card";
    card.innerHTML = `
      <img src="${imageUrl}" alt="${fullName}">
      <div class="content">
          <h3>${fullName}</h3>
          <div class="admin-actions">
              <button class="edit-password-only" onclick="editPassword(${utilisateur.id})"><i class="fa-solid fa-lock"></i></button>
              <button class="edit-btn" onclick='editUser(${JSON.stringify(utilisateur)})'><i class="fa-solid fa-pen"></i></button>
              <button class="delete-btn" onclick="deleteUser(${utilisateur.id})"><i class="fa-solid fa-trash"></i></button>
          </div>
      </div>
    `;
    container.appendChild(card);
  });
}

function editUser(utilisateur) {
  document.getElementById("formContainer").classList.add("show");
  document.getElementById("prenom").value = utilisateur.prenom;
  document.getElementById("nom").value = utilisateur.nom;
  document.getElementById("email").value = utilisateur.email;
  document.getElementById("roleChoice").value = utilisateur.role_id;
  document.querySelector("#addUserForm button").textContent = "Mettre à jour l'utilisateur";
  currentUserId = utilisateur.id;
}

function editPassword(id) {
  const nouveauMotDePasse = prompt("Entrez le nouveau mot de passe :");

  if (nouveauMotDePasse) {
    fetch(`http://localhost:2024/api/utilisateurs/${id}/password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ mot_de_passe: nouveauMotDePasse }),
    })
      .then((res) => res.json())
      .then((data) => {
        alert(data.message || "Mot de passe mis à jour !");
      })
      .catch((err) => {
        console.error("Erreur changement mot de passe :", err);
        alert("Erreur serveur");
      });
  }
}

function deleteUser(id) {
  if (confirm("Voulez-vous vraiment supprimer cet utilisateur ?")) {
    fetch(`http://localhost:2024/api/utilisateurs/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          alert("Utilisateur supprimé ✅");
          window.location.reload();
        } else {
          alert("Erreur lors de la suppression ❌");
        }
      })
      .catch((err) => {
        console.error("Erreur suppression :", err);
        alert("Erreur serveur");
      });
  }
}

async function handleUserSubmit(e) {
  e.preventDefault();

  const form = e.target;
  const prenom = form.prenom.value;
  const nom = form.nom.value;
  const email = form.email.value;
  const password = form.mot_de_passe.value;
  const confirmPassword = form.Comparaison_mot_de_passe.value;
  const role_id = form.roleChoice.value;
  const photo = form["photo-profil"].files[0];

  if (password !== confirmPassword) {
    alert("Les mots de passe ne correspondent pas !");
    return;
  }

  const formData = new FormData();
  formData.append("prenom", prenom);
  formData.append("nom", nom);
  formData.append("email", email);
  formData.append("mot_de_passe", password);
  formData.append("role_id", role_id);
  if (photo) formData.append("photo", photo);

  const url = currentUserId
    ? `http://localhost:2024/api/utilisateurs/${currentUserId}`
    : `http://localhost:2024/api/utilisateurs`;

  const method = currentUserId ? "PUT" : "POST";

  try {
    const res = await fetch(url, {
      method,
      headers: { Authorization: `Bearer ${token}` },
      body: formData,
    });

    const contentType = res.headers.get("Content-Type");
    const data = contentType?.includes("application/json") ? await res.json() : null;

    if (!res.ok) {
      const message = data?.message || "Erreur serveur";
      throw new Error(message);
    }

    alert(currentUserId ? "Utilisateur modifié ✅" : "Utilisateur créé ✅");

    form.reset();
    document.getElementById("previewImage").src = "../assets/default-avatar.jpg";
    currentUserId = null;
    form.querySelector("button").textContent = "Bienvenue nouvel Arcadien !";
    window.location.reload();
  } catch (err) {
    console.error("Erreur enregistrement :", err);
    alert("Erreur serveur : " + err.message);
  }
}
