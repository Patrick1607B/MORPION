document.addEventListener('DOMContentLoaded', function () {
    const allCases = document.querySelectorAll('.case');
    let playerOne = [];
    let playerTwo = [];
    const inputNameOne = document.getElementById("name-1");
    const inputNameTwo = document.getElementById("name-2");
    const formWinner = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    const submitButton = document.getElementById('player-form');
    const playerStart = document.querySelector('#player-start');
    const playerRestart = document.querySelector('#player-restart');

    let playerOneName = "";
    let playerTwoName = "";
    let randomPlayer;

    // Événement de soumission du formulaire
    if (submitButton) {
        submitButton.addEventListener('submit', function (e) {
            e.preventDefault();

            playerOneName = inputNameOne.value.trim();
            playerTwoName = inputNameTwo.value.trim();

            if (playerOneName && playerTwoName) {
                startGame();
                inputNameOne.style.display = 'none';
                inputNameTwo.style.display = 'none';
                submitButton.style.display = 'none';
            } else {
                alert("Veuillez entrer les noms des deux joueurs.");
            }
        });
    }

    function startGame() {
        randomPlayer = getRandomInt(2);
        updatePlayerStart();
        enableClicks();
        playerRestart.style.display = 'none';
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    function updatePlayerStart() {
        if (randomPlayer === 0) {
            playerStart.innerHTML = `${playerOneName} commence avec "X"`;
        } else {
            playerStart.innerHTML = `${playerTwoName} commence avec "O"`;
        }
    }

    function checkWinner(playerMoves) {
        const winningCombination = formWinner.find((combination) =>
            combination.every((index) => playerMoves.includes(index))
        );
        if (winningCombination) {
            winningCombination.forEach((index) => {
                allCases[index].classList.add("won");
            });
            return true;
        }
        return false;
    }

    const handleClick = (event) => {
        const clickedCase = event.target;
        const caseIndex = Array.from(allCases).indexOf(clickedCase);

        if (!clickedCase.innerHTML) {
            if (randomPlayer === 0) {
                clickedCase.innerHTML = "X";
                playerOne.push(caseIndex);
                if (checkWinner(playerOne)) {
                    playerStart.innerHTML = `${playerOneName} a gagné !`;
                    playerRestart.style.display = 'block';
                    disableClicks();
                } else {
                    playerStart.innerHTML = `C'est à ${playerTwoName} de jouer.`;
                    randomPlayer = 1;
                }
            } else {
                clickedCase.innerHTML = "O";
                playerTwo.push(caseIndex);
                if (checkWinner(playerTwo)) {
                    playerStart.innerHTML = `${playerTwoName} a gagné !`;
                    playerRestart.style.display = 'block';
                    disableClicks();
                } else {
                    playerStart.innerHTML = `C'est à ${playerOneName} de jouer.`;
                    randomPlayer = 0;
                }
            }
        }
    };

    function enableClicks() {
        allCases.forEach((caseElement) => {
            caseElement.addEventListener('click', handleClick);
        });
    }

    function disableClicks() {
        allCases.forEach((caseElement) => {
            caseElement.removeEventListener('click', handleClick);
        });
    }

    playerRestart.addEventListener('click', function () {
        restartGame();
    });

    function restartGame() {
        allCases.forEach((caseElement) => {
            caseElement.innerHTML = ""; // Vide chaque case
        });

        playerOne = [];
        playerTwo = [];
        randomPlayer = getRandomInt(2);
        updatePlayerStart();
        enableClicks();
        playerRestart.style.display = 'none';
    }
});
