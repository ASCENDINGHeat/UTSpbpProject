const products = {
    "gt3-pack": {
        name: "GT3 Pack",
        price: "$19,99",
        description: "Experience the thrill of high-performance racing with our GT3 Pack, featuring meticulously crafted cars that deliver unparalleled speed and precision on the track.",
        image: "./assets/img/productImg/GT3pack/packcover.jpg",
        tags: ["Cars", "GT3", "Racing"],
        specs: {
            "Top Speed": "300 km/h",
            "Engine": "V8 Turbo",
            "Power": "600 HP"
        }
    },
    // Add more products here in the future
    // "another-product-id": { ... }
};

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

document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on the product page
    if (window.location.pathname.endsWith('productinfo.html')) {
        const urlParams = new URLSearchParams(window.location.search);
        const productId = urlParams.get('id');
        const product = products[productId];

        if (product) {
            // Fill in the product details
            document.getElementById('product-name').textContent = product.name;
            document.getElementById('product-price').textContent = product.price;
            document.getElementById('product-description').textContent = product.description;
            document.getElementById('product-image').src = product.image;

            // Populate the specifications list
            const specsList = document.getElementById('product-specs');
            for (const spec in product.specs) {
                const listItem = document.createElement('li');
                listItem.textContent = `${spec}: ${product.specs[spec]}`;
                specsList.appendChild(listItem);
            }
        } else {
            // Handle case where product is not found
            document.querySelector('.container').innerHTML = '<h1 class="text-center text-4xl">Product not found!</h1>';
        }
    }
});