// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Carousel functionality
function setupCarousel(prevBtnClass, nextBtnClass, containerSelector) {
    const prevBtn = document.querySelector(prevBtnClass);
    const nextBtn = document.querySelector(nextBtnClass);
    const container = document.querySelector(containerSelector);

    if (!prevBtn || !nextBtn || !container) return;

    const scrollAmount = 370;

    nextBtn.addEventListener('click', () => {
        container.scrollBy({
            left: scrollAmount,
            behavior: 'smooth'
        });
    });

    prevBtn.addEventListener('click', () => {
        container.scrollBy({
            left: -scrollAmount,
            behavior: 'smooth'
        });
    });
}

// Setup all carousels
document.addEventListener('DOMContentLoaded', () => {
    // Projects carousel
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach((carousel, index) => {
        const prevBtn = carousel.querySelector('.prev-btn');
        const nextBtn = carousel.querySelector('.next-btn');
        const container = carousel.querySelector('.carousel-container');

        if (!prevBtn || !nextBtn || !container) return;

        const scrollAmount = 370;

        nextBtn.addEventListener('click', () => {
            container.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        prevBtn.addEventListener('click', () => {
            container.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        // Add mouse drag scrolling
        let isDown = false;
        let startX;
        let scrollLeft;

        container.addEventListener('mousedown', (e) => {
            isDown = true;
            container.style.cursor = 'grabbing';
            startX = e.pageX - container.offsetLeft;
            scrollLeft = container.scrollLeft;
        });

        container.addEventListener('mouseleave', () => {
            isDown = false;
            container.style.cursor = 'grab';
        });

        container.addEventListener('mouseup', () => {
            isDown = false;
            container.style.cursor = 'grab';
        });

        container.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - container.offsetLeft;
            const walk = (x - startX) * 2;
            container.scrollLeft = scrollLeft - walk;
        });
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// CTA Button functionality
document.querySelector('.cta-button').addEventListener('click', () => {
    document.querySelector('#contact').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

// View Projects button
document.querySelector('.btn-primary').addEventListener('click', () => {
    document.querySelector('#projects').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

// More Info button
document.querySelector('.btn-secondary').addEventListener('click', () => {
    document.querySelector('#about').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});

// Add intersection observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('.content-section, .about-section, .contact-section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});
