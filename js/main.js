// MoodLink - Main Application Module
// Initializes the entire application and coordinates all modules

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Main application initialization
function initializeApp() {
    loadUserData();
    setupEventListeners();
    updateStats();
    loadJournalEntries();
    initializeMoodWheel();
    setupSmoothScrolling();
    setupFormValidation();
    setupBlogModal();
}

// Setup all event listeners
function setupEventListeners() {
    // Navigation
    document.getElementById('login-btn').addEventListener('click', showLoginModal);
    document.getElementById('close-login').addEventListener('click', hideLoginModal);
    document.getElementById('start-journey').addEventListener('click', showLoginModal);
    
    // Login form
    document.getElementById('login-form').addEventListener('submit', handleLogin);
    
    // Mood wheel
    document.querySelectorAll('.mood-item').forEach(item => {
        item.addEventListener('click', () => selectMood(item.dataset.mood));
    });
    
    document.getElementById('connect-mood').addEventListener('click', findMatches);
    
    // Connection modal
    document.getElementById('close-modal').addEventListener('click', hideConnectionModal);
    
    // Journal
    document.getElementById('save-journal').addEventListener('click', saveJournalEntry);
    document.getElementById('save-anonymous').addEventListener('click', saveAnonymousEntry);
    
    // Journal mood selector
    document.querySelectorAll('.mood-option').forEach(option => {
        option.addEventListener('click', () => selectJournalMood(option.dataset.mood));
    });
    
    // Communities
    document.querySelectorAll('.community-card').forEach(card => {
        card.addEventListener('click', () => joinCommunity(card.dataset.community));
    });
    
    // Close modals on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.add('hidden');
                document.body.style.overflow = 'auto';
            }
        });
    });
}

// Setup blog modal functionality
function setupBlogModal() {
    // Blog modal close button
    document.getElementById('close-blog').addEventListener('click', closeBlogModal);
    
    // Close blog modal on outside click
    document.getElementById('blog-modal').addEventListener('click', (e) => {
        if (e.target.id === 'blog-modal') {
            closeBlogModal();
        }
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeBlogModal();
            hideConnectionModal();
            hideLoginModal();
        }
    });
}

// Export for global access
window.MoodLink = MoodLink;
window.connectWithUser = connectWithUser;

// Make functions globally available for HTML onclick handlers
window.handleLogin = handleLogin;
window.selectMood = selectMood;
window.findMatches = findMatches;
window.saveJournalEntry = saveJournalEntry;
window.saveAnonymousEntry = saveAnonymousEntry;
window.selectJournalMood = selectJournalMood;
window.joinCommunity = joinCommunity;
window.openBlogPost = openBlogPost;
