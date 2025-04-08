function closeHeroModal() {
  document.getElementById("heroModal").style.display = "none";
}

function openHeroModal(hero) {
  document.getElementById("heroModal").style.display = "flex";
  document.getElementById("heroTitle").value = hero.titre;
  document.getElementById("heroDesc").value = hero.description;
}

fetch('https://zoo-arcadia-app-production.up.railway.app/api/hero')
  .then(res => res.json())
  .then(hero => {
    const container = document.querySelector('.hero-card');
    container.style.backgroundImage = `url(${hero.image_url})`;
    container.style.backgroundSize = 'cover';
    container.style.backgroundPosition = 'center';

    container.innerHTML = ''; // On vide le contenu de la section

    const content = document.createElement('div');
    content.className = 'hero-card-content';

    content.innerHTML = `
      <h3>${hero.titre}</h3>
      <p>${hero.description}</p>
    `;

    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.innerHTML = `<i class="fa-solid fa-pen"></i>`;
    editBtn.addEventListener('click', () => openHeroModal(hero));

    content.appendChild(editBtn);
    container.appendChild(content);
  })
  .catch(err => {
    console.error('Erreur lors du chargement du Hero :', err);
  });


// ✅ Soumission du formulaire de mise à jour
document.getElementById('heroForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  const token = localStorage.getItem('token');

  try {
    await fetch('https://zoo-arcadia-app-production.up.railway.app/api/hero', {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`
      },
      body: formData
    });

    closeHeroModal();
    location.reload();
  } catch (err) {
    console.error("Erreur mise à jour Hero :", err);
  }
});
