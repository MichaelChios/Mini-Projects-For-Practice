const moves = document.getElementById('moves-count');
const timeValue = document.getElementById('time');
const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const gameContainer = document.querySelector('.game-container');
const result = document.getElementById('result');
const controls = document.querySelector('.controls-container');
let cards;
let interval;
let firstCard = false;
let secondCard = false;

// Items array
const items = [{name: "butterfly", img: "images/butterfly.png"},
               {name: "cat", img: "images/cat.png"},
               {name: "dog", img: "images/dog.png"},
               {name: "elephant", img: "images/elephant.png"},
               {name: "fish", img: "images/fish.png"},
               {name: "frog", img: "images/frog.png"},
               {name: "horse", img: "images/horse.png"},
               {name: "lion", img: "images/lion.png"}, 
               {name: "monkey", img: "images/monkey.png"}
            ];

// Initial time
let seconds = 0;
let minutes = 0;

// Moves and wins
let movesCount = 0;
let wins = 0;

// Timer
const timeGenerator = () => {
    seconds++;
    if (seconds>=60) {
        seconds = 0;
        minutes++;
    }
    // Format time before display
    let secondsValue = seconds < 10 ? `0${seconds}` : seconds;  // If seconds < 10, add 0 before seconds
    let minutesValue = minutes < 10 ? `0${minutes}` : minutes;  // If minutes < 10, add 0 before minutes
    timeValue.innerHTML = '<span>Time: </span>' + minutesValue + ':' + secondsValue;
};

const movesCounter = () => {
    movesCount++;
    moves.innerHTML = '<span>Moves: </span>' + movesCount;
};

const generateRandom = (size = 4) => {
    // Temporary array
    let tempArray = [...items];
    // Initialize cardValues array
    let cardValues = [];
    size = (size * size) / 2;
    // Random object selection
    for (let i = 0; i < size; i++) {
        let randomIndex = Math.floor(Math.random() * tempArray.length);
        let randomObject = tempArray[randomIndex];
        cardValues.push(randomObject);
        tempArray.splice(randomIndex, 1);   // Remove selected object from tempArray
    }
    return cardValues;
};

const matrixGenerator = (cardValues, size = 4) => {
    cardValues = [...cardValues, ...cardValues];    // Duplicate cardValues array
    gameContainer.innerHTML = "";   // Clear gameContainer
    // Simple shuffle
    cardValues.sort(() => Math.random() - 0.5);
    for(let i = 0; i < size*size; i++){
        gameContainer.innerHTML += `
            <div class="card-container" data-card-value="${cardValues[i].name}">
                <div class="card-before">?</div>
                <div class="card-after">
                    <img src="${cardValues[i].img}" class="image"/>
                </div>
            </div>
            `;
    }
    gameContainer.style.gridTemplateColumns = `repeat(${size}, auto)`;

    // Cards
    cards = document.querySelectorAll('.card-container');
    cards.forEach((card) => {
        card.addEventListener('click', () => {
            if (!card.classList.contains("matched")){
                card.classList.add('flipped');
                if (!firstCard) {
                    firstCard = card;
                    firstCardValue = firstCard.getAttribute('data-card-value');
                }
                else{
                    movesCounter();
                    secondCard = card;
                    let secondCardValue = secondCard.getAttribute('data-card-value');
                    if (firstCardValue == secondCardValue) {
                        firstCard.classList.add('matched');
                        secondCard.classList.add('matched');
                        firstCard = false;
                        winCount++;
                        if (winCount == Math.floor(cardValues.length/2)) {
                            result.innerHTML = `<h2> You won! </h2>
                            <h4>Moves: ${movesCount}</h4>`;
                            stopGame();
                        }
                    }
                    else {
                        let [tempFirst, tempSecond] = [firstCard, secondCard];
                        firstCard = false;
                        secondCard = false;
                        let delay = setTimeout(() => {
                            tempFirst.classList.remove('flipped');
                            tempSecond.classList.remove('flipped');
                        }, 1000);
                    }
                }
            }
        });
    });
};

// Start game
startButton.addEventListener('click', () => {
    movesCount = 0;
    time = 0;
    controls.classList.add('hide');
    stopButton.classList.remove('hide');
    startButton.classList.add('hide');
    interval = setInterval(timeGenerator, 1000);
    moves.innerHTML = '<span>Moves: </span>' + movesCount;
    initializer();
});

// Stop game
stopButton.addEventListener('click', (stopGame = () => {
    controls.classList.remove('hide');
    stopButton.classList.add('hide');
    startButton.classList.remove('hide');
    clearInterval(interval);
    })
);

// Initialize values and func calls
const initializer = () => {
    result.innerText = "";
    winCount = 0;
    let cardValues = generateRandom();
    console.log(cardValues);
    matrixGenerator(cardValues);
};