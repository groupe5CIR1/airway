function noCopy() {
    console.log("“Toute édition d'écrits, de composition musicale, de dessin […] imprimée ou gravée en entier ou en partie au mépris des lois et règlements relatifs à la propriété des auteurs est une contrefaçon et un délit […]” Art. L335-2 du Code de la propriété intellectuelle.")
}

function equipe(){
    if (confirm("Souhaitez-vous continuer ?")) {
        window.open("equipe.html");
    }
}


/*----------------Phone et ringtone-----------------*/

function copyPhoneNumber(phoneNumber) {
    // Formater le numéro pour l'affichage international
    const internationalNumber = '+33' + phoneNumber.substring(1);
    // Copier dans le presse-papier
    navigator.clipboard.writeText(internationalNumber).then( () => {
        // Afficher le prompt
        const userInput = prompt(`Si vous voulez appeler ce numéro: ${internationalNumber}, entrez le de nouveau dans le champ ci-dessous puis validez`, "");
        if (userInput === internationalNumber) {
            console.log(`Vous appelez ce numéro: ${internationalNumber}`);
            playRingtone();
        }
    });
}

function playRingtone() {
    const audio = new Audio();  // Crée un élément audio
    audio.src = "../totally_spies_ringtone.mp3";
    audio.play().then( () => setTimeout( () => audio.pause(), 5000) );  //joue l'audio pendant 5s
}


/*----------------Heure et Timer-------------------*/

function timer() {
    // Heure
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
}



/*--------------------Main----------------------*/


function main() {
    timer();
}

main();