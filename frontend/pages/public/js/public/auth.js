document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const mot_de_passe = document.getElementById('mot_de_passe').value;

  try {
    const res = await fetch('https://zoo-arcadia-app-production.up.railway.app/api/utilisateurs/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, mot_de_passe })
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem('token', data.token);
      localStorage.setItem('utilisateur', JSON.stringify(data.utilisateur));

      // Redirection selon le rôle
      const role = data.utilisateur.role_id;
      if (role === 1) {
        window.location.href = './admin/admin.html';
      } else if (role === 2) {
        window.location.href = './employe/employe.html';
      } else if (role === 3) {
        window.location.href = './veto/veterinaire.html';
      } else {
        alert("Rôle non reconnu.");
      }
    } else {
      alert(data.message || 'Erreur de connexion');
    }
  } catch (err) {
    console.error(err);
    alert('Erreur lors de la tentative de connexion');
  }
});
