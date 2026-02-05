// MoodLink - User Management Module
// Handles user authentication and profile management

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
    saveUserData(MoodLink.currentUser);
    
    // Update UI
    updateUserInterface();
    hideLoginModal();
    showSuccess(`Welcome to MoodLink, ${username}!`);
    
    // Add to simulated user database
    addUserToDatabase(MoodLink.currentUser);
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

// Connect with a specific user
function connectWithUser(userId) {
    const user = MoodLink.matchedUsers.find(u => u.id === userId);
    if (user) {
        showSuccess(`Connection request sent to ${user.username}!`);
        hideConnectionModal();
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { handleLogin, updateUserInterface, connectWithUser };
}
