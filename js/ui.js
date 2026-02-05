// MoodLink - UI Utilities Module
// Handles UI updates, animations, and utility functions

// Update platform statistics
function updateStats() {
    const users = getUsersFromDatabase();
    const entries = JSON.parse(localStorage.getItem('moodlink_entries') || '[]');
    
    // Animate counter updates
    animateCounter('active-users', users.length + 2847); // Base number + stored users
    animateCounter('moods-shared', entries.length + 15392); // Base number + entries
    animateCounter('communities-count', Object.keys(MoodLink.communities).length);
}

// Animate number counters
function animateCounter(elementId, target) {
    const element = document.getElementById(elementId);
    const start = parseInt(element.textContent.replace(/,/g, ''));
    const duration = 2000;
    const increment = (target - start) / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= target) || (increment < 0 && current <= target)) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.round(current).toLocaleString();
        }
    }, 16);
}

// Modal functions
function showLoginModal() {
    document.getElementById('login-modal').classList.remove('hidden');
}

function hideLoginModal() {
    document.getElementById('login-modal').classList.add('hidden');
}

function showConnectionModal() {
    // This function is now in moodWheel.js, but keeping reference for compatibility
}

function hideConnectionModal() {
    document.getElementById('connection-modal').classList.add('hidden');
}

// Utility functions
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
    });
}

function getTimeAgo(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.floor((now - date) / 1000); // Difference in seconds
    
    if (diff < 60) return 'just now';
    if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
}

// Smooth scrolling for navigation links
function setupSmoothScrolling() {
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
}

// Form validation setup
function setupFormValidation() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!form.checkValidity()) {
                e.preventDefault();
                e.stopPropagation();
            }
            form.classList.add('was-validated');
        });
    });
}

// Notification system
function showSuccess(message) {
    showNotification(message, 'success');
}

function showError(message) {
    showNotification(message, 'error');
}

function showNotification(message, type) {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 3000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        ${type === 'success' ? 'background: #2ECC71;' : 'background: #E74C3C;'}
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        updateStats, 
        animateCounter, 
        showLoginModal, 
        hideLoginModal, 
        hideConnectionModal,
        formatDate, 
        getTimeAgo, 
        setupSmoothScrolling, 
        setupFormValidation, 
        showSuccess, 
        showError, 
        showNotification 
    };
}
