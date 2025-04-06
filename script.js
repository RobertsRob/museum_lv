const slidesContainer = document.getElementById('slides-container');
const progressBar = document.querySelector('.progress-bar');
let slides = [];
let currentSlideIndex = 0;

// Fetch slides from the JSON file
fetch('slides.json')
  .then(response => response.json())
  .then(data => {
    slides = data;
    renderSlides();
    updateProgressBar();
  })
  .catch(error => console.error('Error loading slides:', error));

// Render slides dynamically
function renderSlides() {
  slidesContainer.innerHTML = slides
    .map((slide, index) => `
      <div class="slide ${index === 0 ? 'active' : ''}">
        <div class="slide-images">
          ${slide.image.map(image => `<img src="${image}" alt="Slide Image">`).join('')}
        </div>
        <h2>${slide.title}</h2>
        <p>${slide.content}</p>
      </div>
    `)
    .join('');
}

// Update progress bar
function updateProgressBar() {
  const progress = ((currentSlideIndex) / (slides.length - 1)) * 100;
  progressBar.style.width = progress + '%';
}

// Show a specific slide
function showSlide(index) {
  const slideElements = document.querySelectorAll('.slide');
  slideElements.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  currentSlideIndex = index;
  updateProgressBar();
}

// Navigate to the previous slide
function prevSlide() {
  const newIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
  showSlide(newIndex);
}

// Navigate to the next slide
function nextSlide() {
  const newIndex = (currentSlideIndex + 1) % slides.length;
  showSlide(newIndex);
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft') prevSlide();
});