/**
 * Main JavaScript for Tank Oiling Storage Company Website
 * Author: Professional Web Developer
 * Version: 1.0
 */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initNavigation();
    initBackToTop();
    initDropdowns();
});

/**
 * Initialize the navigation functionality (mobile menu)
 */
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navList = document.querySelector('.nav-list');
    
    if (hamburger && navList) {
        hamburger.addEventListener('click', function() {
            this.classList.toggle('active');
            navList.classList.toggle('active');
            document.body.classList.toggle('nav-open');
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!event.target.closest('.nav') && !event.target.closest('.hamburger') && navList.classList.contains('active')) {
                navList.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.classList.remove('nav-open');
            }
        });
    }
}

/**
 * Initialize the Back to Top button functionality
 */
function initBackToTop() {
    const backToTopButton = document.querySelector('.back-to-top');
    
    if (backToTopButton) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
        
        // Scroll to top when clicked
        backToTopButton.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Initialize dropdown menus for mobile
 */
function initDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    // On mobile, make dropdowns toggleable
    if (window.innerWidth < 992) {
        dropdowns.forEach(function(dropdown) {
            const link = dropdown.querySelector('.nav-link');
            
            link.addEventListener('click', function(e) {
                e.preventDefault();
                dropdown.classList.toggle('active');
                
                // Close other dropdowns
                dropdowns.forEach(function(otherDropdown) {
                    if (otherDropdown !== dropdown && otherDropdown.classList.contains('active')) {
                        otherDropdown.classList.remove('active');
                    }
                });
            });
        });
    }
}

/**
 * Custom function to filter projects
 * @param {string} category - The category to filter by
 */
function filterProjects(category) {
    const projects = document.querySelectorAll('.project-card');
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    // Update active button
    filterBtns.forEach(btn => {
        if (btn.dataset.filter === category) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    // Filter projects
    if (category === 'all') {
        projects.forEach(project => {
            project.style.display = 'block';
        });
    } else {
        projects.forEach(project => {
            if (project.dataset.category === category) {
                project.style.display = 'block';
            } else {
                project.style.display = 'none';
            }
        });
    }
}

/**
 * Animate counter elements for statistics
 * @param {HTMLElement} el - The element to animate
 * @param {number} value - The target value
 */
function animateCounter(el, value) {
    let startValue = 0;
    let duration = 2000;
    let startTime = null;
    
    function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const currentValue = Math.floor(progress * value);
        
        el.textContent = currentValue;
        
        if (progress < 1) {
            window.requestAnimationFrame(animate);
        } else {
            el.textContent = value;
        }
    }
    
    window.requestAnimationFrame(animate);
}

/**
 * Initialize counters when they come into view
 */
function initStatCounters() {
    const statValues = document.querySelectorAll('.stat-value');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const value = parseInt(el.dataset.value);
                animateCounter(el, value);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    
    statValues.forEach(statValue => {
        observer.observe(statValue);
    });
}

/**
 * Initialize the project gallery with lightbox functionality
 */
function initGallery() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            const imgTitle = this.querySelector('img').alt;
            
            // Create lightbox elements
            const lightbox = document.createElement('div');
            lightbox.classList.add('lightbox');
            
            const lightboxContent = document.createElement('div');
            lightboxContent.classList.add('lightbox-content');
            
            const img = document.createElement('img');
            img.src = imgSrc;
            img.alt = imgTitle;
            
            const caption = document.createElement('p');
            caption.textContent = imgTitle;
            
            const closeBtn = document.createElement('span');
            closeBtn.classList.add('lightbox-close');
            closeBtn.innerHTML = '&times;';
            
            // Append elements
            lightboxContent.appendChild(img);
            lightboxContent.appendChild(caption);
            lightboxContent.appendChild(closeBtn);
            lightbox.appendChild(lightboxContent);
            document.body.appendChild(lightbox);
            
            // Prevent scroll
            document.body.style.overflow = 'hidden';
            
            // Close lightbox when clicking close button or outside the image
            closeBtn.addEventListener('click', closeLightbox);
            lightbox.addEventListener('click', function(e) {
                if (e.target === lightbox) {
                    closeLightbox();
                }
            });
            
            // Close with Escape key
            document.addEventListener('keydown', function(e) {
                if (e.key === 'Escape') {
                    closeLightbox();
                }
            });
            
            function closeLightbox() {
                document.body.removeChild(lightbox);
                document.body.style.overflow = '';
            }
        });
    });
}

// Initialize statistics counters when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on a page with stats
    if (document.querySelector('.stats-section')) {
        initStatCounters();
    }
    
    // Check if we're on a page with gallery
    if (document.querySelector('.gallery')) {
        initGallery();
    }
});
