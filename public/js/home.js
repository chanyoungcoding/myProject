const imgH1 = document.querySelector('.img__h1');
const badgeEl = document.querySelector('.home__badgeEl');

// center font
gsap.to(imgH1, 2, {
  opacity: 1,
});

// badge 
window.addEventListener('scroll', _.throttle(() => {
  if(window.scrollY > 700) {
    gsap.to(badgeEl, .6, {
      opacity: 0,
      display: 'none'
    })
  } else {
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display:'flex'
    })
  }
}, 300));

// text or img slide

const spyEls = document.querySelectorAll('.scroll-spy')

spyEls.forEach(function (spyEl) {
  new ScrollMagic
    .Scene({
      triggerElement:spyEl, //보여짐 여부를 감시할 요소
      triggerHook: .8       //내가 보는 웹사이트 기준 80% 정도
    })                        // 80%정도일때 setClassToggle 실행
    .setClassToggle(spyEl, 'show')
    .addTo(new ScrollMagic.Controller());
})
