// MoodLink - Journal Module
// Handles journal entries and mood tracking

// Journal mood selection
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

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { 
        selectJournalMood, 
        saveJournalEntry, 
        saveAnonymousEntry, 
        addEntryToDisplay, 
        clearJournalForm 
    };
}
