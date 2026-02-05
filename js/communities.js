// MoodLink - Communities Module
// Handles community interactions and joining

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
        // For now, just show success message
        updateCommunityStats(communityId);
    }
}

// Update community statistics (simulated)
function updateCommunityStats(communityId) {
    const community = MoodLink.communities[communityId];
    if (community) {
        community.members += 1;
        community.active += 1;
        
        // Update UI if community card exists
        const card = document.querySelector(`[data-community="${communityId}"]`);
        if (card) {
            const membersSpan = card.querySelector('.members');
            const activeSpan = card.querySelector('.active');
            
            if (membersSpan) {
                membersSpan.textContent = `${community.members} members`;
            }
            if (activeSpan) {
                activeSpan.textContent = `${community.active} online`;
            }
        }
    }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { joinCommunity, updateCommunityStats };
}
