// ========== Mobile Menu Toggle ==========
const hamburger = document.querySelector('.hamburger');
const navLinksContainer = document.querySelector('.nav-links');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinksContainer.classList.toggle('active');
});

// Close menu when clicking a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinksContainer.classList.remove('active');
    });
});

// ========== Navbar Scroll Effect & Active Link Highlighting ==========
const header = document.getElementById('navbar');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';

    // Navbar background on scroll
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Determine current section for active link highlight
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// ========== Form Submission Intercept ==========
const contactForm = document.getElementById('contactForm');
if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = contactForm.querySelector('.submit-btn');
        const originalText = btn.innerText;
        
        btn.innerText = 'Sending...';
        btn.style.opacity = '0.8';
        
        const formData = new FormData(contactForm);
        fetch(contactForm.action, {
            method: 'POST',
            body: formData,
            mode: 'no-cors' // Allows submitting across origins without CORS errors for Google Forms
        }).then(() => {
            btn.innerText = 'Message Sent Successfully!';
            btn.style.backgroundColor = '#2ecc71';
            btn.style.color = '#fff';
            btn.style.borderColor = '#2ecc71';
            
            contactForm.reset();
            
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.backgroundColor = '';
                btn.style.color = '';
                btn.style.borderColor = '';
                btn.style.opacity = '1';
            }, 3000);
        }).catch((err) => {
            btn.innerText = 'Error! Try again message.';
            setTimeout(() => {
                btn.innerText = originalText;
                btn.style.opacity = '1';
            }, 3000);
        });
    });
}
