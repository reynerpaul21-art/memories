// ——— Shared Music & Falling Hearts ———
const audio = new Audio('favorite-girl.mp3');
audio.loop = true;
audio.preload = 'auto';

// Restore playing state from previous page
const isPlaying = sessionStorage.getItem('musicPlaying') === 'true';
const savedTime = parseFloat(sessionStorage.getItem('musicTime') || '0');
audio.currentTime = savedTime;

if (isPlaying) {
    audio.play().catch(() => {});
}

// Save state before leaving page
window.addEventListener('beforeunload', () => {
    sessionStorage.setItem('musicTime', audio.currentTime);
    sessionStorage.setItem('musicPlaying', !audio.paused);
});

// Play button logic
function setupPlayButton(buttonId) {
    const btn = document.getElementById(buttonId);
    if (!btn) return;

    if (isPlaying) {
        btn.textContent = '🎵 Playing... 💜';
        btn.style.background = '#9966FF';
        btn.disabled = true;
    }

    btn.addEventListener('click', () => {
        audio.play().then(() => {
            sessionStorage.setItem('musicPlaying', 'true');
            btn.textContent = '🎵 Playing... 💜';
            btn.style.background = '#9966FF';
            btn.disabled = true;
        });
    });
}

// Falling hearts animation
function setupFalling(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const symbols = ['❤️', '💕', '💜', '✨', '💫', '🌸', '💗', '💌'];
    
    function createFalling() {
        const el = document.createElement('span');
        el.className = 'falling ' + (Math.random() > 0.5 ? 'heart-fall' : 'sparkle-fall');
        el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
        el.style.left = Math.random() * 100 + '%';
        el.style.animationDuration = (6 + Math.random() * 8) + 's';
        el.style.fontSize = (0.8 + Math.random() * 0.8) + 'rem';
        container.appendChild(el);
        setTimeout(() => el.remove(), 15000);
    }
    
    setInterval(createFalling, 400);
    for (let i = 0; i < 15; i++) setTimeout(createFalling, i * 100);
}