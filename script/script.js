// Get the element you want to modify
const bgOpacity = document.getElementById('backgroundImage');

// Add an event listener for the 'scroll' event on the window
window.addEventListener('scroll', () => {
    // Check the vertical scroll position
    if (window.scrollY > 50) {
        // If scrolled more than 50px, add new classes and remove old ones
        bgOpacity.classList.add('opacity-100');
    } else {
        // If scrolled back to the top, revert the classes
        bgOpacity.classList.add('opacity-0');
    }
});