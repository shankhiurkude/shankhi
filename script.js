// ==========================================================================
// ITYNR 2026 | Interactive Engine
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    
    // 1. Navigation Shrink on Scroll
    const nav = document.querySelector('.main-nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    // 2. Scroll Reveal Animations (Staggered fade-ins)
    const reveals = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px -50px 0px" });

    reveals.forEach(el => revealObserver.observe(el));

    // 3. 3D Hover Tilt Effect for Glass Cards
    const glassCards = document.querySelectorAll('.glass-card');
    glassCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;  
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10; 
            const rotateY = ((x - centerX) / centerX) * 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });

    // 4. Orbital Motion Logic (Home Page Scroll Logic)
    const orbitCards = document.querySelectorAll('.orbit-card');
    const orbitRadius = window.innerWidth > 768 ? 300 : 150; 
    
    function updateOrbits(scrollOffset = 0) {
        const totalCards = orbitCards.length;
        orbitCards.forEach((card, index) => {
            const angle = ((360 / totalCards) * index) + (scrollOffset * 0.1); 
            const radian = (angle * Math.PI) / 180;
            
            const x = Math.cos(radian) * orbitRadius;
            const y = Math.sin(radian) * orbitRadius;
            
            card.style.transform = `translate(${x}px, ${y}px)`;
            
            const zIndex = Math.round((Math.sin(radian) + 1) * 100);
            card.style.zIndex = zIndex;
            
            const scale = 0.8 + ((Math.sin(radian) + 1) * 0.1);
            card.style.transform += ` scale(${scale})`;
        });
    }

    if(orbitCards.length > 0) {
        updateOrbits(); 
        window.addEventListener('scroll', () => {
            updateOrbits(window.scrollY);
        });
    }

    // 5. Special Feature: Tab Switch Detection (Retention Popup)
    let hasShownPopup = false;
    let switchedAwayTime = 0;

    document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
            switchedAwayTime = Date.now();
        } else {
            const timeAway = Date.now() - switchedAwayTime;
            if (timeAway > 2000 && !hasShownPopup) {
                showRetentionPopup();
                hasShownPopup = true;
            }
        }
    });

    function showRetentionPopup() {
        const modal = document.createElement('div');
        modal.className = 'retention-modal';
        modal.innerHTML = `
            <div class="retention-content">
                <h2 style="margin-bottom: 15px; color: #0F172A;">Leaving so soon?</h2>
                <p style="color: #64748B; margin-bottom: 25px;">There's so much more to explore. See how we transform enterprise technology.</p>
                <div style="display: flex; gap: 15px; justify-content: center;">
                    <button id="closePopup" class="btn-premium" style="background: #F1F5F9; color: #0F172A; border: none; cursor: pointer;">Close</button>
                    <a href="services.html" class="btn-premium" style="text-decoration: none;">Explore Services</a>
                </div>
            </div>
        `;
        document.body.appendChild(modal);

        requestAnimationFrame(() => {
            modal.classList.add('show');
        });

        document.getElementById('closePopup').addEventListener('click', () => {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 400); 
        });
    }
});