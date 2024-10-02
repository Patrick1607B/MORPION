window.onload = function() {
    const allCases = document.querySelectorAll('.case');  // Sélectionne toutes les cases
    let playerOne = [];  // Indices des cases jouées par le joueur 1
    let playerTwo = [];  // Indices des cases jouées par le joueur 2
    const formWinner = [
        [0, 1, 2], // Ligne 1
        [3, 4, 5], // Ligne 2
        [6, 7, 8], // Ligne 3
        [0, 3, 6], // Colonne 1
        [1, 4, 7], // Colonne 2
        [2, 5, 8], // Colonne 3
        [0, 4, 8], // Diagonale principale
        [2, 4, 6]  // Diagonale secondaire
    ];
    const playerStart = document.querySelector('#player-start');
    const playerRestart = document.querySelector('#player-restart');  // Bouton de restart

    // Génère un nombre aléatoire pour choisir un joueur
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    let randomPlayer = getRandomInt(2);

    function updatePlayerStart() {
        if (randomPlayer === 0) {
            playerStart.innerHTML = "Joueur X commence";
        } else {
            playerStart.innerHTML = "Joueur O commence";
        }
    }

    updatePlayerStart();

    // Fonction qui vérifie si un joueur a gagné
    function checkWinner(playerMoves) {
        return formWinner.some(combination => 
            combination.every(index => playerMoves.includes(index))
        );       
    }

    // Fonction qui s'exécute au clic sur une case
    const handleClick = (event) => {
        const clickedCase = event.target;
        const caseIndex = Array.from(allCases).indexOf(clickedCase);

        if (!clickedCase.innerHTML) {
            if (randomPlayer === 0) {
                clickedCase.innerHTML = "X";
                playerOne.push(caseIndex);
                if (checkWinner(playerOne)) {
                    playerStart.innerHTML = "Joueur X a gagné !";
                    playerRestart.style.display = 'block';
                    disableClicks();
                } else {
                    playerStart.innerHTML = "À joueur O de jouer";
                    randomPlayer = 1;
                }
            } else {
                clickedCase.innerHTML = "O";
                playerTwo.push(caseIndex);
                if (checkWinner(playerTwo)) {
                    playerStart.innerHTML = "Joueur O a gagné !";
                    playerRestart.style.display = 'block';
                    disableClicks();
                } else {
                    playerStart.innerHTML = "À joueur X de jouer";
                    randomPlayer = 0;
                }
            }
        }
    };

    // Ajoute un écouteur de clic à chaque case
    function enableClicks() {
        allCases.forEach(caseElement => {
            caseElement.addEventListener('click', handleClick);
        });
    }

    // Désactiver les clics
    function disableClicks() {
        allCases.forEach(caseElement => {
            caseElement.removeEventListener('click', handleClick);
        });
    }

    // Fonction pour redémarrer le jeu
    function restart() {
        // Réinitialiser les cases
        allCases.forEach(caseElement => {
            caseElement.innerHTML = "";  // Vide chaque case
        });

        // Réinitialiser les coups des joueurs
        playerOne = [];
        playerTwo = [];

        // Choisir un nouveau joueur aléatoire pour recommencer
        randomPlayer = getRandomInt(2);

        // Mettre à jour l'affichage du joueur qui commence
        updatePlayerStart();

        // Réactiver les clics sur les cases
        enableClicks();

        // Cacher le bouton restart
        playerRestart.style.display = 'none';
    }

    // Ajoute l'événement de clic pour le bouton de redémarrage
    playerRestart.addEventListener('click', restart);

    // Activer les clics au démarrage
    enableClicks();
};



 