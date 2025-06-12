document.addEventListener('DOMContentLoaded', () => {
    console.log("Homepage script loaded and DOM fully parsed.");

    // CTA Button Interactivity
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const ctaButton = heroSection.querySelector('button');
        if (ctaButton) {
            ctaButton.addEventListener('click', () => {
                console.log("CTA button clicked!");
            });
        } else {
            console.error("CTA button not found in the hero section.");
        }
    } else {
        console.error("Hero section not found.");
    }

    // Simple Fade-In Animation for Features
    const features = document.querySelectorAll('.features .feature');
    if (features.length > 0) {
        // Initially set opacity to 0
        features.forEach(feature => {
            feature.style.opacity = '0';
        });

        // After a short delay, fade them in
        setTimeout(() => {
            features.forEach((feature, index) => {
                // You can also add a slight delay per item for a staggered effect if desired
                // setTimeout(() => {
                feature.style.opacity = '1';
                // }, index * 100); // Example of staggered delay
            });
        }, 500); // 500ms delay before starting the fade-in
    } else {
        console.warn("No feature elements found for animation.");
    }

    // Page 1 Specific Interactivity
    const page1Content = document.getElementById('page1-content');
    if (page1Content) {
        console.log("Page 1 specific JavaScript executing.");

        const placeholderImg = page1Content.querySelector('.placeholder-img');
        if (placeholderImg) {
            placeholderImg.addEventListener('mouseover', function() {
                this.style.borderColor = '#007bff'; // Change border color
                this.style.boxShadow = '0 0 10px rgba(0,123,255,0.5)';
            });
            placeholderImg.addEventListener('mouseout', function() {
                this.style.borderColor = '#ddd'; // Revert to original border color
                this.style.boxShadow = 'none';
            });
        } else {
            console.warn("Placeholder image not found on Page 1 for interactivity.");
        }
    }

    // Helper functions for form validation (defined here to be accessible by Page 2 code)
    function displayErrorMessage(fieldElement, message) {
        removeErrorMessage(fieldElement); // Clear previous error first
        const errorSpan = document.createElement('span');
        errorSpan.className = 'error-message';
        errorSpan.textContent = message;
        // Insert after the field itself, assuming field is not wrapped further within form-group
        fieldElement.parentNode.insertBefore(errorSpan, fieldElement.nextSibling);
        fieldElement.classList.add('input-error');
    }

    function removeErrorMessage(fieldElement) {
        const parent = fieldElement.parentNode;
        const existingError = parent.querySelector('.error-message');
        if (existingError && existingError.previousSibling === fieldElement) { // Check if error is for this field
            existingError.remove();
        }
        fieldElement.classList.remove('input-error');
    }

    function clearErrorMessages(formElement) {
        const errorMessages = formElement.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.remove());
        const errorInputs = formElement.querySelectorAll('.input-error');
        errorInputs.forEach(input => input.classList.remove('input-error'));
    }

    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Page 2 (Contact Form) Specific Interactivity
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        console.log("Page 2 (Contact Form) specific JavaScript executing.");

        contactForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent actual submission

            const nameField = document.getElementById('name');
            const emailField = document.getElementById('email');
            const messageField = document.getElementById('message');
            let isValid = true;

            clearErrorMessages(this); // 'this' refers to the form

            // Validate Name
            if (nameField.value.trim() === '') {
                displayErrorMessage(nameField, 'Name is required.');
                isValid = false;
            }

            // Validate Email
            if (emailField.value.trim() === '') {
                displayErrorMessage(emailField, 'Email is required.');
                isValid = false;
            } else if (!isValidEmail(emailField.value.trim())) {
                displayErrorMessage(emailField, 'Please enter a valid email address.');
                isValid = false;
            }

            // Validate Message
            if (messageField.value.trim() === '') {
                displayErrorMessage(messageField, 'Message is required.');
                isValid = false;
            }

            if (isValid) {
                alert('Message sent successfully! (This is a simulation)');
                this.reset(); // Clear the form
                clearErrorMessages(this); // Clear any lingering error styles if reset doesn't
            }
        });
    }
});
