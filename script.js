/* ============================================
   JGC Construction — JavaScript
   Lightweight, accessible interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // --- Set current year in footer ---
    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // --- Mobile menu toggle ---
    const menuToggle = document.getElementById('menu-toggle');
    const mainNav = document.getElementById('main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            const isOpen = mainNav.classList.toggle('open');
            menuToggle.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isOpen);
            menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        // Close menu when a nav link is clicked
        mainNav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mainNav.classList.remove('open');
                menuToggle.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.setAttribute('aria-label', 'Open menu');
                document.body.style.overflow = '';
            });
        });
    }

    // --- Header scroll shadow ---
    const header = document.getElementById('header');
    if (header) {
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;
            header.classList.toggle('scrolled', currentScroll > 20);
            lastScroll = currentScroll;
        }, { passive: true });
    }

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // --- Fade-in on scroll (Intersection Observer) ---
    const fadeElements = document.querySelectorAll(
        '.service-card, .value-card, .project-card, .testimonial-card, .about-grid, .contact-grid'
    );

    if ('IntersectionObserver' in window) {
        const fadeObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in', 'visible');
                    fadeObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -40px 0px'
        });

        fadeElements.forEach((el, i) => {
            el.classList.add('fade-in');
            el.style.transitionDelay = `${i % 3 * 0.1}s`;
            fadeObserver.observe(el);
        });
    } else {
        // Fallback: just show everything
        fadeElements.forEach(el => el.classList.add('fade-in', 'visible'));
    }

    // --- Contact form handling ---
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            // Basic validation
            if (!data.name || !data.phone) {
                alert('Please fill in your name and phone number so we can reach you.');
                return;
            }

            // Show success message
            const wrapper = contactForm.closest('.contact-form-wrapper');
            wrapper.innerHTML = `
                <div style="text-align: center; padding: 3rem 1.5rem;">
                    <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#4A7C59" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 1.5rem;">
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                        <polyline points="22 4 12 14.01 9 11.01"/>
                    </svg>
                    <h3 style="margin-bottom: 0.75rem; color: #4A7C59;">Thank You!</h3>
                    <p style="font-size: 1.125rem; color: #5C4A3A; max-width: 400px; margin: 0 auto;">
                        We received your message and will get back to you within 24 hours.
                        We look forward to working with you!
                    </p>
                    <p style="margin-top: 1.5rem; color: #8A7A6A;">
                        Need to talk sooner? Call us at <a href="tel:+15551234567" style="color: #8B4513; font-weight: 600;">(555) 123-4567</a>
                    </p>
                </div>
            `;

            // Log for development — replace with actual form submission
            console.log('Form submitted:', data);
        });
    }

    // --- Active nav highlighting ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-list a[href^="#"]');

    if (sections.length && navLinks.length) {
        const highlightNav = () => {
            const scrollY = window.scrollY + 120;
            sections.forEach(section => {
                const top = section.offsetTop;
                const height = section.offsetHeight;
                const id = section.getAttribute('id');

                if (scrollY >= top && scrollY < top + height) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        };

        window.addEventListener('scroll', highlightNav, { passive: true });
    }
});
