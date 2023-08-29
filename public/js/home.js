const imgH1 = document.querySelector('.img__h1');
const badgeEl = document.querySelector('.home__badgeEl');

// center font
gsap.to(imgH1, 2, {
  opacity: 1,
});

// badge 
window.addEventListener('scroll', _.throttle(() => {
  console.log('event')
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
}, 300))

