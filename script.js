document.addEventListener('DOMContentLoaded', () => {
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const icon = hamburger.querySelector('i');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.music-section, .tour-card, .about-content, .section-title');
    
    revealElements.forEach(el => el.classList.add('fade-in'));

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        revealElements.forEach(el => {
            const elementTop = el.getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) {
                el.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger on initial load

    // Music Player Logic (Simulated)
    const playBtn = document.getElementById('play');
    const playIcon = playBtn.querySelector('i');
    const progressBar = document.getElementById('progress');
    const progressContainer = document.getElementById('progress-bar');
    const currentTimeEl = document.querySelector('.current-time');
    
    let isPlaying = false;
    let progressInterval;
    let currentProgress = 30; // Starting at 30% for visual effect
    
    function togglePlay() {
        isPlaying = !isPlaying;
        if (isPlaying) {
            playIcon.classList.remove('fa-play');
            playIcon.classList.add('fa-pause');
            
            // Simulate progress
            progressInterval = setInterval(() => {
                currentProgress += 0.5;
                if (currentProgress > 100) currentProgress = 0;
                
                progressBar.style.width = `${currentProgress}%`;
                
                // Update time simulation
                const totalSeconds = Math.floor((currentProgress / 100) * 225); // 3:45 = 225s
                const mins = Math.floor(totalSeconds / 60);
                const secs = totalSeconds % 60;
                currentTimeEl.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
            }, 1000);
        } else {
            playIcon.classList.remove('fa-pause');
            playIcon.classList.add('fa-play');
            clearInterval(progressInterval);
        }
    }
    
    playBtn.addEventListener('click', togglePlay);
    
    // Track list click simulation
    const trackPlayBtns = document.querySelectorAll('.play-track');
    const trackItems = document.querySelectorAll('.track-item');
    
    trackPlayBtns.forEach((btn, index) => {
        btn.addEventListener('click', (e) => {
            // Remove active from all
            trackItems.forEach(item => item.classList.remove('active'));
            // Add to clicked
            trackItems[index].classList.add('active');
            
            // Reset player visual
            currentProgress = 0;
            progressBar.style.width = '0%';
            currentTimeEl.textContent = '0:00';
            
            // Ensure play state
            if (!isPlaying) togglePlay();
        });
    });

    // Progress bar click
    progressContainer.addEventListener('click', (e) => {
        const width = progressContainer.clientWidth;
        const clickX = e.offsetX;
        currentProgress = (clickX / width) * 100;
        progressBar.style.width = `${currentProgress}%`;
        
        const totalSeconds = Math.floor((currentProgress / 100) * 225);
        const mins = Math.floor(totalSeconds / 60);
        const secs = totalSeconds % 60;
        currentTimeEl.textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});
