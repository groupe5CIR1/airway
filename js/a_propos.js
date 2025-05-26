
/*-------------------------------Modales-------------------------------------*/

// Attend la fin du loader
document.addEventListener('DOMContentLoaded', function() {
    const checkLoader = setInterval(function() {
        if (document.getElementById('main-content') && document.getElementById('main-content').style.display !== 'none') {
            clearInterval(checkLoader);
            initMissions();
        }
    }, 100);
});

function initMissions() {
    // Crée la structure de la modale
    const modalHTML = `
        <div id="mission-modal" class="modal">
          <div class="modal-content">
            <span class="close-modal">&times;</span>
            <h2 class="modal-title" id="modal-title"></h2>
            <img class="modal-image" id="modal-image" src="" alt="Image mission">
            <div class="modal-description" id="modal-description"></div>
          </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    // Event listeners pour les clics sur les missions
    document.querySelectorAll('.mission').forEach(mission => mission.addEventListener('click', function() {showMissionModal(this)} ) );

    // Fermeture
    document.querySelector('.close-modal').addEventListener('click', closeModal);
    document.getElementById('mission-modal').addEventListener('click', function(e) {
        if (e.target === this) closeModal();
    });
}

function showMissionModal(missionElement) {
    const modal = document.getElementById('mission-modal');
    
    // Récupére les données
    const imagePath = missionElement.dataset.image;
    const title = missionElement.dataset.modalTitle;
    const description = Array.from(missionElement.querySelectorAll('li')).map(li => li.textContent).join(' ');

    // Limiter à 150 caractères
    const shortDesc = description.length > 150 ? description.substring(0, 150) + '...' : description;

    // Remplit la modale
    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-image').src = imagePath;
    document.getElementById('modal-image').alt = title;
    document.getElementById('modal-description').textContent = shortDesc;

    // Affiche la modale
    modal.style.display = 'block';
}

function closeModal() {
    document.getElementById('mission-modal').style.display = 'none';
}
