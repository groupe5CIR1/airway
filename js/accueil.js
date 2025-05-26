
/*------------------Animation du titre (Bienvenue chez Arway)--------------------*/


// Attend la fin du loader avant de démarrer l'animation
document.addEventListener('DOMContentLoaded', function() {
    const checkLoader = setInterval(function() {
        if (document.getElementById('main-content') && document.getElementById('main-content').style.display !== 'none') {
            clearInterval(checkLoader);
            initSloganAnimation();
        }
    }, 100);
});

function initSloganAnimation() {
    const sloganElement = document.querySelector('.middle-content h1');
    if (!sloganElement) return;     // Si pas loaded

    // Prépare la structure pour l'animation
    sloganElement.classList.add('animated-slogan');
    const originalText = sloganElement.textContent;
    sloganElement.textContent = ''; // Vide le contenu pour le reconstruire

    // Crée un span pour chaque mot
    const words = originalText.split(' ');
    words.forEach((word, i) => {
        const span = document.createElement('span');
        span.textContent = word;
        span.style.opacity = '0';
        sloganElement.appendChild(span);

        // Ajouter un espace après chaque mot sauf le dernier
        if (i < words.length - 1) {
            sloganElement.appendChild(document.createTextNode(' '));
        }
    });

    // Démarre l'animation
    animateSlogan();
}

function animateSlogan() {
    const spans = document.querySelectorAll('.animated-slogan span');
    if (spans.length === 0) return;     //S'il n'y a pas de texte à animer

    // Réinitialise avant de recommencer
    spans.forEach(span => {
        span.style.opacity = '0';
        span.style.transform = 'translateX(0)';
    });

    let delay = 0;
    
    // Apparition mot par mot
    spans.forEach((span, index) => {
        setTimeout(() => {
            span.style.transition = 'opacity 0.5s ease-out';
            span.style.opacity = '1';

            // Quand tous les mots sont visibles
            if (index === spans.length - 1) {
                setTimeout(() => {
                    // Translation
                    const slogan = document.querySelector('.animated-slogan');
                    slogan.style.transition = 'transform 1s ease-in-out';
                    
                    // Séquence de translation
                    setTimeout(() => slogan.style.transform = 'translateX(30px)', 0);
                    setTimeout(() => slogan.style.transform = 'translateX(-30px)', 1000);
                    setTimeout(() => slogan.style.transform = 'translateX(0)', 2000);

                    // Efface et redémarre
                    setTimeout(() => {
                        spans.forEach(span => {
                            span.style.transition = 'opacity 0.5s ease-out';
                            span.style.opacity = '0';
                        });
                        setTimeout(animateSlogan, 500); // Redémarre après 0.5s
                    }, 3000);
                }, 1000); // Délai après apparition du dernier mot
            }
        }, delay);
        delay += 1000; // 1s entre chaque mot
    });
}

