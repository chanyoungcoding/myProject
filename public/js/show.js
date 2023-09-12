const prevButton = document.getElementById('prevBtn');
const nextButton = document.getElementById('nextBtn');
const carouselSlide = document.querySelectorAll('.carousel-slide');

const carouselContainer = document.querySelector('#tagContainer');

let slideIndex = 0;

// 다음 이미지 표시
nextButton.addEventListener('click', () => {
    ++slideIndex;
    showSlide();
});

// 이전 이미지 표시
prevButton.addEventListener('click', () => {
    --slideIndex;
    showSlide();
});

// 이미지 표시 함수
function showSlide() {
    const slides = document.querySelectorAll('.carousel-slide');
    if (slideIndex >= slides.length) {
        slideIndex = 0;
    }
    if (slideIndex < 0) {
        slideIndex = slides.length - 1;
    }
    const offset = -slideIndex * 100;
    carouselSlide.forEach(slide => slide.style.transform = `translateX(${offset}%)`)
}

showSlide();

// 카루셀 반복 및 정지, 재실행

let repeatCarousel = setInterval(() => {
    ++slideIndex;
    showSlide();
}, 4000)

carouselContainer.addEventListener('mouseenter', () => {
    clearInterval(repeatCarousel);
})

carouselContainer.addEventListener('mouseleave', () => {
    repeatCarousel =  setInterval(() => {
        ++slideIndex;
        showSlide();
    }, 4000)
})

// tagdetail img intro

const boxIntro = document.querySelectorAll('.box__intro');

boxIntro.forEach(box => {
    box.addEventListener('mouseenter', () => {
        box.style.height = '100%'
    })

    box.addEventListener('mouseleave', () => {
        box.style.height = '30%'
    })
})


// tagdetail 페이지에서 DB 개수 한도 초과시 버튼 작동 금지
const tagDetailA = document.querySelector('#tagdetail__a')

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const more = Number(urlParams.get('more')) + 12 ;
const basicTotal = Number(urlParams.get('total'))
const total = basicTotal === 0 ? 1000 : basicTotal;

tagDetailA.addEventListener('click', (e) => {
    if(more > total) {
        e.preventDefault();
        alert('캠프가 더이상 없습니다.')
    }
})

