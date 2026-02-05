// MoodLink - Security and Validation Module
// Handles input validation, sanitization, and security measures

// Validate username for security
function validateUsername(username) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(username);
}

// Sanitize user input to prevent XSS
function sanitizeInput(input) {
    const div = document.createElement('div');
    div.textContent = input;
    return div.innerHTML;
}

// Generate unique user ID
function generateUserId() {
    return 'user_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Generate unique entry ID
function generateEntryId() {
    return 'entry_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Security: Rate limiting for actions
const rateLimiter = {
    lastAction: {},
    limit: 5000, // 5 seconds
    
    canPerformAction(action) {
        const now = Date.now();
        if (this.lastAction[action] && now - this.lastAction[action] < this.limit) {
            return false;
        }
        this.lastAction[action] = now;
        return true;
    }
};

// Security: Prevent XSS and validate inputs
function validateInput(input, type) {
    switch (type) {
        case 'username':
            return validateUsername(input);
        case 'text':
            return input.length > 0 && input.length <= 500;
        case 'mood':
            return Object.keys(moods).includes(input);
        default:
            return true;
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        validateUsername, 
        sanitizeInput, 
        generateUserId, 
        generateEntryId, 
        rateLimiter, 
        validateInput 
    };
}
