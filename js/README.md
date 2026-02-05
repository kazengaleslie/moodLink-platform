# MoodLink JavaScript Modules

This directory contains the modular JavaScript files for the MoodLink platform.

## File Structure

### **config.js**
- Global state management (`MoodLink` object)
- Mood definitions with emojis and colors
- Community data

### **security.js**
- Input validation and sanitization
- XSS prevention
- Rate limiting
- User ID and entry ID generation

### **storage.js**
- Local storage operations
- User data persistence
- Journal entry storage
- Database management

### **user.js**
- User authentication
- Profile management
- User interface updates
- Connection handling

### **moodWheel.js**
- Mood wheel initialization
- Mood selection functionality
- Mood matching algorithm
- Connection modal display

### **journal.js**
- Journal entry creation
- Anonymous posting
- Mood tracking
- Entry display management

### **communities.js**
- Community joining
- Statistics updates
- Community interactions

### **ui.js**
- UI utilities and helpers
- Animations and transitions
- Modal management
- Notification system
- Form validation setup

### **main.js**
- Application initialization
- Event listener setup
- Module coordination
- Global exports

## How It Works

1. **Loading Order**: Scripts are loaded in dependency order
2. **Global Access**: Functions are made available globally for HTML event handlers
3. **Modular Design**: Each module handles specific functionality
4. **Shared State**: `MoodLink` object in `config.js` stores global state
5. **Security**: All inputs are validated and sanitized through `security.js`

## Benefits

- **Maintainability**: Easy to find and update specific functionality
- **Reusability**: Modules can be reused in other projects
- **Testing**: Each module can be tested independently
- **Collaboration**: Multiple developers can work on different modules
- **Performance**: Better code organization and potential for lazy loading

All functionality remains exactly the same, but the code is now organized into logical, manageable modules.
