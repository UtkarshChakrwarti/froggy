// Filename: app.js
// Author: Utkarsh Chakrwarti
// Date: 15-07-2023
// Description: App.js file for HTML5 Game Development named "Froggy : The Computerer"


//loader logic for the game
setTimeout(function () {
    //select the loader-wrapper div with the class of .loader-wrapper, and change the class to .loader-wrapper .loaded
    document.querySelector('.loader-wrapper').classList.add('loaded');
    console.log("Froggy : loaded");
}, 1500);

//fullscreen toogle logic
const fullScreenButton = document.getElementById('fullscreen');
fullScreenButton.addEventListener('click', toggleFullScreen);
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}


//play button logic
const playButton = document.getElementById('play');
playButton.addEventListener('click', playGame);
function playGame() {
    document.getElementById('game-screen').style.display = 'block';
    document.getElementById('frog-loc').style.display = 'block';
    document.getElementById('score-value').innerHTML = 0;
    document.getElementById('timer-value').innerHTML = 120;
    timer = setInterval(function () {
        var time = document.getElementById('timer-value');
        time.innerHTML = parseInt(time.innerHTML) - 1;
        if (parseInt(time.innerHTML) == 0) {
            clearInterval(timer);
            document.getElementById('game-over').style.display = 'block';
            document.getElementById('frog-loc').style.display = 'none';
        }
    }
        , 1000);
}

//replay button logic
const resetButton = document.getElementById('replay');
resetButton.addEventListener('click', resetGame);
function resetGame() {
    document.getElementById('game-over').style.display = 'none';
    document.getElementById('frog-loc').style.display = 'block';
    document.getElementById('score-value').innerHTML = 0;
    document.getElementById('timer-value').innerHTML = 120;
    timer = setInterval(function () {
        var time = document.getElementById('timer-value');
        time.innerHTML = parseInt(time.innerHTML) - 1;
        if (parseInt(time.innerHTML) == 0) {
            clearInterval(timer);
            document.getElementById('game-over').style.display = 'block';
            document.getElementById('frog-loc').style.display = 'none';
        }
    }
        , 1000);
}

//play again button logic
const playAgainButton = document.getElementById('play-again');
playAgainButton.addEventListener('click', playAgain);
function playAgain() {
    document.getElementById('game-over').style.display = 'none';
    document.getElementById('frog-loc').style.display = 'block';
    document.getElementById('score-value').innerHTML = 0;
    document.getElementById('timer-value').innerHTML = 120;
    timer = setInterval(function () {
        var time = document.getElementById('timer-value');
        time.innerHTML = parseInt(time.innerHTML) - 1;
        if (parseInt(time.innerHTML) == 0) {
            clearInterval(timer);
            document.getElementById('game-over').style.display = 'block';
            document.getElementById('frog-loc').style.display = 'none';
        }
    }
        , 1000);
}

//game engine logic
let jumpCounter = 0;
let score = 0;
let randomNumber = 0;
let sourceDivs = [];
let destDivs = [];

function generatePath(source, destination) {
    const sourceRect = source.getBoundingClientRect();
    const destRect = destination.getBoundingClientRect();

    const x1 = sourceRect.left + sourceRect.width / 2;
    const y1 = sourceRect.top + sourceRect.height / 2;

    const x2 = destRect.left + destRect.width / 2;
    const y2 = destRect.top + destRect.height / 2;

    const dx = x2 - x1;
    const dy = y2 - y1;

    const distance = Math.sqrt(dx * dx + dy * dy);
    const step = distance / 5; // Divide path into 5 parts

    const angle = Math.atan2(dy, dx);
    const curveAmount = step / 2;

    const pathPoints = [];

    for (let i = 1; i <= 5; i++) {
        const t = i / 6;
        const xt = x1 + dx * t;
        const yt = y1 + dy * t - curveAmount * Math.sin(Math.PI * t);

        const point = document.createElement('div');
        point.className = 'path-point';
        point.style.left = xt + 'px';
        point.style.top = yt + 'px';

        document.body.appendChild(point);
        pathPoints.push(point);
    }

    return pathPoints;
}

function frogJump(source, destination) {
    const frog = document.createElement('div');
    frog.className = 'frog';

    const sourceRect = source.getBoundingClientRect();
    const x = sourceRect.left + sourceRect.width / 2;
    const y = sourceRect.top + sourceRect.height / 2;

    frog.style.left = (x - 50) + 'px';
    frog.style.top = (y - 50) + 'px';
    frog.style.zIndex = 1000;

    document.body.appendChild(frog);

    const path = generatePath(source, destination);

    function jump() {
        if (path.length > 0) {
            const point = path.shift();
            const rect = point.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;

            frog.style.left = (x - 50) + 'px';
            frog.style.top = (y - 50) + 'px';

            const imageNumber = 7 - path.length;
            frog.style.backgroundImage = `url(images/${imageNumber}.png)`;
            frog.style.zIndex = 9999;
            setTimeout(jump, 50);
        } else {
            const destRect = destination.getBoundingClientRect();
            const x = destRect.left + destRect.width / 2;
            const y = destRect.top + destRect.height / 2;

            frog.style.left = (x - 50) + 'px';
            frog.style.top = (y - 50) + 'px';
            frog.style.zIndex = 1000;
            frog.style.backgroundImage = 'url(images/1.png)';
        }
    }

    jump();

    source.style.backgroundImage = 'none';
    source.style.pointerEvents = 'none';
    // jumpCounter++;
    //document.getElementById('jumpCount').innerText = 'Jump Count: ' + jumpCounter;
}








function initializeGame() {
    sourceDivs = Array.from(document.querySelectorAll('.source-div'));
    destDivs = Array.from(document.querySelectorAll('.destination-div'));

    sourceDivs.forEach((source, index) => {
        source.addEventListener('click', function () {
            frogJump(source, destDivs[index]);
        });
    });

    // generateRandomNumber();

    // document.getElementById('check').addEventListener('click', validateJumpCount);
    // document.getElementById('replay').addEventListener('click', resetFrogs);
}

initializeGame();
