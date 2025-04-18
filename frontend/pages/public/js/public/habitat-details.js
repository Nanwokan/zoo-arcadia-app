document.addEventListener('DOMContentLoaded', () => {
    const habitatSelect = document.getElementById('habitatSelect');
    const habitatTitle = document.getElementById('habitatTitle');
    const habitatDescription = document.getElementById('habitatDescription');
    const animalList = document.getElementById('animalList');

    const urlParams = new URLSearchParams(window.location.search);
    let currentHabitatId = urlParams.get('id');
    console.log("Habitat sélectionné :", currentHabitatId);


    async function fetchHabitats() {
        try {
            const res = await fetch('https://zoo-arcadia-app-production.up.railway.app/api/habitats');
            const habitats = await res.json();

            // Remplir le select
            habitats.forEach(h => {
                const option = document.createElement('option');
                option.value = h.id;
                option.textContent = h.nom;
                habitatSelect.appendChild(option);
            });

            // Sélectionner celui de l’URL
            if (currentHabitatId) {
                habitatSelect.value = currentHabitatId;
                const habitat = habitats.find(h => h.id == currentHabitatId);
                if (habitat) {
                    habitatTitle.textContent = habitat.nom;
                    habitatDescription.textContent = habitat.description;
                }
                fetchAnimals(currentHabitatId);
            }

            // Écoute du select pour changer d'habitat
            habitatSelect.addEventListener('change', () => {
                currentHabitatId = habitatSelect.value;
                const habitat = habitats.find(h => h.id == currentHabitatId);
                habitatTitle.textContent = habitat.nom;
                habitatDescription.textContent = habitat.description;
                fetchAnimals(currentHabitatId);
            });
        } catch (err) {
            console.error("Erreur chargement habitats :", err);
        }
    }

    async function fetchAnimals(habitatId) {
        try {
            const res = await fetch('https://zoo-arcadia-app-production.up.railway.app/api/animals');
            const allAnimals = await res.json();
            const animaux = allAnimals.filter(a => a.habitat_id == habitatId);
            console.log("Animaux chargés :", animaux);


            animalList.innerHTML = ''; // vider avant de recharger

            for (const animal of animaux) {
                const rapports = await fetchRapports(animal.id);
                console.log("Rapports pour", animal.id, rapports);

                const dernierRapport = rapports.length ? rapports[0] : null;

                const card = document.createElement('div');
                card.className = 'animal-card';
                card.innerHTML = `
            <img src="${animal.image_url}" alt="${animal.prenom}" />

            <h3>${animal.prenom}</h3>
            <p><strong>Race :</strong> ${animal.race}</p>
            <button data-id="${animal.id}" data-nom="${animal.prenom}">Voir fiche</button>
          `;

                // clic sur bouton = vue + redirection
                card.querySelector('button').addEventListener('click', () => {
                    fetch(`https://zoo-arcadia-app-production.up.railway.app/api/statistiques/increment/${animal.id}`, {
                        method: 'POST',
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ nom: animal.prenom })
                    });
                    window.location.href = `fiche-animal.html?id=${animal.id}`;
                });

                animalList.appendChild(card);
            }
        } catch (err) {
            console.error("Erreur chargement animaux :", err);
        }
    }

    async function fetchRapports(animalId) {
        try {
            const res = await fetch(`https://zoo-arcadia-app-production.up.railway.app/api/rapports-veterinaires/${animalId}`);
            return await res.json();
        } catch (err) {
            console.error("Erreur chargement rapports :", err);
            return [];
        }
    }

    fetchHabitats();
});
