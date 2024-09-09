// Function to update the cursor position and size
function updateCursor(cursor, element, charIndex) {
    const rect = element.getBoundingClientRect();
    const elementStyle = getComputedStyle(element);
    const charWidth = parseFloat(elementStyle.fontSize) * 0.6; // Approximate width of a character
    cursor.style.top = `${rect.top + window.scrollY}px`; // Include scroll position
    cursor.style.left = `${rect.left + charWidth * charIndex}px`;
    cursor.style.fontSize = elementStyle.fontSize;
}

// Function to initialize Typed.js and update cursor dynamically
function initTyped(elementId, strings, cursor, onComplete, highlightElement) {
    new Typed(elementId, {
        strings: strings,
        typeSpeed: 100,
        loop: false,
        onChar: function(arrayPos, self) {
            updateCursor(cursor, self.el, self.el.innerText.length);
        },
        onStringTyped: function(arrayPos, self) {
            updateCursor(cursor, self.el, self.el.innerText.length);
        },
        onComplete: function(self) {
            onComplete(self);
            highlightElement.classList.add('highlight-complete'); // Add class when typing is complete
        }
    });
}

// Initialize cursor position and size
document.addEventListener("DOMContentLoaded", function() {
    const cursor = document.getElementById('main-cursor');
    const hiTypedElement = document.getElementById('hi-typed');
    const highlightElement = document.querySelector('.highlight');
    const menu = document.querySelector('.menu'); // Select the menu element

    // Initialize Typed.js for "Hi!👋 I'm"
    initTyped('#hi-typed', ["Hi!👋 I'm"], cursor, function() {
        const bignameTypedElement = document.getElementById('bigname-typed');
        initTyped('#bigname-typed', ["Maya Degafe"], cursor, function(self) {
            updateCursor(cursor, self.el, self.el.innerText.length);
        }, highlightElement);
        updateCursor(cursor, bignameTypedElement, 0);
    }, highlightElement);

    updateCursor(cursor, hiTypedElement, 0);

});