/*--------------------------Form--------------------------*/

// Attendre la fin du loader
document.addEventListener('DOMContentLoaded', () => {
    const checkLoader = setInterval(() => {
        if (document.getElementById('main-content') && document.getElementById('main-content').style.display !== 'none') {
            clearInterval(checkLoader);
            initFormValidation();
        }
    }, 100);
});

function initFormValidation() {
    // Récupération des données
    const form = document.querySelector('form');
    const submitBtn = form.querySelector('input[type="submit"]');
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    
    // Initialise le bouton (désactivé)
    submitBtn.disabled = true;
    submitBtn.style.opacity = '0.5';
    submitBtn.style.cursor = 'not-allowed';
    
    // Validation (temps réel)
    inputs.forEach(input => {
        input.addEventListener('input', function() {    //Utilisation de function() pour pouvoir utiliser this
            validateField(this);    // this = field
            checkFormValidity();
        });
    });
    
    // Validation à la soumission
    form.addEventListener('submit', (e) => {
        e.preventDefault();     // Empêche l'action et lance le jeu à la place
        if (checkFormValidity()) {
            launchMiniGame();
        }
    });
}

function validateField(field) {
    // Crée/récupère le message d'erreur
    const errorSpan = getErrorElement(field);
    
    // Valide le champ selon son type
    const { isValid, errorMessage } = validateFieldContent(field);
    
    // Met à jour l'affichage
    updateFieldAppearance(field, errorSpan, isValid, errorMessage);
    
    return isValid;
}

function getErrorElement(field) {
    const errorSpanId = `${field.id}-error`;
    let errorSpan = document.getElementById(errorSpanId);
    
    if (!errorSpan) {
        errorSpan = document.createElement('span');
        errorSpan.id = errorSpanId;
        errorSpan.className = 'error-message';
        field.parentNode.appendChild(errorSpan);
    }
    
    return errorSpan;
}

function validateFieldContent(field) {
    const value = field.value.trim();
    switch(field.id) {
        case 'lastname': return validateName(value, 'Nom');
        case 'name': return validateName(value, 'Prénom');
        case 'email': return validateEmail(value);
        case 'comments': return validateComments(value);
        default: return { isValid: true, errorMessage: '' };
    }
}

function validateName(value, fieldType) {
    if (!value) {       // S'il n'y a pas de valeur
        return {
            isValid: false,
            errorMessage: `Le ${fieldType.toLowerCase()} est requis`
        };
    }
    if (/\d/.test(value)) {     // Vérifie que le nom ne contient pas de chiffres
        return {
            isValid: false,
            errorMessage: `Le ${fieldType.toLowerCase()} ne doit pas contenir de chiffres`
        };
    }
    if (value.length < 2) {     // Vérifie la longueur minimale
        return {
            isValid: false,
            errorMessage: `Le ${fieldType.toLowerCase()} doit contenir au moins 2 caractères`
        };
    }
    
    return { isValid: true, errorMessage: '' };
}

function validateEmail(value) {
    const atIndex = value.indexOf('@');
    const lastDotIndex = value.lastIndexOf('.');
    
    // Conditions de validation
    const hasAt = atIndex > 0;
    const hasDotAfterAt = lastDotIndex > atIndex + 1;
    const hasTextAfterDot = lastDotIndex < value.length - 1;
    
    if (!hasAt || !hasDotAfterAt || !hasTextAfterDot) {
        return {
            isValid: false,
            errorMessage: 'Veuillez entrer une adresse email valide (ex: exemple@domaine.com)'
        };
    }
    return { isValid: true, errorMessage: '' };
}

function validateComments(value) {
    if (value.length < 20) {
        return {
            isValid: false,
            errorMessage: 'Le message doit contenir au moins 20 caractères'
        };
    }
    if (value.length > 1000) {
        return {
            isValid: false,
            errorMessage: 'Le message ne doit pas dépasser 1000 caractères'
        };
    }
    return { isValid: true, errorMessage: '' };
}

function updateFieldAppearance(field, errorElement, isValid, errorMessage) {
    if (isValid) {
        field.classList.remove('invalid');
        errorElement.textContent = '';
    } else {
        field.classList.add('invalid');
        errorElement.textContent = errorMessage;
    }
}

function checkFormValidity() {
    const form = document.querySelector('form');
    const inputs = form.querySelectorAll('input[required], textarea[required]');
    let allValid = true;
    
    inputs.forEach(input => {
        const isValid = validateField(input);
        if (!isValid) {
            allValid = false;
        }
    });
    
    // Update button
    const submitBtn = form.querySelector('input[type="submit"]');
    submitBtn.disabled = !allValid;
    submitBtn.style.opacity = allValid ? '1' : '0.5';
    submitBtn.style.cursor = allValid ? 'pointer' : 'not-allowed';
    
    return allValid;
}

/*----------------------------Jeu - Fait par Deepseek-------------------*/

function launchMiniGame() {
    // Modale du jeu
    const modalHTML = `
        <div id="game-modal" class="modal">
            <div class="modal-content">
                <h2>Gagnez pour envoyer votre message!</h2>
                <p>Choisissez un nombre entre 1 et 10 :</p>
                <input type="number" id="guess-input" min="1" max="10">
                <button id="guess-submit">Deviner</button>
                <p id="game-result"></p>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    
    const modal = document.getElementById('game-modal');
    const targetNumber = Math.floor(Math.random() * 10) + 1;
    let attempts = 3;
    
    document.getElementById('guess-submit').addEventListener('click', () => {
        const guess = parseInt(document.getElementById('guess-input').value);
        const resultElement = document.getElementById('game-result');
        
        if (isNaN(guess)) {
            resultElement.textContent = 'Veuillez entrer un nombre valide';
            return;
        }
        
        attempts--;
        
        if (guess === targetNumber) {
            resultElement.textContent = 'Gagné! Votre message a été envoyé.';
            setTimeout(() => {
                modal.remove();
                alert('Votre message a été envoyé avec succès!');
                document.querySelector('form').reset();
            }, 1500);
        } else if (attempts > 0) {
            resultElement.textContent = `Incorrect! Il vous reste ${attempts} essai(s).`;
        } else {
            resultElement.textContent = `Perdu! Le nombre était ${targetNumber}. Le formulaire sera réinitialisé.`;
            setTimeout(() => {
                modal.remove();
                document.querySelector('form').reset();
                checkFormValidity();
            }, 2000);
        }
    });
}

