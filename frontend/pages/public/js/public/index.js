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
    fetch('https://zoo-arcadia-back.onrender.com/api/hero')
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
    fetch("https://zoo-arcadia-back.onrender.com/api/habitats")
      .then(res => res.json())
      .then(habitats => {
        const container = document.getElementById("habitatContainer");
        container.innerHTML = "";
        habitats.slice(0, 4).forEach(habitat => {
          container.innerHTML += `
            <div class="habitat-card">
              <img src="${habitat.image}" alt="${habitat.nom}">
              <h3>${habitat.nom}</h3>
              <p>${habitat.description}</p>
            </div>`;
        });
      })
      .catch(err => console.error("Erreur chargement habitats :", err));
  }
  
  // --- SERVICES ---
  function fetchServices() {
    fetch("https://zoo-arcadia-back.onrender.com/api/services")
      .then(res => res.json())
      .then(services => {
        const container = document.getElementById("serviceContainer");
        container.innerHTML = "";
        services.slice(0, 3).forEach(service => {
          container.innerHTML += `
            <div class="service-item">
              <span>${service.icone || "🌟"}</span>
              <h3>${service.nom}</h3>
              <p>${service.description}</p>
            </div>`;
        });
      })
      .catch(err => console.error("Erreur chargement services :", err));
  }
  
  // --- AVIS ---
  let currentSlide = 0;
  let totalSlides = 0;
  
  function loadAvis() {
    fetch("https://zoo-arcadia-back.onrender.com/api/avis/valides")
      .then(res => res.json())
      .then(data => {
        const container = document.getElementById("avisContainer");
        container.innerHTML = "";
        data.forEach(avis => {
          const card = createAvisCard(avis);
          container.appendChild(card);
        });
  
        totalSlides = Math.ceil(data.length / 3);
        updateSliderPosition();
      })
      .catch(err => console.error("Erreur chargement avis :", err));
  }
  
  function createAvisCard(avis) {
    const avatar = avis.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(avis.prenom)}+${encodeURIComponent(avis.nom)}&background=random&size=128`;
  
    const card = document.createElement("div");
    card.className = "avis-card";
    card.innerHTML = `
      <span class="badge-approved">Approuvé</span>
      <img src="${avatar}" alt="${avis.nom}" class="avatar">
      <h3>${avis.prenom} ${avis.nom}</h3>
      <p>${avis.avis_text}</p>
      <small>${formatDate(avis.date_creation)}</small>
    `;
    return card;
  }
  
  function updateSliderPosition() {
    const container = document.getElementById("avisContainer");
    const slideWidth = container.offsetWidth;
    container.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
  }
  
  function setupSliderControls() {
    document.getElementById("prevAvisBtn").addEventListener("click", () => {
      if (currentSlide > 0) {
        currentSlide--;
        updateSliderPosition();
      }
    });
  
    document.getElementById("nextAvisBtn").addEventListener("click", () => {
      if (currentSlide < totalSlides - 1) {
        currentSlide++;
        updateSliderPosition();
      }
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
  
      fetch("https://zoo-arcadia-back.onrender.com/api/avis", {
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