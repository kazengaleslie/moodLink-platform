// MoodLink - Emotional Connection Platform
// Main JavaScript file with mood matching, journal, and community features

// Global state management
const MoodLink = {
    currentUser: null,
    selectedMood: null,
    journalEntries: [],
    matchedUsers: [],
    communities: {
        'happy-vibes': { name: 'Happy Vibes', members: 423, active: 28 },
        'students-stress': { name: 'Students Stress Corner', members: 892, active: 67 },
        'love-talk': { name: 'Love & Crush Talk', members: 567, active: 34 },
        'motivation': { name: 'Motivation Tribe', members: 1200, active: 89 }
    }
};

// Mood definitions with emojis and colors
const moods = {
    happy: { emoji: '😊', color: '#FFD700', description: 'Feeling joyful and positive' },
    sad: { emoji: '😢', color: '#4A90E2', description: 'Feeling down or melancholic' },
    excited: { emoji: '🎉', color: '#FF6B6B', description: 'Full of energy and enthusiasm' },
    angry: { emoji: '😠', color: '#E74C3C', description: 'Feeling frustrated or upset' },
    lonely: { emoji: '😔', color: '#9B59B6', description: 'Feeling isolated or alone' },
    confused: { emoji: '😕', color: '#F39C12', description: 'Feeling uncertain or unclear' },
    tired: { emoji: '😴', color: '#95A5A6', description: 'Feeling exhausted or drained' },
    grateful: { emoji: '🙏', color: '#2ECC71', description: 'Feeling thankful and appreciative' }
};

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
}

// Load user data from local storage
function loadUserData() {
    const userData = localStorage.getItem('moodlink_user');
    if (userData) {
        MoodLink.currentUser = JSON.parse(userData);
        updateUserInterface();
    }
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
            }
        });
    });
}

// Initialize mood wheel interactions
function initializeMoodWheel() {
    const moodItems = document.querySelectorAll('.mood-item');
    moodItems.forEach(item => {
        const mood = item.dataset.mood;
        const moodData = moods[mood];
        if (moodData) {
            item.style.borderColor = moodData.color + '40';
            item.addEventListener('mouseenter', () => {
                item.style.backgroundColor = moodData.color + '20';
            });
            item.addEventListener('mouseleave', () => {
                if (!item.classList.contains('selected')) {
                    item.style.backgroundColor = 'transparent';
                }
            });
        }
    });
}

// Handle user login with validation
function handleLogin(event) {
    event.preventDefault();
    
    const username = sanitizeInput(document.getElementById('username').value.trim());
    const userMood = document.getElementById('user-mood').value;
    
    // Validation
    if (!validateUsername(username)) {
        showError('Please enter a valid username (3-20 characters, letters and numbers only)');
        return;
    }
    
    if (!userMood) {
        showError('Please select your current mood');
        return;
    }
    
    // Create user object
    MoodLink.currentUser = {
        id: generateUserId(),
        username: username,
        mood: userMood,
        joinedAt: new Date().toISOString(),
        isAnonymous: false
    };
    
    // Save to local storage
    localStorage.setItem('moodlink_user', JSON.stringify(MoodLink.currentUser));
    
    // Update UI
    updateUserInterface();
    hideLoginModal();
    showSuccess(`Welcome to MoodLink, ${username}!`);
    
    // Add to simulated user database
    addUserToDatabase(MoodLink.currentUser);
}

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

// Update user interface based on login status
function updateUserInterface() {
    const loginBtn = document.getElementById('login-btn');
    const userProfile = document.getElementById('user-profile');
    
    if (MoodLink.currentUser) {
        loginBtn.classList.add('hidden');
        userProfile.classList.remove('hidden');
        userProfile.querySelector('.user-name').textContent = MoodLink.currentUser.username;
        userProfile.querySelector('.user-mood').textContent = moods[MoodLink.currentUser.mood]?.emoji || '😊';
    } else {
        loginBtn.classList.remove('hidden');
        userProfile.classList.add('hidden');
    }
}

// Mood selection functionality
function selectMood(mood) {
    // Remove previous selection
    document.querySelectorAll('.mood-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    // Add selection to clicked mood
    const selectedItem = document.querySelector(`[data-mood="${mood}"]`);
    selectedItem.classList.add('selected');
    
    // Update selected mood display
    MoodLink.selectedMood = mood;
    const selectedDisplay = document.querySelector('.selected-mood-display');
    selectedDisplay.querySelector('.selected-emoji').textContent = moods[mood].emoji;
    selectedDisplay.querySelector('.selected-text').textContent = `Feeling ${mood}`;
    
    // Enable connect button
    document.getElementById('connect-mood').disabled = false;
    
    // Add visual feedback
    selectedItem.style.backgroundColor = moods[mood].color + '30';
}

// Find users with similar moods
function findMatches() {
    if (!MoodLink.selectedMood) return;
    
    // Get users from local storage database
    const allUsers = getUsersFromDatabase();
    
    // Filter users with similar or complementary moods
    MoodLink.matchedUsers = allUsers.filter(user => {
        if (user.id === MoodLink.currentUser?.id) return false;
        
        // Match same mood or complementary moods
        const complementaryMoods = {
            sad: ['happy', 'grateful'],
            angry: ['calm', 'grateful'],
            lonely: ['happy', 'excited'],
            confused: ['happy', 'grateful'],
            tired: ['excited', 'happy']
        };
        
        return user.mood === MoodLink.selectedMood || 
               complementaryMoods[MoodLink.selectedMood]?.includes(user.mood);
    }).slice(0, 5); // Limit to 5 matches
    
    showConnectionModal();
}

// Display connection modal with matched users
function showConnectionModal() {
    const modal = document.getElementById('connection-modal');
    const matchedUsersContainer = document.getElementById('matched-users');
    
    if (MoodLink.matchedUsers.length === 0) {
        matchedUsersContainer.innerHTML = `
            <div class="no-matches">
                <p>No one else is feeling ${MoodLink.selectedMood} right now.</p>
                <p>Be the first to share this mood!</p>
            </div>
        `;
    } else {
        matchedUsersContainer.innerHTML = MoodLink.matchedUsers.map(user => `
            <div class="user-card" onclick="connectWithUser('${user.id}')">
                <div class="user-avatar">${moods[user.mood].emoji}</div>
                <div class="user-info">
                    <div class="user-name">${sanitizeInput(user.username)}</div>
                    <div class="user-status">Feeling ${user.mood} • ${getTimeAgo(user.lastActive)}</div>
                </div>
            </div>
        `).join('');
    }
    
    modal.classList.remove('hidden');
}

// Connect with a specific user
function connectWithUser(userId) {
    const user = MoodLink.matchedUsers.find(u => u.id === userId);
    if (user) {
        showSuccess(`Connection request sent to ${user.username}!`);
        hideConnectionModal();
    }
}

// Journal functionality
function selectJournalMood(mood) {
    document.querySelectorAll('.mood-option').forEach(option => {
        option.classList.remove('selected');
    });
    
    const selectedOption = document.querySelector(`.mood-option[data-mood="${mood}"]`);
    selectedOption.classList.add('selected');
    selectedOption.style.background = moods[mood].color + '40';
}

// Save journal entry
function saveJournalEntry() {
    if (!MoodLink.currentUser) {
        showError('Please login to save journal entries');
        return;
    }
    
    const date = document.getElementById('journal-date').value;
    const mood = document.querySelector('.mood-option.selected')?.dataset.mood;
    const text = sanitizeInput(document.getElementById('journal-text').value.trim());
    
    if (!date || !mood || !text) {
        showError('Please fill in all fields');
        return;
    }
    
    const entry = {
        id: generateEntryId(),
        userId: MoodLink.currentUser.id,
        username: MoodLink.currentUser.username,
        date: date,
        mood: mood,
        text: text,
        timestamp: new Date().toISOString(),
        isAnonymous: false
    };
    
    saveEntryToStorage(entry);
    addEntryToDisplay(entry);
    clearJournalForm();
    showSuccess('Journal entry saved successfully!');
}

// Save anonymous journal entry
function saveAnonymousEntry() {
    const date = document.getElementById('journal-date').value;
    const mood = document.querySelector('.mood-option.selected')?.dataset.mood;
    const text = sanitizeInput(document.getElementById('journal-text').value.trim());
    
    if (!date || !mood || !text) {
        showError('Please fill in all fields');
        return;
    }
    
    const entry = {
        id: generateEntryId(),
        userId: 'anonymous',
        username: 'Anonymous',
        date: date,
        mood: mood,
        text: text,
        timestamp: new Date().toISOString(),
        isAnonymous: true
    };
    
    saveEntryToStorage(entry);
    addEntryToDisplay(entry);
    clearJournalForm();
    showSuccess('Anonymous entry saved successfully!');
}

// Generate unique entry ID
function generateEntryId() {
    return 'entry_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
}

// Save entry to local storage
function saveEntryToStorage(entry) {
    const entries = JSON.parse(localStorage.getItem('moodlink_entries') || '[]');
    entries.unshift(entry); // Add to beginning
    localStorage.setItem('moodlink_entries', JSON.stringify(entries));
}

// Load journal entries from storage
function loadJournalEntries() {
    const entries = JSON.parse(localStorage.getItem('moodlink_entries') || '[]');
    MoodLink.journalEntries = entries;
    
    const entriesContainer = document.getElementById('journal-entries');
    if (entries.length === 0) {
        entriesContainer.innerHTML = '<p class="text-center">No entries yet. Start your journal today!</p>';
    } else {
        entriesContainer.innerHTML = entries.slice(0, 10).map(entry => addEntryToDisplay(entry, false)).join('');
    }
}

// Add entry to display
function addEntryToDisplay(entry, prepend = true) {
    const entriesContainer = document.getElementById('journal-entries');
    const entryElement = document.createElement('div');
    entryElement.className = 'entry-item';
    entryElement.innerHTML = `
        <div class="entry-header">
            <span class="entry-date">${formatDate(entry.date)}</span>
            <span class="entry-mood">${moods[entry.mood].emoji}</span>
        </div>
        <div class="entry-content">
            <strong>${entry.isAnonymous ? 'Anonymous' : sanitizeInput(entry.username)}:</strong>
            <p>${entry.text}</p>
        </div>
    `;
    
    if (prepend && entriesContainer.firstChild) {
        entriesContainer.insertBefore(entryElement, entriesContainer.firstChild);
    } else {
        entriesContainer.appendChild(entryElement);
    }
    
    return entryElement.outerHTML;
}

// Clear journal form
function clearJournalForm() {
    document.getElementById('journal-date').value = '';
    document.getElementById('journal-text').value = '';
    document.querySelectorAll('.mood-option').forEach(option => {
        option.classList.remove('selected');
        option.style.background = 'transparent';
    });
}

// Community functionality
function joinCommunity(communityId) {
    if (!MoodLink.currentUser) {
        showError('Please login to join communities');
        return;
    }
    
    const community = MoodLink.communities[communityId];
    if (community) {
        showSuccess(`Welcome to ${community.name}!`);
        // In a real app, this would join the community
    }
}

// Local storage database functions
function getUsersFromDatabase() {
    return JSON.parse(localStorage.getItem('moodlink_users') || '[]');
}

function addUserToDatabase(user) {
    const users = getUsersFromDatabase();
    users.push({
        ...user,
        lastActive: new Date().toISOString()
    });
    localStorage.setItem('moodlink_users', JSON.stringify(users));
}

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
    document.getElementById('connection-modal').classList.remove('hidden');
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

// Export for global access
window.MoodLink = MoodLink;
window.connectWithUser = connectWithUser;
