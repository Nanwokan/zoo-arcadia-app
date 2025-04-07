const toggleBtn = document.getElementById('toggleFormBtn');
const formContainer = document.getElementById('formContainer');

toggleBtn.addEventListener('click', () => {
  formContainer.classList.toggle('show');
});


