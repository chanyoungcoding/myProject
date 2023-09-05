const navbar = document.querySelector('.navbar')

// 윈도우 스크롤 시 navbar 고정
function handleWindowScroll() {
  const scrollTop = window.scrollY;
  if (scrollTop > 100) {
      navbar.classList.add('fixed');
  } else {
      navbar.classList.remove('fixed');
  }
}

window.addEventListener('scroll', handleWindowScroll); 
