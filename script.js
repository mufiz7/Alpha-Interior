/* ==========================================================================
   ALPHA INTERIORS - INTERACTIVE JS OPERATIONS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. HEADER SCROLL ACTION ---
    const header = document.querySelector('.main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 2. MOBILE NAVIGATION DRAWER ---
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const menuOverlay = document.getElementById('menuOverlay');
    const navLinks = document.querySelectorAll('.nav-link');

    function toggleMobileMenu() {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        menuOverlay.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMobileMenu);
    }
    if (menuOverlay) {
        menuOverlay.addEventListener('click', toggleMobileMenu);
    }

    // Close menu when clicking links
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // --- 3. SCROLL HIGHLIGHTING ACTIVE NAV LINKS ---
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.scrollY + 160; // offset for sticky header

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollPosition >= sectionTop && scrollPosition < (sectionTop + sectionHeight)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // --- 4. PORTFOLIO FILTER GALLERY ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');

            const filterValue = button.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    // --- 5. PORTFOLIO LIGHTBOX MODAL ---
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxCategory = document.getElementById('lightboxCategory');
    const lightboxTitle = document.getElementById('lightboxTitle');

    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('.portfolio-img');
            const categoryText = item.querySelector('.portfolio-category').textContent;
            const titleText = item.querySelector('.portfolio-item-title').textContent;

            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxCategory.textContent = categoryText;
            lightboxTitle.textContent = titleText;

            lightboxModal.classList.add('active');
            document.body.classList.add('no-scroll');
        });
    });

    function closeLightbox() {
        lightboxModal.classList.remove('active');
        document.body.classList.remove('no-scroll');
        // Clear src after fade transition
        setTimeout(() => {
            lightboxImg.src = '';
        }, 400);
    }

    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    if (lightboxModal) {
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) {
                closeLightbox();
            }
        });
    }

    // --- 6. TESTIMONIALS SLIDER ---
    const slider = document.getElementById('testimonialsSlider');
    const dots = document.querySelectorAll('.slider-dot');
    let currentSlide = 0;
    const totalSlides = dots.length;

    function goToSlide(slideIndex) {
        if (slider) {
            slider.style.transform = `translateX(-${slideIndex * 100}%)`;
            dots.forEach(dot => dot.classList.remove('active'));
            dots[slideIndex].classList.add('active');
            currentSlide = slideIndex;
        }
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
    });

    // Auto rotate slides every 5 seconds
    setInterval(() => {
        let nextSlide = (currentSlide + 1) % totalSlides;
        goToSlide(nextSlide);
    }, 5000);

    // --- 7. TIMED INQUIRY POP-UP MODAL ---
    const popup = document.getElementById('inquiryPopup');
    const popupClose = document.getElementById('popupClose');
    const popupForm = document.getElementById('popupForm');

    // Trigger after 4 seconds
    setTimeout(() => {
        const isDismissed = sessionStorage.getItem('inquiryPopupDismissed');
        if (!isDismissed && popup) {
            popup.classList.add('active');
        }
    }, 4000);

    function closePopup() {
        if (popup) {
            popup.classList.remove('active');
            sessionStorage.setItem('inquiryPopupDismissed', 'true');
        }
    }

    if (popupClose) {
        popupClose.addEventListener('click', closePopup);
    }

    // Close on Escape key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (lightboxModal && lightboxModal.classList.contains('active')) {
                closeLightbox();
            }
            if (popup && popup.classList.contains('active')) {
                closePopup();
            }
        }
    });

    // Handle Forms Submission (Popup Form and Contact Section Form)
    const contactForm = document.getElementById('contactForm');

    function handleFormSubmit(e, formType) {
        e.preventDefault();
        
        // Retrieve values
        const name = e.target.querySelector('input[type="text"]').value;
        const phone = e.target.querySelector('input[type="tel"]').value;
        
        // Show elegant custom message instead of generic alert
        showToast(`Thank you, ${name}! Your inquiry has been received. Ar. Anuja Kautkar will contact you shortly at ${phone}.`);
        
        e.target.reset();

        if (formType === 'popup') {
            closePopup();
        }
    }

    if (popupForm) {
        popupForm.addEventListener('submit', (e) => handleFormSubmit(e, 'popup'));
    }

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => handleFormSubmit(e, 'contact'));
    }

    // Custom Toast Notification System
    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'custom-toast';
        toast.innerHTML = `
            <div class="toast-content">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#C5A880" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="toast-success-icon"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                <span>${message}</span>
            </div>
        `;
        document.body.appendChild(toast);

        // Inject toast styling if not already present in stylesheet (for robustness)
        if (!document.getElementById('toastStyles')) {
            const styles = document.createElement('style');
            styles.id = 'toastStyles';
            styles.textContent = `
                .custom-toast {
                    position: fixed;
                    top: 24px;
                    left: 50%;
                    transform: translateX(-50%) translateY(-100px);
                    background-color: rgba(18, 21, 25, 0.95);
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    border: 1px solid var(--primary);
                    color: #FFFFFF;
                    padding: 16px 28px;
                    border-radius: 4px;
                    z-index: 9999;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                    opacity: 0;
                    transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), opacity 0.3s ease-out;
                    max-width: 90%;
                    width: 480px;
                }
                .custom-toast.show {
                    transform: translateX(-50%) translateY(0);
                    opacity: 1;
                }
                .toast-content {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    font-size: 0.95rem;
                }
                .toast-success-icon {
                    flex-shrink: 0;
                }
            `;
            document.head.appendChild(styles);
        }

        // Animate in
        setTimeout(() => {
            toast.classList.add('show');
        }, 50);

        // Remove after 6 seconds
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => {
                toast.remove();
            }, 400);
        }, 6000);
    }

    // --- 8. SCROLL TO TOP UTILITY ---
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 400) {
            scrollTopBtn.classList.add('active');
        } else {
            scrollTopBtn.classList.remove('active');
        }
    });

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
});
