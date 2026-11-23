// ─── Preloader ───
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('preloader').classList.add('hidden');
    }, 1800);
});

// ─── Cover Open ───
const heroSection = document.getElementById('hero');
const heroVideo = heroSection.querySelector('.hero-video');
const openBtn = document.getElementById('openBtn');
const scrollInd = document.getElementById('scrollIndicator');
let coverOpened = false;

openBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    openCover();
});

function openCover() {
    if (coverOpened) return;
    coverOpened = true;

    heroSection.classList.add('opened');
    document.body.classList.add('unlocked');
    playMusic();
    createPetals();

    setTimeout(() => {
        scrollInd.style.display = 'flex';
    }, 1500);
}

// ─── Music ───
const bgMusic = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicToggle');
let isPlaying = false;

const musicIcon = document.getElementById('musicIcon');

function playMusic() {
    bgMusic.play().then(() => {
        isPlaying = true;
        musicBtn.classList.add('playing');
        musicIcon.className = 'fas fa-music';
    }).catch(() => {});
}

musicBtn.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        isPlaying = false;
        musicBtn.classList.remove('playing');
        musicIcon.className = 'fas fa-volume-mute';
    } else {
        playMusic();
    }
});

// ─── Countdown ───
function updateCountdown() {
    const wedding = new Date('2026-12-29T15:30:00+05:30');
    const now = new Date();
    const diff = wedding - now;

    if (diff <= 0) {
        document.getElementById('cdDays').textContent = '00';
        document.getElementById('cdHours').textContent = '00';
        document.getElementById('cdMins').textContent = '00';
        document.getElementById('cdSecs').textContent = '00';
        return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    document.getElementById('cdDays').textContent = String(d).padStart(2, '0');
    document.getElementById('cdHours').textContent = String(h).padStart(2, '0');
    document.getElementById('cdMins').textContent = String(m).padStart(2, '0');
    document.getElementById('cdSecs').textContent = String(s).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

// ─── Scroll reveal ───
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15 });
revealEls.forEach(el => observer.observe(el));

// ─── Petal animation ───
function createPetals() {
    const colors = ['#c5cba8', '#b8963e', '#d4c08a', '#7b8a5c', '#e6dbc0'];
    for (let i = 0; i < 25; i++) {
        setTimeout(() => {
            const petal = document.createElement('div');
            petal.classList.add('petal');
            const size = 6 + Math.random() * 10;
            const color = colors[Math.floor(Math.random() * colors.length)];
            petal.style.left = Math.random() * 100 + 'vw';
            petal.style.animationDuration = (6 + Math.random() * 6) + 's';
            petal.style.width = size + 'px';
            petal.style.height = size + 'px';
            petal.style.borderRadius = '50% 0 50% 0';
            petal.style.background = color;
            document.body.appendChild(petal);
            petal.addEventListener('animationend', () => petal.remove());
        }, i * 350);
    }
}

// ─── Add to Calendar ───
function addToCalendar(e) {
    e.preventDefault();
    const title = 'Wedding of Reuben Mathew & Prastuthi Elish';
    const start = '20261229T100000Z';
    const end = '20261229T143000Z';
    const location = 'St Mary\'s Residential Public School Auditorium, Thiruvalla, Kerala, India';
    const details = 'You are cordially invited to celebrate the marriage of Reuben Mathew with Prastuthi Elish.';
    const url = 'https://calendar.google.com/calendar/render?action=TEMPLATE'
        + '&text=' + encodeURIComponent(title)
        + '&dates=' + start + '/' + end
        + '&location=' + encodeURIComponent(location)
        + '&details=' + encodeURIComponent(details);
    window.open(url, '_blank');
}

// ─── RSVP Handler ───
function handleRSVP(e) {
    e.preventDefault();
    const msg = document.getElementById('rsvpMsg');
    msg.textContent = 'Thank you! Your response has been recorded. God bless you!';
    msg.style.display = 'block';
    e.target.reset();
    setTimeout(() => { msg.style.display = 'none'; }, 5000);
}
