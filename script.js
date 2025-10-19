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

// Project Modal Data
const projectData = {
    'chatbot': {
        title: 'AI Healthcare Chatbot (NLP)',
        description: 'Healthcare chatbots often lack the ability to understand complex, nuanced medical language. Patients need quick, accurate information, but building a compliant, reliable system is challenging.',
        technologies: ['TensorFlow', 'PyTorch', 'Apache Spark', 'NLP', 'HIPAA Compliance'],
        details: {
            'Problem': 'Healthcare chatbots often lack the ability to understand complex, nuanced medical language. Patients need quick, accurate information, but building a compliant, reliable system is challenging.',
            'My Contribution': 'Developed a HIPAA-compliant healthcare chatbot using transformer-based NLP models trained with TensorFlow and PyTorch. The model performs intent classification (recognizing user intent like "What are my symptoms?") and entity extraction (pulling key information like "headache" or "fever"). Integrated Apache Spark for scalable data processing to handle large datasets efficiently.',
            'Impact': 'Enabled faster symptom triage and boosted patient engagement by 30%. The chatbot provides accurate medical information while maintaining strict HIPAA compliance standards.'
        }
    },
    'oceanmind': {
        title: 'OceanMind App',
        description: 'Understanding and predicting a person\'s mood through physiological signals like brainwaves is a complex challenge requiring advanced AI and signal processing.',
        technologies: ['TensorFlow', 'RNN', 'EEG Processing', 'SAS', 'Lovable AI'],
        details: {
            'Problem': 'Understanding and predicting mood through subtle physiological signals like brainwaves requires sophisticated analysis and real-time processing capabilities.',
            'My Contribution': 'Founded and built OceanMind using Lovable AI - a healthcare app that processes EEG signals to predict user mood. Implemented a Recurrent Neural Network (RNN) with TensorFlow and SAS, perfect for time-series data like brainwaves. Used adaptive channel selection to focus on the most relevant data and cross-validation to ensure accuracy. Integrated Apache Spark for scalable data processing.',
            'Impact': 'Created a novel approach to mental wellness by providing personalized mood regulation through binaural beats. The app demonstrates innovative use of neurological data for mental health applications.'
        }
    },
    'lane-detection': {
        title: 'Lane Detection Bot',
        description: 'Autonomous systems need to navigate real environments with high accuracy using limited computational resources at the edge.',
        technologies: ['OpenCV', 'MATLAB', 'Raspberry Pi', 'YOLO', 'Edge Computing'],
        details: {
            'Problem': 'Autonomous systems need real-time navigation with limited resources. Traditional solutions require expensive hardware and high computational power.',
            'My Contribution': 'Engineered a real-time lane detection system on Raspberry Pi using OpenCV and MATLAB. Achieved 85% accuracy using Canny edge detection and Hough Transform. Optimized for low-latency autonomous navigation with SQL for data logging. Implemented YOLO for object detection on edge devices with model pruning for efficient inference.',
            'Impact': 'Demonstrated that sophisticated computer vision can run on affordable edge devices, making autonomous navigation accessible for educational and small-scale applications.'
        }
    },
    'robotics': {
        title: 'Maze Solver & Line Follower Bot',
        description: 'Building autonomous robots that can navigate complex environments and make real-time decisions using minimal sensors.',
        technologies: ['Arduino', 'MATLAB', 'PID Control', 'IR Sensors', 'R'],
        details: {
            'Problem': 'Autonomous robots need to solve complex navigation problems in real-time with limited sensor input and processing power.',
            'My Contribution': 'Built Arduino-based robots with IR sensors implementing pathfinding algorithms for maze solving. Used MATLAB for PID control tuning to ensure smooth, precise movements. Applied R for sensor data analysis to optimize decision-making algorithms in real-time.',
            'Impact': 'Created cost-effective autonomous robots capable of solving complex navigation challenges, demonstrating practical applications of control theory and pathfinding algorithms.'
        }
    },
    'kiosk': {
        title: 'Interactive Kiosk',
        description: 'Creating an engaging, interactive experience combining voice AI and holographic display technology.',
        technologies: ['Raspberry Pi', 'Voice AI', '3D Holographic Display', 'Python'],
        details: {
            'Problem': 'Traditional kiosks lack engagement and interactivity. Modern users expect natural, voice-based interactions and visually compelling displays.',
            'My Contribution': 'Designed and built a Raspberry Pi-powered interactive kiosk featuring a voice assistant for natural language interaction and a 3D holographic display for immersive visual experiences. Integrated speech recognition and synthesis for seamless user communication.',
            'Impact': 'Created an innovative user interface that combines cutting-edge display technology with natural voice interaction, significantly enhancing user engagement and experience.'
        }
    },
    'ai-video': {
        title: 'AI Video Generation Projects',
        description: 'Leveraging the latest in generative AI to synthesize realistic videos and creative content from text prompts and other inputs.',
        technologies: ['GenAI', 'Diffusion Models', 'Video Synthesis', 'LLMs', 'NVIDIA'],
        details: {
            'Problem': 'Video content creation is time-consuming and requires significant resources. Generative AI can revolutionize content creation but requires expertise in cutting-edge models.',
            'My Contribution': 'Working at NVIDIA as Associate Prompt Engineer, developing and optimizing prompts for AI video generation models. Leveraging diffusion models and generative AI techniques to create high-quality video content from text descriptions. Exploring applications in creative content generation and automated video synthesis.',
            'Impact': 'Pushing the boundaries of what\'s possible with AI-generated video content, making professional video creation more accessible and efficient.'
        }
    }
};

// Modal functionality
const modal = document.getElementById('projectModal');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.getElementById('modalDescription');
const modalTechnologies = document.getElementById('modalTechnologies');
const modalDetails = document.getElementById('modalDetails');
const modalClose = document.querySelector('.modal-close');

// Open modal when project card is clicked
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('click', (e) => {
        const projectId = card.getAttribute('data-project');
        const project = projectData[projectId];

        if (project) {
            // Set modal content
            modalTitle.textContent = project.title;
            modalDescription.innerHTML = `<p>${project.description}</p>`;

            // Set technologies
            modalTechnologies.innerHTML = project.technologies
                .map(tech => `<span>${tech}</span>`)
                .join('');

            // Set detailed sections
            let detailsHTML = '';
            for (const [key, value] of Object.entries(project.details)) {
                detailsHTML += `
                    <h3>${key}</h3>
                    <p>${value}</p>
                `;
            }
            modalDetails.innerHTML = detailsHTML;

            // Show modal
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

// Close modal
modalClose.addEventListener('click', () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Close modal when clicking outside
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});
