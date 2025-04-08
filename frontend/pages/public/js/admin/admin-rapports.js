document.addEventListener('DOMContentLoaded', () => {
    const rapportList = document.getElementById('rapportList');
    const searchInput = document.getElementById('searchReport');
    const dateFilter = document.getElementById('dateFilter');
    const animalFilter = document.getElementById('animalFilter');
    const clearSearchBtn = document.getElementById('clearSearchReport');

    let rapports = [];

    async function fetchRapports() {
        const token = localStorage.getItem("token");
        try {
            const response = await fetch('https://zoo-arcadia-app-production.up.railway.app/api/rapports-veterinaires', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            console.log("Résultat brut de l’API :", data);

            if (!Array.isArray(data)) {
                console.error("Données inattendues :", data);
                return;
            }

            rapports = data;
            renderRapports(rapports);
            populateAnimalFilter(rapports);
        } catch (err) {
            console.error('Erreur lors du chargement des rapports :', err);
        }
    }

    function populateAnimalFilter(rapports) {
        const animaux = [...new Set(rapports.map(r => r.animal_prenom))];
        animaux.forEach(nom => {
            const option = document.createElement('option');
            option.value = nom;
            option.textContent = nom;
            animalFilter.appendChild(option);
        });
    }

    function renderRapports(data) {
        console.log("Données reçues pour affichage :", data);

        if (!data.length) {
            console.log("Aucun rapport à afficher !");
        }

        rapportList.innerHTML = "";
        data.forEach(r => {
            const card = document.createElement('div');
            card.classList.add('rapport-card');
            card.innerHTML = `
                
                <div class="rapport-info">
                <h3>${r.animal_prenom}</h3>
                <p><strong>Date :</strong> ${new Date(r.date_passage).toLocaleDateString()}</p>
                <p><strong>État :</strong> ${r.etat}</p>
                <p><strong>Nourriture :</strong> ${r.nourriture} (${r.grammage} kg)</p>
                <p class="veto-nom"><i class="fa-solid fa-user-doctor"></i> : ${r.veterinaire}</p>
                <p class="rapport-detail observation">
                    ${r.detail.length > 100
                        ? r.detail.slice(0, 100) + '... <span class="voir-plus" data-full="' + r.detail + '">Voir plus</span>'
                        : r.detail}
                </p>
                </div>
                <img src="${r.image_url}" alt="${r.animal_prenom}" class="rapport-image"/>
            `;
            rapportList.appendChild(card);
        });

        // Voir plus
        document.querySelectorAll('.voir-plus').forEach(btn => {
            btn.addEventListener('click', () => {
                btn.parentElement.textContent = btn.getAttribute('data-full');
            });
        });
    }

    function filterRapports() {
        const search = searchInput.value.toLowerCase();
        const selectedAnimal = animalFilter.value;
        const selectedDate = dateFilter.value;

        const filtered = rapports.filter(r => {
            const matchAnimal = selectedAnimal ? r.animal_prenom === selectedAnimal : true;
            const matchDate = selectedDate ? r.date_passage.startsWith(selectedDate) : true;
            const matchText = r.detail?.toLowerCase().includes(search) ||
            r.animal_prenom?.toLowerCase().includes(search);
            return matchAnimal && matchDate && matchText;
        });

        renderRapports(filtered);

    }

    searchInput.addEventListener('input', filterRapports);
    animalFilter.addEventListener('change', filterRapports);
    dateFilter.addEventListener('change', filterRapports);
    clearSearchBtn.addEventListener('click', () => {
        searchInput.value = '';
        filterRapports();
    });

    fetchRapports();
});
