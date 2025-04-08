export function incrementAnimalView(animalId, animalPrenom) {
    fetch(`https://zoo-arcadia-app-production.up.railway.app/api/statistiques/increment/${animalId}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ nom: animalPrenom })
    })
      .then(() => console.log(`Vue enregistrée pour ${animalPrenom}`))
      .catch(err => console.error("Erreur d'incrémentation :", err));
  }
  