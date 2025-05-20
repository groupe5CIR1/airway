function noCopy() {
    console.log("“Toute édition d'écrits, de composition musicale, de dessin […] imprimée ou gravée en entier ou en partie au mépris des lois et règlements relatifs à la propriété des auteurs est une contrefaçon et un délit […]” Art. L335-2 du Code de la propriété intellectuelle.")
};

function equipe(){
    if (confirm("Souhaitez-vous continuer ?")) {
        window.open("equipe.html");
    };
};

function updateClock() {
    const now = new Date();
    const time = now.toLocaleTimeString('fr-FR');
    document.getElementById('clock').textContent = time;
  }

  // Chronomètre
  let secondsElapsed = 0;
  function updateTimer() {
    secondsElapsed++;
    document.getElementById('timer').textContent = secondsElapsed + 's';
  }

  // Démarrage
  updateClock();
  setInterval(updateClock, 1000); // met à jour chaque seconde
  setInterval(updateTimer, 1000); // incrémente chaque seconde