const token = localStorage.getItem('token');
  const utilisateur = JSON.parse(localStorage.getItem('utilisateur'));
  
document.addEventListener("DOMContentLoaded", () => {
  

  if (!token || !utilisateur || utilisateur.role_id !== 1) {
    return (window.location.href = '../login.html');
  }

  // Remplir les infos de l'utilisateur connecté
  document.getElementById('userInfo').innerHTML = `
    <img src="${utilisateur.photo_profil_url}" alt="Photo" class="avatar-admin">
    <p>${utilisateur.prenom} ${utilisateur.nom}</p>
  `;

  const links = document.querySelectorAll('.sidebar-nav a');
  const currentPage = window.location.pathname.split("/").pop();
  links.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === currentPage);
  });
});
