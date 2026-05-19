/* ============================================
   HOUSE OF THE RISING SUN - SCRIPTS
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {

    // ============================================
    // MOBILE NAVIGATION
    // ============================================
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            const spans = mobileToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Close menu on link click
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const spans = mobileToggle.querySelectorAll('span');
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            });
        });
    }

    // ============================================
    // NAVBAR SCROLL EFFECT
    // ============================================
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ============================================
    // SMOOTH SCROLLING FOR ANCHOR LINKS
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // ACTIVE NAV LINK ON SCROLL
    // ============================================
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');

    window.addEventListener('scroll', function() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    // ============================================
    // SCROLL ANIMATIONS (FADE IN)
    // ============================================
    const fadeElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    fadeElements.forEach(el => fadeObserver.observe(el));

    // ============================================
    // TESTIMONIALS CAROUSEL
    // ============================================
    const testimonials = [
        {
            text: "We hosted our daughter's wedding reception in the hall and it was magical. The Venice mural backdrop made for stunning photos, and the team handled everything professionally. Highly recommend for events!",
            author: "Patricia Naidoo",
            location: "Durban, South Africa",
            rating: 5
        },
        {
            text: "Clean and well kept. The gentleman at the reception was very professional and very welcoming. Beautiful rooms, cleanliness and comfortable beds. Will definitely be back!",
            author: "Duke",
            location: "South Africa",
            rating: 5
        },
        {
            text: "Absolutely stunning location with breathtaking sea views. The family apartment was spacious and well-equipped. Perfect for our family holiday. The kids loved the pool!",
            author: "Sarah Mitchell",
            location: "Johannesburg, South Africa",
            rating: 5
        }
    ];

    let currentTestimonial = 0;
    const testimonialText = document.querySelector('.testimonial-text');
    const testimonialAuthor = document.querySelector('.testimonial-author-info h5');
    const testimonialLocation = document.querySelector('.testimonial-author-info span');
    const testimonialStars = document.querySelector('.testimonial-stars');
    const dots = document.querySelectorAll('.testimonial-dots .dot');

    function updateTestimonial(index) {
        const t = testimonials[index];
        if (testimonialText) testimonialText.textContent = '"' + t.text + '"';
        if (testimonialAuthor) testimonialAuthor.textContent = t.author;
        if (testimonialLocation) testimonialLocation.textContent = t.location;
        if (testimonialStars) {
            testimonialStars.innerHTML = '★'.repeat(t.rating) + '☆'.repeat(5 - t.rating);
        }
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
    }

    if (dots.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                currentTestimonial = index;
                updateTestimonial(index);
            });
        });

        // Auto-rotate testimonials
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            updateTestimonial(currentTestimonial);
        }, 6000);
    }

    // ============================================
    // IMAGE CAROUSEL (STORY SECTION)
    // ============================================
    const storyImages = document.querySelectorAll('.story-images .img-main img, .story-images .img-overlay img');
    let currentStoryImage = 0;

    if (storyImages.length > 2) {
        setInterval(() => {
            // Simple image rotation effect if multiple images exist
            storyImages.forEach((img, i) => {
                img.style.opacity = i === currentStoryImage ? '1' : '0.3';
            });
            currentStoryImage = (currentStoryImage + 1) % storyImages.length;
        }, 5000);
    }

    // ============================================
    // BOOKING FORM
    // ============================================
    const bookingForm = document.querySelector('.booking-form');

    if (bookingForm) {
        const checkIn = bookingForm.querySelector('input[name="checkin"]');
        const checkOut = bookingForm.querySelector('input[name="checkout"]');
        const guests = bookingForm.querySelector('select[name="guests"]');
        const roomType = bookingForm.querySelector('select[name="roomtype"]');

        // Set min date to today
        const today = new Date().toISOString().split('T')[0];
        if (checkIn) checkIn.min = today;
        if (checkOut) checkOut.min = today;

        // Update checkout min when checkin changes
        if (checkIn && checkOut) {
            checkIn.addEventListener('change', function() {
                checkOut.min = this.value;
                if (checkOut.value && checkOut.value <= this.value) {
                    const nextDay = new Date(this.value);
                    nextDay.setDate(nextDay.getDate() + 1);
                    checkOut.value = nextDay.toISOString().split('T')[0];
                }
            });
        }

        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const formData = {
                checkIn: checkIn ? checkIn.value : '',
                checkOut: checkOut ? checkOut.value : '',
                guests: guests ? guests.value : '',
                roomType: roomType ? roomType.value : ''
            };

            if (!formData.checkIn || !formData.checkOut) {
                alert('Please select both check-in and check-out dates.');
                return;
            }

            // Simulate availability check
            alert('Checking availability...\n\n' +
                  'Check-in: ' + formData.checkIn + '\n' +
                  'Check-out: ' + formData.checkOut + '\n' +
                  'Guests: ' + formData.guests + '\n' +
                  'Room: ' + formData.roomType + '\n\n' +
                  'Our team will contact you shortly to confirm your booking.');
        });
    }

    // ============================================
    // CONTACT FORM
    // ============================================
    const contactForm = document.querySelector('.contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = contactForm.querySelector('input[name="name"]')?.value;
            const email = contactForm.querySelector('input[name="email"]')?.value;
            const phone = contactForm.querySelector('input[name="phone"]')?.value;
            const message = contactForm.querySelector('textarea[name="message"]')?.value;

            if (!name || !email || !message) {
                alert('Please fill in all required fields.');
                return;
            }

            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }

            alert('Thank you for your message, ' + name + '!\n\n' +
                  'We have received your enquiry and will respond within 24 hours.');

            contactForm.reset();
        });
    }

    // ============================================
    // ROOM CARDS HOVER EFFECT
    // ============================================
    const roomCards = document.querySelectorAll('.room-card');

    roomCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // ============================================
    // ATTRACTION CARDS HOVER
    // ============================================
    const attractionCards = document.querySelectorAll('.attraction-card');

    attractionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const img = this.querySelector('img');
            if (img) img.style.transform = 'scale(1.08)';
        });
        card.addEventListener('mouseleave', function() {
            const img = this.querySelector('img');
            if (img) img.style.transform = 'scale(1)';
        });
    });

    // ============================================
    // WHATSAPP FLOAT BUTTON
    // ============================================
    const whatsappBtn = document.querySelector('.whatsapp-float');

    if (whatsappBtn) {
        whatsappBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const phone = '+27399782769'; // Replace with actual number
            const message = encodeURIComponent('Hi! I would like to enquire about accommodation at House of the Rising Sun.');
            window.open('https://wa.me/' + phone + '?text=' + message, '_blank');
        });
    }

    // ============================================
    // LAZY LOADING IMAGES
    // ============================================
    const lazyImages = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));

    // ============================================
    // PARALLAX EFFECT FOR HERO
    // ============================================
    const heroBg = document.querySelector('.hero-bg');

    if (heroBg) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            heroBg.style.transform = 'translateY(' + scrolled * 0.5 + 'px)';
        });
    }

    // ============================================
    // COUNTER ANIMATION FOR STATS
    // ============================================
    const statNumbers = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.textContent);
                let current = 0;
                const increment = target / 50;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        el.textContent = target;
                        clearInterval(timer);
                    } else {
                        el.textContent = Math.floor(current);
                    }
                }, 30);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => counterObserver.observe(stat));

    // ============================================
    // BACK TO TOP BUTTON (optional)
    // ============================================
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '↑';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 90px;
        right: 24px;
        width: 44px;
        height: 44px;
        border-radius: 50%;
        background: var(--primary);
        color: white;
        border: none;
        cursor: pointer;
        font-size: 18px;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 998;
        display: flex;
        align-items: center;
        justify-content: center;
    `;
    document.body.appendChild(backToTop);

    window.addEventListener('scroll', function() {
        if (window.scrollY > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.pointerEvents = 'all';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.pointerEvents = 'none';
        }
    });

    backToTop.addEventListener('click', function() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    console.log('✅ House of the Rising Sun - Scripts loaded successfully');
});
