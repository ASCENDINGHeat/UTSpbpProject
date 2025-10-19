const products = {
    "gt3-pack": {
        name: "GT3 Pack",
        price: "$19,99",
        description: "Experience the thrill of high-performance racing with our GT3 Pack, featuring meticulously crafted cars that deliver unparalleled speed and precision on the track. This pack includes: \n\n- Porsche 911 GT3 R\n- Audi R8 LMS GT3\n- BMW M6 GT3\n- Mercedes-AMG GT3\n- Ferrari 296 GT3\n- Lamborghini Huracán GT3 EVO II\n- And More!",
        // provide an images array for the modal carousel
        images: [
            "./assets/img/productImg/GT3pack/packcover.jpg",
            "./assets/img/productImg/GT3pack/carouselimg (1).jpg",
            "./assets/img/productImg/GT3pack/carouselimg (2).jpg",
            "./assets/img/productImg/GT3pack/carouselimg (3).jpg",
            "./assets/img/productImg/GT3pack/carouselimg (4).jpg",
            "./assets/img/productImg/GT3pack/carouselimg (5).jpg"
        ],
        tags: ["Cars", "GT3", "Racing"],
        specs: {
            "Top Speed": "Various",
            "Engine": "Various",
            "Power": "500-600 HP"
        }
    },
    
};

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

        // carousel elements inside modal
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
            // reset transform
            modalSlidesContainer.style.transform = `translateX(${ -modalCurrentIndex * 100 }%)`;
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
            modalSlidesContainer.style.transform = `translateX(${ -modalCurrentIndex * 100 }%)`;
        };

        const openModal = (product) => {
            // Populate modal content
            document.getElementById('modal-product-name').textContent = product.name;
            document.getElementById('modal-product-price').textContent = product.price;
            document.getElementById('modal-product-description').textContent = product.description;

            const specsList = document.getElementById('modal-product-specs');
            specsList.innerHTML = '';
            for (const spec in product.specs) {
                const listItem = document.createElement('li');
                listItem.textContent = `${spec}: ${product.specs[spec]}`;
                specsList.appendChild(listItem);
            }

            // build modal slides from product.images (fallback to single image)
            const images = product.images && product.images.length ? product.images : [product.image || ''];
            modalCurrentIndex = 0;
            buildModalSlides(images);

            // show modal with transition
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
                // cleanup slides
                if (modalSlidesContainer) modalSlidesContainer.innerHTML = '';
            }, 300);
        };

        // wire up read more buttons
        readMoreButtons.forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.dataset.productId;
                const product = products[productId];
                if (product) {
                    openModal(product);
                }
            });
        });

        if (closeModalButton) {
            closeModalButton.addEventListener('click', closeModal);
        }

        // modal prev/next handlers
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

        // click outside to close
        window.addEventListener('click', (event) => {
            if (event.target === productModal) {
                closeModal();
            }
        });

        // optional: keyboard navigation for modal carousel
        window.addEventListener('keydown', (e) => {
            if (productModal && !productModal.classList.contains('hidden')) {
                const total = modalSlidesContainer ? modalSlidesContainer.children.length : 0;
                if (e.key === 'ArrowLeft') goToModalSlide(modalCurrentIndex - 1, total);
                if (e.key === 'ArrowRight') goToModalSlide(modalCurrentIndex + 1, total);
                if (e.key === 'Escape') closeModal();
            }
        });
    }
});