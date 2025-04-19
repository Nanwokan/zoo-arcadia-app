
  const toggle = document.getElementById('menuToggle');
  const sidebar = document.querySelector('.sidebar');

  toggle?.addEventListener('click', () => {
    sidebar.classList.toggle('sidebar-mobile-visible');
  });

