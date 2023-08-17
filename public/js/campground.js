const tags = document.querySelector('.tag__Sharp');

tags.addEventListener('click', (e) => {
  e.preventDefault();
  e.target.classList.toggle('tag__toggle')
})