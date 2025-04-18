document.addEventListener("DOMContentLoaded", () => {
  initApp();
});

function initApp() {
  fetchHero();
  fetchHabitat();
  fetchServices();
  loadAvis();

  setupAvisForm();
  setupSliderControls();
}

// --- HERO dynamique ---
function fetchHero() {
  fetch('https://zoo-arcadia-app-production.up.railway.app/api/hero')
    .then(res => res.json())
    .then(hero => {
      const heroSection = document.querySelector('.hero');
      const h1 = heroSection?.querySelector('h1');
      const p = heroSection?.querySelector('p');

      if (hero?.titre && h1) h1.textContent = hero.titre;
      if (hero?.description && p) p.textContent = hero.description;

      if (hero.image_url && typeof hero.image_url === 'string') {
        heroSection.style.backgroundImage = `url(${hero.image_url})`;
        heroSection.style.backgroundSize = 'cover';
        heroSection.style.backgroundPosition = 'bottom';
      } else {
        console.warn("Pas d'image définie pour le hero.");
      }
    })
    .catch(err => {
      console.error("❌ Erreur chargement hero index :", err);
    });
}

// --- HÉBERGEMENTS ---
function fetchHabitat() {
  fetch("https://zoo-arcadia-app-production.up.railway.app/api/habitats")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("habitatContainer");
      container.innerHTML = "";

      data.slice(0, 4).forEach(habitat => {
        const card = document.createElement('div');
        card.className = 'habitat-card';
        card.style.backgroundImage = `url(${habitat.image_url})`;
        card.style.backgroundSize = 'cover';
        card.style.backgroundPosition = 'center';
        card.style.cursor = 'pointer';

        card.innerHTML = `
            <div class="habitat-card-content">
              <h3>${habitat.nom}</h3>
            </div>
          `;

        card.addEventListener('click', () => {
          window.location.href = `habitats.html`;
        });

        container.appendChild(card);
      });
    })
    .catch(err => console.error("Erreur chargement habitats :", err));
}

// --- SERVICES ---
function fetchServices() {
  fetch("https://zoo-arcadia-app-production.up.railway.app/api/services")
    .then(res => res.json())
    .then(services => {
      const container = document.getElementById("serviceContainer");
      container.innerHTML = "";
      services.slice(0, 3).forEach(service => {
        container.innerHTML += `
            <div class="service-item">
              <span>${service.icone || "🌟"}</span>
              <h3>${service.nom}</h3>
            </div>`;

        container.addEventListener('click', () => {
          window.location.href = `services.html`;
        });

      });
    })
    .catch(err => console.error("Erreur chargement services :", err));
}

let currentSlide = 0;
let totalSlides = 0;

function loadAvis() {
  fetch("https://zoo-arcadia-app-production.up.railway.app/api/avis/valides")
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("avisContainer");
      container.innerHTML = "";
      data.forEach(avis => {
        const card = createAvisCard(avis);
        container.appendChild(card);
      });

      totalSlides = data.length;
      updateSliderPosition();
    })
    .catch(err => console.error("Erreur chargement avis :", err));
}

function createAvisCard(avis) {
  const avatar = avis.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(avis.prenom)}+${encodeURIComponent(avis.nom)}&background=random&size=128`;

  const card = document.createElement("div");
  card.className = "avis-card";
  card.innerHTML = `
    <span class="badge-approved">✔</span>
    <div class="avis-infos">
      <img src="${avatar}" alt="${avis.nom}" class="avatar">
      <h3>${avis.prenom} ${avis.nom}</h3>
    </div>
    <small>${formatDate(avis.date_creation)}</small>
    <p>${avis.avis_text}</p>
  `;
  return card;
}

function getCardWidth() {
  const container = document.getElementById("avisContainer");
  const card = container.querySelector(".avis-card");
  if (!card) return 0;
  const style = getComputedStyle(card);
  return card.offsetWidth + parseFloat(style.marginLeft) + parseFloat(style.marginRight);
}

function getVisibleCount() {
  const container = document.getElementById("avisContainer");
  const cardWidth = getCardWidth();
  return cardWidth ? Math.floor(container.parentElement.offsetWidth / cardWidth) : 1;
}

function updateSliderPosition() {
  const container = document.getElementById("avisContainer");
  const cardWidth = getCardWidth();
  const visibleCount = getVisibleCount();
  const maxSlide = Math.max(0, totalSlides - visibleCount);

  currentSlide = Math.min(currentSlide, maxSlide);
  container.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
}

function setupSliderControls() {
  document.getElementById("prevAvisBtn").addEventListener("click", () => {
    currentSlide = Math.max(0, currentSlide - getVisibleCount());
    updateSliderPosition();
  });

  document.getElementById("nextAvisBtn").addEventListener("click", () => {
    const maxSlide = Math.max(0, totalSlides - getVisibleCount());
    currentSlide = Math.min(maxSlide, currentSlide + getVisibleCount());
    updateSliderPosition();
  });

  window.addEventListener("resize", updateSliderPosition);
}


// --- FORMULAIRE D'AVIS ---
function setupAvisForm() {
  const form = document.getElementById("formAvis");
  const toggleBtn = document.getElementById("toggleFormBtn");

  toggleBtn?.addEventListener("click", () => {
    form.style.display = form.style.display === "none" ? "block" : "none";
  });

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const prenom = document.getElementById("prenom").value;
    const nom = document.getElementById("nom").value;
    const avis_text = document.getElementById("avis_text").value;

    fetch("https://zoo-arcadia-app-production.up.railway.app/api/avis", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nom, prenom, avis_text })
    })
      .then((res) => res.json())
      .then(() => {
        alert("Merci pour votre avis ! Il sera publié après validation.");
        form.reset();
        form.style.display = "none";
      })
      .catch((err) => {
        console.error("Erreur envoi avis :", err);
        alert("Une erreur s'est produite. Veuillez réessayer.");
      });
  });
}