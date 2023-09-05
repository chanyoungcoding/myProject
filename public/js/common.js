
// navbar

window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar')
  const scrollTop = window.scrollY;

  if (scrollTop > 100) {
      navbar.classList.add('fixed');
  } else {
      navbar.classList.remove('fixed');
  }
});