// Get the mobile menu button and the mobile menu itself
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

// Add a click event listener to the button
mobileMenuButton.addEventListener('click', () => {
  // Toggle the 'hidden' class on the mobile menu
  mobileMenu.classList.toggle('hidden');
});

// Get all necessary elements from the DOM
const slider = document.getElementById('slider');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const slides = document.querySelectorAll('#slider > div');

let currentIndex = 0; // Keeps track of the current slide index
const totalSlides = slides.length;

// Function to move the slider to a specific slide
function goToSlide(index) {
  // Check for boundary conditions
  if (index < 0) {
    currentIndex = totalSlides - 1;
  } else if (index >= totalSlides) {
    currentIndex = 0;
  } else {
    currentIndex = index;
  }
  
  // Calculate the transform value
  const offset = -currentIndex * 100;
  // Apply the transform to the slider
  slider.style.transform = `translateX(${offset}%)`;
}

// Event listener for the "Next" button
nextButton.addEventListener('click', () => {
  goToSlide(currentIndex + 1);
});

// Event listener for the "Previous" button
prevButton.addEventListener('click', () => {
  goToSlide(currentIndex - 1);
});

// Initialize the carousel to the first slide
goToSlide(0);