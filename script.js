document.addEventListener('DOMContentLoaded', function() {
    // Gestion du basculement jour/nuit
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const logo = document.querySelector('.logo img');
    const siteName = document.querySelector('.logo h1');
    
    // Vérifier s'il y a une préférence enregistrée
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'day') {
        body.classList.add('day-mode');
        logo.src = 'images/logo-day.svg';
        siteName.textContent = 'Histoires de Jour';
    }
    
    // Fonction de basculement jour/nuit
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('day-mode');
        
        // Changer le logo et le nom du site
        if (body.classList.contains('day-mode')) {
            logo.src = 'images/logo-day.svg';
            siteName.textContent = 'Histoires de Jour';
            localStorage.setItem('theme', 'day');
        } else {
            logo.src = 'images/logo.svg';
            siteName.textContent = 'Histoires de Nuit';
            localStorage.setItem('theme', 'night');
        }
    });
    
    // Gestion des onglets par âge
    const ageTabs = document.querySelectorAll('.age-tab');
    const ageContents = document.querySelectorAll('.age-content');

    ageTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Retirer la classe active de tous les onglets
            ageTabs.forEach(t => t.classList.remove('active'));
            // Ajouter la classe active à l'onglet cliqué
            tab.classList.add('active');

            // Masquer tous les contenus
            ageContents.forEach(content => {
                content.classList.remove('active');
            });

            // Afficher le contenu correspondant à l'onglet
            const ageGroup = tab.getAttribute('data-age');
            const targetContent = document.getElementById(`age-${ageGroup}`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // Animation au défilement
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.story-card, .category-card, .section-title, .hero-content, .hero-image, .newsletter');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight * 0.9) {
                element.classList.add('animate');
            }
        });
    };

    // Ajouter la classe CSS pour l'animation
    const style = document.createElement('style');
    style.textContent = `
        .story-card, .category-card, .section-title, .hero-content, .hero-image, .newsletter {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .animate {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);

    // Appliquer l'animation au chargement initial et au défilement
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Appliquer au chargement initial

    // Gestion du formulaire de newsletter
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Simuler l'envoi du formulaire
                emailInput.value = '';
                
                // Afficher un message de confirmation
                const confirmationMessage = document.createElement('p');
                confirmationMessage.textContent = 'Merci pour votre inscription ! Vous recevrez bientôt nos histoires.';
                confirmationMessage.style.color = '#4cc9f0';
                confirmationMessage.style.fontWeight = 'bold';
                
                const formParent = newsletterForm.parentNode;
                formParent.appendChild(confirmationMessage);
                
                // Faire disparaître le message après 5 secondes
                setTimeout(() => {
                    confirmationMessage.style.opacity = '0';
                    confirmationMessage.style.transition = 'opacity 1s ease';
                    setTimeout(() => {
                        formParent.removeChild(confirmationMessage);
                    }, 1000);
                }, 5000);
            }
        });
    }

    // Créer les contenus pour les autres tranches d'âge
    createAgeGroupContent('6-8', [
        {
            title: 'Alice au Pays des Merveilles',
            category: 'Fantastique • 6-8 ans',
            image: 'images/story6.svg',
            link: 'stories/alice-au-pays-des-merveilles.html'
        },
        {
            title: 'Le Petit Chaperon Rouge',
            category: 'Conte classique • 6-8 ans',
            image: 'images/story7.svg',
            link: 'stories/le-petit-chaperon-rouge.html'
        }
    ]);

    createAgeGroupContent('9-12', [
        {
            title: 'Les Aventures de Tom Sawyer',
            category: 'Aventure • 9-12 ans',
            image: 'images/story8.svg',
            link: 'stories/tom-sawyer.html'
        },
        {
            title: 'Le Magicien d\'Oz',
            category: 'Fantastique • 9-12 ans',
            image: 'images/story9.svg',
            link: 'stories/le-magicien-d-oz.html'
        }
    ]);

    // Fonction pour créer dynamiquement le contenu des tranches d'âge
    function createAgeGroupContent(ageGroup, stories) {
        const container = document.querySelector('.age-groups .container');
        const contentDiv = document.createElement('div');
        contentDiv.className = 'age-content';
        contentDiv.id = `age-${ageGroup}`;

        const storiesGrid = document.createElement('div');
        storiesGrid.className = 'stories-grid';

        stories.forEach(story => {
            const storyCard = document.createElement('div');
            storyCard.className = 'story-card';
            storyCard.innerHTML = `
                <div class="story-image">
                    <img src="${story.image}" alt="${story.title}">
                </div>
                <div class="story-content">
                    <h3>${story.title}</h3>
                    <p class="story-category">${story.category}</p>
                    <a href="${story.link}" class="btn-secondary">Lire l'histoire</a>
                </div>
            `;
            storiesGrid.appendChild(storyCard);
        });

        contentDiv.appendChild(storiesGrid);
        container.appendChild(contentDiv);
    }

    // Effet de survol pour les cartes d'histoires
    const storyCards = document.querySelectorAll('.story-card');
    storyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.3)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
            this.style.boxShadow = '';
        });
    });

    // Navigation fluide
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                e.preventDefault();
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 100,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});