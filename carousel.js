const track = document.querySelector(".carousel-track");
const slides = document.querySelectorAll(".slide");
const dotsContainer = document.querySelector(".carousel-dots");
const carousel = document.querySelector(".carousel");

let index = 0;
let startX = 0;
let isDragging = false;

/* create the dots */
slides.forEach((slide, i) => {
  const dot = document.createElement("button");
  if (i === 0) dot.classList.add("active");
  dotsContainer.appendChild(dot);

  dot.addEventListener("click", () => {
    index = i;
    updateCarousel();
  });
});

const dots = document.querySelectorAll(".carousel-dots button");

/* get slide width, gap + centering offset */
function getSlideMetrics() {
  const slide = slides[0];
  const slideWidth = slide.getBoundingClientRect().width;
  const gap = parseFloat(getComputedStyle(track).gap) || 0;
  const carouselWidth = carousel.getBoundingClientRect().width;

  /* center active slide in carousel */
  const centerOffset = (carouselWidth - slideWidth) / 2;

  return { slideWidth, gap, centerOffset };
}

/* update */
function updateCarousel() {
  const { slideWidth, gap, centerOffset } = getSlideMetrics();

  const offset = index * (slideWidth + gap) - centerOffset;
  track.style.transform = `translateX(-${offset}px)`;

  dots.forEach(dot => dot.classList.remove("active"));
  dots[index].classList.add("active");

  // sync active slide state
  slides.forEach(slide => slide.classList.remove("active"));
  slides[index].classList.add("active");

  // sync background colour
  const color = slides[index].dataset.color;
  carousel.style.background = `linear-gradient(
    180deg,
    ${color},
    rgba(255,255,255,0.05)
  )`;
}

/* touch */
track.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

track.addEventListener("touchend", e => {
  handleSwipe(e.changedTouches[0].clientX);
});

/* mouse */
track.addEventListener("mousedown", e => {
  startX = e.clientX;
  isDragging = true;
});

track.addEventListener("mouseup", e => {
  if (!isDragging) return;
  isDragging = false;
  handleSwipe(e.clientX);
});

/* swipe logic */
function handleSwipe(endX) {
  const diff = startX - endX;

  if (diff > 50 && index < slides.length - 1) index++;
  if (diff < -50 && index > 0) index--;

  updateCarousel();
}

/* keep alignment on resize */
window.addEventListener("resize", updateCarousel);

/* init */
updateCarousel();

