document.addEventListener('DOMContentLoaded', async () => {
    const params = new URLSearchParams(window.location.search);
    const animalId = params.get('id');

    const mainImage = document.getElementById('mainImage');
    const galleryThumbnails = document.getElementById('galleryThumbnails');
    const animalName = document.getElementById('animalName');
    const animalRace = document.getElementById('animalRace');
    const animalHabitat = document.getElementById('animalHabitat');
    const animalEtat = document.getElementById('animalEtat');
    const animalViews = document.getElementById('animalViews');
    const rapportList = document.getElementById('rapportList');

    if (!animalId) {
        alert("Animal introuvable.");
        return;
    }

    try {
        // === 1. Récupérer tous les animaux et chercher celui concerné
        const resAnimal = await fetch(`http://localhost:2024/api/animals`);
        const animaux = await resAnimal.json();
        const animal = animaux.find(a => a.id == animalId);
        if (!animal) return animalName.textContent = "Animal non trouvé";

        // ✅ Incrémenter la vue seulement si l’animal existe
        await fetch(`http://localhost:2024/api/statistiques/increment/${animal.id}`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nom: animal.prenom })
        });

        if (!animal) return animalName.textContent = "Animal non trouvé";

        animalName.textContent = animal.prenom;
        animalRace.textContent = `Race : ${animal.race}`;
        animalHabitat.textContent = `Habitat : ${animal.habitat}`;

        // === 2. Images : toutes + galerie
        const resImages = await fetch(`http://localhost:2024/api/animals/${animalId}/images`);
        const images = await resImages.json();

        const main = images[0]?.url || "https://via.placeholder.com/500";
        mainImage.src = main;

        images.forEach((img, index) => {
            const thumb = document.createElement('img');
            thumb.src = img.url;
            thumb.alt = `Image ${index + 1}`;
            thumb.addEventListener('click', () => {
                mainImage.src = img.url;
            });
            galleryThumbnails.appendChild(thumb);
        });

        // === 3. Récupérer uniquement le dernier rapport
        const resRapports = await fetch(`http://localhost:2024/api/public/rapports-veterinaires/${animalId}`);
        const rapports = await resRapports.json();

        if (Array.isArray(rapports) && rapports.length > 0) {
            const r = rapports[0]; // ✅ uniquement le plus récent

            animalEtat.textContent = `État vétérinaire : ${r.etat}`;

            const card = document.createElement('div');
            card.className = "rapport-card";
            card.innerHTML = `
    <p><strong>Date :</strong> ${new Date(r.date_passage).toLocaleDateString()}</p>
    <p><strong>État :</strong> ${r.etat}</p>
    <p><strong>Nourriture :</strong> ${r.nourriture} (${r.grammage} kg)</p>
    <p><strong>Vétérinaire :</strong> ${r.veterinaire}</p>
    <p><strong>Observation :</strong> ${r.detail}</p>
  `;
            rapportList.appendChild(card);
        } else {
            animalEtat.textContent = "État vétérinaire : Non renseigné";
            rapportList.innerHTML = "<p>Aucun rapport vétérinaire trouvé.</p>";
        }


        // === 4. Statistiques MongoDB
        const resVues = await fetch(`http://localhost:2024/api/consultations`);
        const stats = await resVues.json();
        const vue = stats.find(v => v.nom === animal.prenom);
        animalViews.textContent = `👁️ Consultations : ${vue?.vues || 0}`;

    } catch (err) {
        console.error("Erreur chargement fiche animal :", err);
        animalName.textContent = "Erreur lors du chargement.";
    }
});
