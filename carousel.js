const track = document.querySelector('.carousel-track');
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.carousel-dots');

let index = 0;
let startX = 0;
let isDragging = false;

/* create dots */
slides.forEach((_, i) => {
  const dot = document.createElement('button');
  if (i === 0) dot.classList.add('active');
  dotsContainer.appendChild(dot);

  dot.addEventListener('click', () => {
    index = i;
    updateCarousel();
  });
});

const dots = document.querySelectorAll('.carousel-dots button');

function updateCarousel() {
  track.style.transform = `translateX(-${index * 100}%)`;
  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');
}

/* touch swipe */
track.addEventListener('touchstart', e => {
  startX = e.touches[0].clientX;
});

track.addEventListener('touchend', e => {
  const endX = e.changedTouches[0].clientX;
  handleSwipe(endX);
});

/* mouse drag */
track.addEventListener('mousedown', e => {
  startX = e.clientX;
  isDragging = true;
});

track.addEventListener('mouseup', e => {
  if (!isDragging) return;
  isDragging = false;
  handleSwipe(e.clientX);
});

function handleSwipe(endX) {
  const diff = startX - endX;
  if (diff > 50 && index < slides.length - 1) index++;
  if (diff < -50 && index > 0) index--;
  updateCarousel();
}
