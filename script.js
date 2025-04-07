const slidesContainer = document.getElementById('slides-container');
const progressBar = document.querySelector('.progress-bar');
let slides = [];
let currentSlideIndex = 0;
let sizesInPercent = [100, 150, 100, 180, 125, 115, 100, 170, 115, 110, 100, 100, 100];
let yOffsets = [30, 45, 30, 40, 30, 30, 30, 40, 30, 30, 30, 45, 55];
let xOffsets = [50, 10, 50, 90, 50, 50, 50, 85, 50, 50, 50, 50, 50];
let urls = [
  "https://things-to-do.com/paris/wp-content/uploads/2017/09/Cognac-Jay.jpg",
  "https://memorialiemuzeji.lv/wp-content/uploads/2020/12/Krisjana-Barons-muzejs1-1024x682.jpg",
  "https://memorialiemuzeji.lv/wp-content/uploads/2020/12/Krisjana-Barons-muzejs1-1024x682.jpg",
  "https://memorialiemuzeji.lv/wp-content/uploads/2020/12/Krisjana-Barona-muzejs3-1024x682.jpg",
  "https://memorialiemuzeji.lv/wp-content/uploads/2020/12/Krisjana-Barona-muzejs3-1024x682.jpg",
  "https://things-to-do.com/paris/wp-content/uploads/2017/09/Cognac-Jay.jpg",
  "https://montecristomagazine.com/wp-content/uploads/2019/01/dining-room-002.jpg",
  "https://memorialiemuzeji.lv/wp-content/uploads/2020/12/0022-4.jpg",
  "https://memorialiemuzeji.lv/wp-content/uploads/2020/12/0022-4.jpg",
  "https://things-to-do.com/paris/wp-content/uploads/2017/09/Cognac-Jay.jpg",
  "https://old.tourism.sigulda.lv/userfiles/gallery/1591010265444.jpg",
  "https://old.tourism.sigulda.lv/userfiles/gallery/1591010265444.jpg",
  "https://old.tourism.sigulda.lv/userfiles/gallery/1591010265444.jpg"
]

// Fetch slides from the JSON file
fetch('slides.json')
  .then(response => response.json())
  .then(data => {
    slides = data;
    renderSlides();
    updateProgressBar();
    updateBackgroundPosition(); // Set initial background position
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

function updateBackgroundPosition() {
    const body = document.body;
    const isMobile = window.innerWidth <= 768;
  
    let yOffset = `${yOffsets[currentSlideIndex]}%`;
    let xOffset = `${xOffsets[currentSlideIndex]}%`;
    body.style.backgroundSize = `${sizesInPercent[currentSlideIndex]}%`;

  
    if (isMobile) {
      body.style.backgroundPosition = `${xOffset} ${yOffset}`;
    } else {
      //const xOffset = 'center';
      body.style.backgroundPosition = `${xOffset} ${yOffset}`;
    }
    body.style.backgroundImage = `url(${urls[currentSlideIndex]})`;
}

// Show a specific slide
function showSlide(index) {
  const slideElements = document.querySelectorAll('.slide');
  slideElements.forEach((slide, i) => {
    slide.classList.toggle('active', i === index);
  });
  currentSlideIndex = index;
  updateProgressBar();
  updateBackgroundPosition(); // Update background position on slide change
}

// Navigate to the previous slide
function prevSlide() {
  if (currentSlideIndex !== 0) {
  const newIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
  showSlide(newIndex);}
}

// Navigate to the next slide
function nextSlide() {
  const newIndex = (currentSlideIndex + 1) % slides.length;
  if (newIndex !== 0) { showSlide(newIndex);}
 
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') nextSlide();
  if (e.key === 'ArrowLeft') prevSlide();
});
