const prevButton = document.getElementById('prevBtn');
const nextButton = document.getElementById('nextBtn');
const carouselSlide = document.querySelectorAll('.carousel-slide');


console.log('hello')

let slideIndex = 0;

// 다음 이미지 표시
nextButton.addEventListener('click', () => {
    ++slideIndex;
    console.log(slideIndex)
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
