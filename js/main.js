/**
 * JS Main for Data Engineer Portfolio
 * Incorporates navbar scroll state, intersection observers for scroll animations,
 * infinite carousel duplication, and FAQ accordion logic.
 */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Navigation background effect on scroll
    const nav = document.querySelector('.nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.setAttribute('data-scrolled', 'true');
        } else {
            nav.setAttribute('data-scrolled', 'false');
        }
    });

    // 2. Intersection Observer for scroll animations (appearance)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once revealed
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe specific elements
    const revealElements = document.querySelectorAll('.reveal-left, .reveal-right, .step-reveal');
    revealElements.forEach((el, index) => {
        // Add staggered delay for steps
        if (el.classList.contains('step-reveal')) {
            el.style.transitionDelay = `${index * 0.15}s`;
        }
        scrollObserver.observe(el);
    });

    // 3. Carousel infinite duplicate
    // Clone cards to achieve seamless infinite animation
    const carouselTrack = document.querySelector('.carousel-track');
    if (carouselTrack) {
        const cards = Array.from(carouselTrack.children);
        // Duplicate the initial children to create the infinite loop effect
        cards.forEach(card => {
            const clone = card.cloneNode(true);
            carouselTrack.appendChild(clone);
        });
    }

    // 4. Accordion Logic for FAQs
    const faqButtons = document.querySelectorAll('.faq-q');

    faqButtons.forEach(button => {
        button.addEventListener('click', () => {
            const isExpanded = button.getAttribute('aria-expanded') === 'true';

            // Close all others (optional: strict single open)
            /*
            faqButtons.forEach(btn => {
                btn.setAttribute('aria-expanded', 'false');
                btn.nextElementSibling.style.maxHeight = null;
            });
            */

            // Toggle current
            if (!isExpanded) {
                button.setAttribute('aria-expanded', 'true');
                const answer = button.nextElementSibling;
                answer.style.maxHeight = answer.scrollHeight + "px";
            } else {
                button.setAttribute('aria-expanded', 'false');
                button.nextElementSibling.style.maxHeight = null;
            }
        });
    });
});
