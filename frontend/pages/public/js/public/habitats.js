fetch('https://zoo-arcadia-app-production.up.railway.app/api/habitats')
  .then(res => res.json())
  .then(data => {
    const container = document.querySelector('.habitats-list');
    container.innerHTML = ''; // On vide le contenu par défaut

    data.forEach(habitat => {
      const card = document.createElement('div');
      card.className = 'habitat-card';
      card.style.backgroundImage = `url(${habitat.image_url})`;
      card.style.backgroundSize = 'cover';
      card.style.backgroundPosition = 'center';

      card.innerHTML = `
        <div class="habitat-card-content">
          <h3>${habitat.nom}</h3>
          <p>${habitat.description}</p>
        </div>
      `;

      card.addEventListener('click', () => {
        window.location.href = `habitat-details.html?id=${habitat.id}`;
      });
      

      container.appendChild(card);
    });
  })
  .catch(err => {
    console.error('Erreur lors du chargement des habitats :', err);
  });
