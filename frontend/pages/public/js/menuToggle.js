const toggle = document.getElementById("menuToggle");
const navbar = document.getElementById("navbar");

toggle.addEventListener("click", () => {
    navbar.classList.toggle("active");
});