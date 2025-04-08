fetch('https://zoo-arcadia-app-production.up.railway.app/api/services')
  .then(res => res.json())
  .then(data => {
    const container = document.querySelector('.services-list');
    container.innerHTML = ''; // On vide le contenu par défaut

    data.forEach(service => {
      const card = document.createElement('div');
      card.className = 'service-card';
      card.style.backgroundImage = `url(${service.image_url})`;
      card.style.backgroundSize = 'cover';
      card.style.backgroundPosition = 'center';

      card.innerHTML = `
        <div class="service-card-content">
          <h3>${service.nom}</h3>
          <p>${service.description}</p>
        </div>
      `;

      container.appendChild(card);
    });
  })
  .catch(err => {
    console.error('Erreur lors du chargement des services :', err);
  });
