// script.js
document.addEventListener('DOMContentLoaded', () => {
    // Parallax effect
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        document.querySelector('.bat-logo').style.transform = 
            `translate(${x * 20 - 10}px, ${y * 20 - 10}px)`;
        
        document.querySelector('.parallax-bg').style.transform = 
            `translate(${x * 50 - 25}px, ${y * 50 - 25}px)`;
    });

    // Project card tilt effect
    document.querySelectorAll('.case-file').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.transform = `
                perspective(1000px)
                rotateX(${(y - rect.height/2) / 10}deg)
                rotateY(${-(x - rect.width/2) / 10}deg)
                translateZ(20px)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateZ(0) rotateX(0) rotateY(0)';
        });
    });

    // Scroll reveal
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                gsap.to(entry.target, {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: "power4.out"
                });
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.case-file, .section-title').forEach(el => {
        observer.observe(el);
    });

    // Navigation
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', (e) => {
            const section = document.getElementById(e.target.dataset.section);
            window.scrollTo({
                top: section.offsetTop,
                behavior: 'smooth'
            });
        });
    });
});