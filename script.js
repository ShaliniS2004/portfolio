// script.js

document.addEventListener('DOMContentLoaded', () => {

    // Hamburger menu toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            navLinks.classList.toggle('open');
        });
        // Close menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('open');
                navLinks.classList.remove('open');
            });
        });
    }

    // Intersection Observer for scroll animations
    const revealElements = document.querySelectorAll('.reveal');

    const revealCallback = (entries, observer) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a slight delay staggering
                setTimeout(() => {
                    entry.target.classList.add('active');
                }, index * 50);
                // Optional: Unobserve after revealing
                observer.unobserve(entry.target);
            }
        });
    };

    const revealOptions = {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    // Smooth scroll for anchor links (if browser doesn't natively support scroll-behavior)
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar style change on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(10, 10, 15, 0.95)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.4)';
        } else {
            navbar.style.background = 'rgba(10, 10, 15, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Contact Form Toggle
    const showFormBtn = document.getElementById('show-form-btn');
    const contactForm = document.getElementById('contact-form');

    if(showFormBtn && contactForm) {
        showFormBtn.addEventListener('click', () => {
            contactForm.classList.toggle('show');
            showFormBtn.style.display = 'none';
        });

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = 'Sending...';
            btn.disabled = true;

            const formData = {
                Name: contactForm.querySelector('input[name="Name"]').value,
                Email: contactForm.querySelector('input[name="Email"]').value,
                Message: contactForm.querySelector('textarea[name="Message"]').value,
                _subject: "New Portfolio Submission!"
            };

            fetch('https://formsubmit.co/ajax/shalinivenkat2004@gmail.com', {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                alert('Success! Your message has been sent to shalinivenkat2004@gmail.com.');
                contactForm.reset();
                contactForm.classList.remove('show');
                showFormBtn.style.display = 'inline-block';
            })
            .catch(error => {
                console.error(error);
                alert('Oops! Something went wrong. Please ensure you are connected to the internet.');
            })
            .finally(() => {
                btn.textContent = originalText;
                btn.disabled = false;
            });
        });
    }

});
