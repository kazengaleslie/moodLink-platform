// MoodLink - Core Configuration and State
// Central configuration for the MoodLink platform

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

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { MoodLink, moods };
}
