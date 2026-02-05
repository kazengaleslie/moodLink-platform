// MoodLink - Mood Wheel Module
// Handles mood selection and matching functionality

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

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        initializeMoodWheel, 
        selectMood, 
        findMatches, 
        showConnectionModal 
    };
}
