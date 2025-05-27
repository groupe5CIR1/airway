
/*------------------------------------Grattage---------------------------------------*/

// Attend que le loader ait fini
document.addEventListener('DOMContentLoaded', () => {
    const checkLoader = setInterval(() => {
        if (document.getElementById('main-content') && document.getElementById('main-content').style.display !== 'none') {
            clearInterval(checkLoader);
            initScratchCards();
        }
    }, 100);
});

// Initialise les cartes à gratter
function initScratchCards() {
    setupScratchCard('valentin');
    setupScratchCard('nicolas');
}

function setupScratchCard(name) {
    // Récupère les données pour chaque carte
    const canvas = document.getElementById(`canvas-${name}`);
    const ctx = canvas.getContext('2d');
    const image = document.querySelector(`.image-${name}`);
    
    // Recupere les dimensions de l'image et la met pour le canvas
    canvas.width = image.offsetWidth;
    canvas.height = image.offsetHeight;
    
    // Crée la couche à gratter
    ctx.fillStyle = 'gray';
    ctx.fillRect(0, 0, canvas.width, canvas.height); 
    ctx.globalCompositeOperation = 'destination-out'; // effacer et pas ajouter
    
    const radius = 20;
    
    // Grattage au survol
    canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect(); //pour que la fonction soit sur le canvas et pas sur la page
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    });

    // Support tactile pour telephone
    canvas.addEventListener('touchmove', (e) => {
        e.preventDefault(); // eviter les touchs indesirables
        const rect = canvas.getBoundingClientRect();
        const x = e.touches[0].clientX - rect.left;
        const y = e.touches[0].clientY - rect.top;
        
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
    });
}

