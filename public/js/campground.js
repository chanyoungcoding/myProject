const tags = document.querySelector('.tag__Sharp');

tags.addEventListener('click', (e) => {
  e.preventDefault();
  e.target.classList.toggle('tag__toggle')
})

// swiper

const swiper = new Swiper('.swiper', {
  slidesPerView : 'auto', // 한 슬라이드에 보여줄 갯수
  spaceBetween : 20, // 슬라이드 사이 여백
  loop: true,
  loopAdditionalSlides : 1, // 슬라이드 반복 시 마지막 슬라이드에서 다음 슬라이드가 보여지지 않는 현상 수정

  autoplay : {  // 자동 슬라이드 설정 , 비 활성화 시 false
    delay : 3000,   // 시간 설정
    disableOnInteraction : false,  // false로 설정하면 스와이프 후 자동 재생이 비활성화 되지 않음
  },

  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-right',
    prevEl: '.swiper-button-left',
  },
});

// 스크롤 시 해당 페이지 기억 하고 있다가 새로고침 시 해당 페이지로 이동
window.addEventListener('scroll', function () {
  localStorage.setItem('scrollPosition', window.scrollY);
});

window.addEventListener('load', function () {
  const savedScrollPosition = localStorage.getItem('scrollPosition');

  if (savedScrollPosition !== null) {
    window.scrollTo(0, savedScrollPosition);
  }
});

// 버튼 클릭시 원하는 부분의 페이지로 이동

const buttonsAs = document.querySelectorAll('.buttons__a');
buttonsAs.forEach(x => x.addEventListener('click', () => {
  localStorage.setItem('scrollPosition', 2390);
}))
