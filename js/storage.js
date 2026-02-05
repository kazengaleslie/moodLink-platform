// MoodLink - Storage Management Module
// Handles all local storage operations

// Load user data from local storage
function loadUserData() {
    const userData = localStorage.getItem('moodlink_user');
    if (userData) {
        MoodLink.currentUser = JSON.parse(userData);
        updateUserInterface();
    }
}

// Save user data to local storage
function saveUserData(user) {
    localStorage.setItem('moodlink_user', JSON.stringify(user));
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

// Journal storage functions
function saveEntryToStorage(entry) {
    const entries = JSON.parse(localStorage.getItem('moodlink_entries') || '[]');
    entries.unshift(entry); // Add to beginning
    localStorage.setItem('moodlink_entries', JSON.stringify(entries));
}

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

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        loadUserData, 
        saveUserData, 
        getUsersFromDatabase, 
        addUserToDatabase, 
        saveEntryToStorage, 
        loadJournalEntries 
    };
}
