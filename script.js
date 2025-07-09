// Get DOM elements
const timeElement = document.getElementById('time');
const dateElement = document.getElementById('date');
const millisecondsElement = document.getElementById('milliseconds');
const themeButtons = document.querySelectorAll('.theme-btn');
const body = document.body;

// Days and months arrays
const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 
                'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

// Update time function
function updateTime() {
    const now = new Date();
    
    // Get time components
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const milliseconds = now.getMilliseconds().toString().padStart(3, '0');
    
    // Get date components
    const dayName = days[now.getDay()];
    const monthName = months[now.getMonth()];
    const date = now.getDate().toString().padStart(2, '0');
    
    // Update display
    timeElement.textContent = `${hours}:${minutes}:${seconds}`;
    dateElement.textContent = `${dayName}, ${monthName} ${date}`;
    millisecondsElement.textContent = milliseconds;
}

// Theme switching function
function switchTheme(theme) {
    // Remove active class from all buttons
    themeButtons.forEach(btn => btn.classList.remove('active'));
    
    // Add active class to clicked button
    const activeButton = document.querySelector(`[data-theme="${theme}"]`);
    if (activeButton) {
        activeButton.classList.add('active');
    }
    
    // Set theme on body
    body.setAttribute('data-theme', theme);
    
    // Store theme preference
    localStorage.setItem('watchTheme', theme);
    
    // Update particle colors based on theme
    updateParticleColors(theme);
}

// Update particle colors based on theme
function updateParticleColors(theme) {
    const particles = document.querySelectorAll('.particle');
    const themeColors = {
        'black': '#00ffff',
        'pink': '#ff69b4',
        'blue': '#0080ff',
        'green': '#00ff80',
        'purple': '#8000ff',
        'red': '#ff0040',
        'gold': '#ffd700',
        'silver': '#c0c0c0',
        'orange': '#ff8000',
        'cyan': '#00ffff',
        'neon': '#39ff14'
    };
    
    const color = themeColors[theme] || '#00ffff';
    particles.forEach(particle => {
        particle.style.background = color;
        particle.style.boxShadow = `0 0 10px ${color}`;
    });
}

// Initialize theme from localStorage or default to pink
function initializeTheme() {
    const savedTheme = localStorage.getItem('watchTheme') || 'pink';
    switchTheme(savedTheme);
}

// Add click event listeners to theme buttons
themeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const theme = button.getAttribute('data-theme');
        switchTheme(theme);
    });
});

// Add keyboard shortcuts for theme switching
document.addEventListener('keydown', (e) => {
    const keyToTheme = {
        '1': 'black',
        '2': 'pink',
        '3': 'blue',
        '4': 'green',
        '5': 'purple',
        '6': 'red',
        '7': 'gold',
        '8': 'silver',
        '9': 'orange',
        '0': 'cyan',
        '-': 'neon'
    };
    
    if (keyToTheme[e.key]) {
        switchTheme(keyToTheme[e.key]);
    }
});

// Add smooth scroll effect to particles
function animateParticles() {
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        const speed = 0.5 + Math.random() * 0.5;
        const delay = index * 0.5;
        particle.style.animationDuration = `${6 + speed}s`;
        particle.style.animationDelay = `${delay}s`;
    });
}

// Add pulse effect to watch on hour change
let lastHour = new Date().getHours();
function checkHourChange() {
    const currentHour = new Date().getHours();
    if (currentHour !== lastHour) {
        const watchFrame = document.querySelector('.watch-frame');
        watchFrame.style.animation = 'none';
        setTimeout(() => {
            watchFrame.style.animation = 'pulse 3s infinite ease-in-out';
        }, 10);
        lastHour = currentHour;
    }
}

// Add digital clock sound effect (visual feedback)
function addClickFeedback() {
    const watchFace = document.querySelector('.watch-face');
    watchFace.addEventListener('click', () => {
        watchFace.style.transform = 'scale(0.98)';
        setTimeout(() => {
            watchFace.style.transform = 'scale(1)';
        }, 100);
    });
}

// Toggle theme selector visibility
function toggleThemeSelector() {
    const themeDropdown = document.getElementById('themeDropdown');
    themeDropdown.classList.toggle('show');
    
    // Save state to localStorage
    const isOpen = themeDropdown.classList.contains('show');
    localStorage.setItem('themeDropdownOpen', isOpen);
}

// Initialize theme selector state
function initializeThemeSelector() {
    const isOpen = localStorage.getItem('themeDropdownOpen') === 'true';
    const themeDropdown = document.getElementById('themeDropdown');
    
    if (isOpen) {
        themeDropdown.classList.add('show');
    } else {
        themeDropdown.classList.remove('show');
    }
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(event) {
        const container = document.querySelector('.theme-button-container');
        if (!container.contains(event.target)) {
            themeDropdown.classList.remove('show');
        }
    });
}

// Enhanced search functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchForm = document.querySelector('.search-form');
    
    // Add search suggestions functionality
    searchInput.addEventListener('input', function(e) {
        // Add subtle glow effect when typing
        if (e.target.value.length > 0) {
            e.target.parentElement.style.boxShadow = '0 0 25px rgba(255, 105, 180, 0.6)';
        } else {
            e.target.parentElement.style.boxShadow = '0 0 20px rgba(255, 105, 180, 0.3)';
        }
    });
    
    // Handle form submission
    searchForm.addEventListener('submit', function(e) {
        const query = searchInput.value.trim();
        if (!query) {
            e.preventDefault();
            return;
        }
        
        // Check if it's a URL
        if (isUrl(query)) {
            e.preventDefault();
            const url = query.startsWith('http') ? query : 'https://' + query;
            window.open(url, '_blank');
        } else {
            // For Google search, ensure proper encoding and add parameters
            e.preventDefault();
            
            // Create the Google search URL manually for better control
            const baseUrl = 'https://www.google.com/search';
            const params = new URLSearchParams();
            
            params.set('q', query);
            params.set('rlz', '1C1ONGR_enIN1094IN1094');
            params.set('oq', query);
            params.set('gs_lcrp', 'EgZjaHJvbWUyBggAEEUYOTIJCAEQABgNGIAEMgoIAhAAGAoYDRgeMggIAxAAGA0YHjIICAQQABgNGB4yCAgFEAAYDRgeMggIBhAAGA0YHjIICAcQABgNGB4yCAgIEAAYDRgeMggICRAAGA0YHtIBCDQ5ODdqMGo3qAIAsAIA');
            params.set('sourceid', 'chrome');
            params.set('ie', 'UTF-8');
            
            const searchUrl = `${baseUrl}?${params.toString()}`;
            window.open(searchUrl, '_blank');
        }
    });
    
    // Focus search with Ctrl+K
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
        }
    });
}

// Check if input is a URL
function isUrl(string) {
    // More strict URL detection
    const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/i;
    const hasProtocol = string.startsWith('http://') || string.startsWith('https://');
    const hasDomain = string.includes('.') && !string.includes(' ');
    
    // If it has protocol, definitely a URL
    if (hasProtocol) return true;
    
    // If it has spaces, it's probably a search query
    if (string.includes(' ')) return false;
    
    // Check if it looks like a domain (has dot and no spaces)
    if (hasDomain && urlPattern.test(string)) {
        // Common domains
        const commonTlds = ['.com', '.org', '.net', '.edu', '.gov', '.co.uk', '.io', '.dev', '.app'];
        return commonTlds.some(tld => string.toLowerCase().includes(tld));
    }
    
    return false;
}

// Initialize everything when page loads
document.addEventListener('DOMContentLoaded', () => {
    initializeTheme();
    animateParticles();
    addClickFeedback();
    updateTime();
    initializeThemeSelector();
    initializeSearch();
    
    // Update time every 10ms for smooth milliseconds display
    setInterval(updateTime, 10);
    
    // Check for hour changes every minute
    setInterval(checkHourChange, 60000);
});

// Add fullscreen toggle functionality
document.addEventListener('keydown', (e) => {
    if (e.key === 'F11') {
        e.preventDefault();
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    }
});

// Add random theme shuffle
function shuffleTheme() {
    const themes = ['pink', 'black', 'blue', 'green', 'purple', 'red', 'gold', 'silver', 'orange', 'cyan', 'neon'];
    const currentTheme = body.getAttribute('data-theme');
    let newTheme;
    do {
        newTheme = themes[Math.floor(Math.random() * themes.length)];
    } while (newTheme === currentTheme);
    switchTheme(newTheme);
}

// Add shuffle functionality with 'S' key
document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 's') {
        shuffleTheme();
    }
});

// Add time format toggle (12/24 hour)
let is24HourFormat = true;
function toggleTimeFormat() {
    is24HourFormat = !is24HourFormat;
    localStorage.setItem('timeFormat', is24HourFormat ? '24' : '12');
}

// Update the updateTime function to support 12/24 hour format
const originalUpdateTime = updateTime;
updateTime = function() {
    const now = new Date();
    
    // Get time components
    let hours = now.getHours();
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const milliseconds = now.getMilliseconds().toString().padStart(3, '0');
    
    // Handle 12/24 hour format
    let timeString;
    if (is24HourFormat) {
        timeString = `${hours.toString().padStart(2, '0')}:${minutes}:${seconds}`;
    } else {
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12; // 0 should be 12
        timeString = `${hours.toString().padStart(2, '0')}:${minutes}:${seconds} ${ampm}`;
    }
    
    // Get date components
    const dayName = days[now.getDay()];
    const monthName = months[now.getMonth()];
    const date = now.getDate().toString().padStart(2, '0');
    
    // Update display
    timeElement.textContent = timeString;
    dateElement.textContent = `${dayName}, ${monthName} ${date}`;
    millisecondsElement.textContent = milliseconds;
};

// Initialize time format from localStorage
document.addEventListener('DOMContentLoaded', () => {
    const savedFormat = localStorage.getItem('timeFormat') || '24';
    is24HourFormat = savedFormat === '24';
});

// Add 'T' key to toggle time format
document.addEventListener('keydown', (e) => {
    if (e.key.toLowerCase() === 't') {
        toggleTimeFormat();
    }
});

console.log('Futuristic Watch Loaded! 🕐');
console.log('Keyboard shortcuts:');
console.log('- 1-9, 0, - : Switch themes');
console.log('- S: Shuffle random theme');
console.log('- T: Toggle 12/24 hour format');
console.log('- Ctrl+K: Focus search');
console.log('- F11: Toggle fullscreen');
console.log('- Click watch face for feedback effect');
console.log('- Click "Themes" button (top-left) to select themes');
