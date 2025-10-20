import { products } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Carousel
    const slider = document.getElementById('slider');
    const prevButton = document.getElementById('prev-button');
    const nextButton = document.getElementById('next-button');

    if (slider && prevButton && nextButton) {
        const slides = document.querySelectorAll('#slider > div');
        let currentIndex = 0;
        const totalSlides = slides.length;

        function goToSlide(index) {
            if (index < 0) {
                currentIndex = totalSlides - 1;
            } else if (index >= totalSlides) {
                currentIndex = 0;
            } else {
                currentIndex = index;
            }
            const offset = -currentIndex * 100;
            slider.style.transform = `translateX(${offset}%)`;
        }

        nextButton.addEventListener('click', () => {
            goToSlide(currentIndex + 1);
        });

        prevButton.addEventListener('click', () => {
            goToSlide(currentIndex - 1);
        });

        goToSlide(0);
    }

    // Modal
    const productModal = document.getElementById('product-modal');

    if (productModal) {
        const modalContent = document.getElementById('modal-content');
        const closeModalButton = document.getElementById('close-modal-button');
        const readMoreButtons = document.querySelectorAll('.read-more-button');

        const modalSlidesContainer = document.getElementById('modal-slides');
        const modalPrev = document.getElementById('modal-prev');
        const modalNext = document.getElementById('modal-next');
        let modalCurrentIndex = 0;

        const buildModalSlides = (images = []) => {
            if (!modalSlidesContainer) return;
            modalSlidesContainer.innerHTML = '';
            images.forEach((src) => {
                const slide = document.createElement('div');
                slide.className = 'flex-shrink-0 w-full';
                const img = document.createElement('img');
                img.src = src;
                img.alt = 'Product image';
                img.className = 'object-cover w-full rounded-lg shadow-lg';
                slide.appendChild(img);
                modalSlidesContainer.appendChild(slide);
            });
            modalSlidesContainer.style.transform = `translateX(0%)`;
        };

        const goToModalSlide = (index, total) => {
            if (!modalSlidesContainer) return;
            if (index < 0) {
                modalCurrentIndex = total - 1;
            } else if (index >= total) {
                modalCurrentIndex = 0;
            } else {
                modalCurrentIndex = index;
            }
            modalSlidesContainer.style.transform = `translateX(${-modalCurrentIndex * 100}%)`;
        };

        const openModal = (product, productId) => {
            console.log('Opening modal for:', product.name); // Debugging
            document.getElementById('modal-product-name').textContent = product.name;
            document.getElementById('modal-product-price').textContent = product.price;
            document.getElementById('modal-product-description').textContent = product.description;
            document.getElementById('modal-add-to-cart-button').dataset.productId = productId;

            const specsList = document.getElementById('modal-product-specs');
            specsList.innerHTML = '';
            for (const spec in product.specs) {
                const listItem = document.createElement('li');
                listItem.textContent = `${spec}: ${product.specs[spec]}`;
                specsList.appendChild(listItem);
            }

            const images = product.images && product.images.length ? product.images : ['./assets/img/default.jpg'];
            modalCurrentIndex = 0;
            buildModalSlides(images);

            productModal.classList.remove('hidden');
            setTimeout(() => {
                productModal.classList.remove('opacity-0');
                modalContent.classList.remove('scale-95');
            }, 10);
        };

        const closeModal = () => {
            productModal.classList.add('opacity-0');
            modalContent.classList.add('scale-95');
            setTimeout(() => {
                productModal.classList.add('hidden');
                if (modalSlidesContainer) modalSlidesContainer.innerHTML = '';
            }, 300);
        };

        readMoreButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.dataset.productId;
                const product = products[productId];
                if (product) {
                    openModal(product, productId);
                }
            });
        });

        if (closeModalButton) {
            closeModalButton.addEventListener('click', closeModal);
        }

        if (modalPrev) {
            modalPrev.addEventListener('click', () => {
                const total = modalSlidesContainer ? modalSlidesContainer.children.length : 0;
                goToModalSlide(modalCurrentIndex - 1, total);
            });
        }
        if (modalNext) {
            modalNext.addEventListener('click', () => {
                const total = modalSlidesContainer ? modalSlidesContainer.children.length : 0;
                goToModalSlide(modalCurrentIndex + 1, total);
            });
        }

        window.addEventListener('click', (event) => {
            if (event.target === productModal) {
                closeModal();
            }
        });

        window.addEventListener('keydown', (e) => {
            if (productModal && !productModal.classList.contains('hidden')) {
                const total = modalSlidesContainer ? modalSlidesContainer.children.length : 0;
                if (e.key === 'ArrowLeft') goToModalSlide(modalCurrentIndex - 1, total);
                if (e.key === 'ArrowRight') goToModalSlide(modalCurrentIndex + 1, total);
                if (e.key === 'Escape') closeModal();
            }
        });
    }

    const addToCartButtons = document.querySelectorAll('.add-to-cart-button');

    addToCartButtons.forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            const product = products[productId];

            if (product) {
                const cart = JSON.parse(localStorage.getItem('cart')) || [];
                cart.push({
                    id: productId,
                    name: product.name,
                    price: product.price
                });
                localStorage.setItem('cart', JSON.stringify(cart));
                alert(`${product.name} has been added to your cart!`);
            }
        });
    });
});