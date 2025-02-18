function toggleMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
}
// Défilement
let lastScroll = 0;
const navbar = document.getElementById('navbar');

// Barre de naviguation lors du défilement
window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.classList.add('hide');
    } else {
        navbar.classList.remove('hide');
    }
    
    lastScroll = currentScroll;
});


// Défilement fluide 
document.querySelectorAll('#navbar a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();

        // Retirer la classe active de tous les liens
        document.querySelectorAll('#navbar a').forEach(el => {
            el.classList.remove('active');
        });

        // Ajouter la classe active au lien cliqué
        this.classList.add('active');

        // Animation de défilement fluide
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        const navHeight = navbar.offsetHeight;

        window.scrollTo({
            top: targetSection.offsetTop - navHeight,
            behavior: 'smooth'
        });
    });
});

// Mettre à jour la navigation active pendant le défilement
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('#navbar a');

function updateActiveSection() {
    const scrollPosition = window.scrollY + navbar.offsetHeight + 50;

    sections.forEach(section => {
        const start = section.offsetTop;
        const end = start + section.offsetHeight;

        if (scrollPosition >= start && scrollPosition < end) {
            const targetId = '#' + section.id;
            
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === targetId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Lecture des événements de défilement pour mettre à jour la section active
window.addEventListener('scroll', updateActiveSection);
window.addEventListener('resize', updateActiveSection);

// Appeler une fois au chargement
document.addEventListener('DOMContentLoaded', updateActiveSection);

// Ajouter un effet d'ondulation au clic (ripple effect)
document.querySelectorAll('#navbar a').forEach(link => {
    link.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const ripple = document.createElement('div');
        
        ripple.className = 'ripple';
        ripple.style.left = `${e.clientX - rect.left}px`;
        ripple.style.top = `${e.clientY - rect.top}px`;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});



document.addEventListener('DOMContentLoaded', function() {

    const container = document.querySelector('.geometric-shapes'); 


    // Fonction pour nombre aléatoire
    function random(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Créer les cercles
    for (let i = 0; i < 10; i++) {
        const circle = document.createElement('div');
        circle.className = 'shape-circle';
        
        // Définir la taille (entre 100 et 250px)
        const size = random(100, 250);
        
        // Styles de base
        circle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background-color: rgb(255, 221, 0);
            top: ${random(0, window.innerHeight - size)}px;
            animation: float 15s infinite ease-in-out;
            animation-delay: ${random(0, 5)}s;
        `;

        
        if (i % 3 === 0) {  
            // Position à gauche  
            circle.style.left = `${random(-50, 150)}px`;  
        } else if (i % 3 === 1) {  
            // Position au centre  
            circle.style.left = "50%";  
            circle.style.transform = "translateX(-50%)";  
        } else {  
            // Position à droite  
            circle.style.right = `${random(-50, 150)}px`;  
        }

        // Ajouter au conteneur
        container.appendChild(circle);
    }
});