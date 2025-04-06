const slides = document.querySelectorAll('.slide');
const progressBar = document.querySelector('.progress-bar');
let currentSlideIndex = 0;

function updateProgressBar() {
  const progress = ((currentSlideIndex) / (slides.length-1)) * 100;
  progressBar.style.width = progress + '%';
}

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  currentSlideIndex = index;
  updateProgressBar();
}

function prevSlide() {
  const newIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
  showSlide(newIndex);
}

function nextSlide() {
  const newIndex = (currentSlideIndex + 1) % slides.length;
  showSlide(newIndex);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft') prevSlide();
});

// Initialize the progress bar on page load
updateProgressBar();