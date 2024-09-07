const allCases = document.querySelectorAll('.case');  // Sélectionne toutes les cases
const playerOne = "";
const playerTwo = "";
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
const form = document.querySelector('form');

form.addEventListener('submit', (event) => {
    // Empêche le formulaire de se soumettre normalement (page ne se recharge pas)
    event.preventDefault();

    // Récupère les valeurs des champs
    const name = document.getElementById('name').value;

    // console.log('Nom:', name);
});

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }
  
  let randomPlayer = getRandomInt(2);
//   console.log(randomPlayer);
  // Expected output: 0, 1 or 2

// Fonction flèche qui s'exécute au clic et identifie la case cliquée
const handleClick = (event) => {
    const clickedCase = event.target;  // Récupère l'élément sur lequel on a cliqué
    const caseIndex = Array.from(allCases).indexOf(clickedCase) + 1;  // Trouve l'index de la case cliquée
    console.log(`Vous avez cliqué sur la case ${caseIndex}`);
    console.log(caseIndex);
    console.log(clickedCase, "clickedcase");
    clickedCase.innerHTML = "X";
};

// Ajoute un écouteur de clic à chaque case
allCases.forEach(caseElement => {
    caseElement.addEventListener('click', handleClick);
    
});

