/**
 * Contact form handling script for TankStore Inc. website
 * Handles form submissions with client-side validation
 */

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const subject = document.getElementById('subject').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Validate form data
            let isValid = true;
            let errorMessage = '';
            
            if (!name) {
                isValid = false;
                errorMessage += 'Name is required.<br>';
            }
            
            if (!email) {
                isValid = false;
                errorMessage += 'Email is required.<br>';
            } else if (!isValidEmail(email)) {
                isValid = false;
                errorMessage += 'Please enter a valid email address.<br>';
            }
            
            if (!message) {
                isValid = false;
                errorMessage += 'Message is required.<br>';
            }
            
            // Display error message if validation fails
            const formAlert = document.getElementById('form-alert');
            
            if (!isValid) {
                formAlert.innerHTML = errorMessage;
                formAlert.classList.add('alert-error');
                formAlert.classList.remove('alert-success');
                formAlert.style.display = 'block';
                return;
            }
            
            // In a real application, you would send this data to a server
            // For this static site, we'll simulate a successful submission
            
            // Create submission object (this would normally be sent to a server)
            const submission = {
                name: name,
                email: email,
                phone: phone,
                subject: subject,
                message: message,
                date: new Date().toISOString()
            };
            
            // For demonstration, store in localStorage
            let submissions = JSON.parse(localStorage.getItem('contactSubmissions')) || [];
            submissions.push(submission);
            localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
            
            // Show success message
            formAlert.innerHTML = 'Your message has been sent successfully! We will contact you soon.';
            formAlert.classList.add('alert-success');
            formAlert.classList.remove('alert-error');
            formAlert.style.display = 'block';
            
            // Reset form
            contactForm.reset();
            
            // Redirect to thank you page after a short delay
            setTimeout(() => {
                window.location.href = 'thank-you.html';
            }, 2000);
        });
    }
    
    /**
     * Validates an email address
     * @param {string} email - The email address to validate
     * @returns {boolean} Whether the email is valid
     */
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
});