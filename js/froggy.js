let jumpCounter = 0;
let score = 0;
let randomNumber = 0;
let sourceDivs = [];
let destDivs = [];

function generateRandomNumber() {
    randomNumber = Math.floor(Math.random() * 10) + 1;
    document.getElementById('randomNumber').innerText = randomNumber;
    jumpCounter = 0;
}

function resetFrogPositions() {
    const frogs = document.querySelectorAll('.frog');
    frogs.forEach(frog => frog.remove());

    sourceDivs.forEach(source => {
        source.style.pointerEvents = 'auto';
        source.style.backgroundImage = 'url(img/1.png)';
    });
}

function resetFrogs() {
    resetFrogPositions();
    generateRandomNumber();
    score = 0;
    document.getElementById('score-value').innerText = score;
    jumpCounter = 0;
}

function updateScore(value) {
    score += value;
    document.getElementById('score-value').innerText = score;
}

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
    frog.style.left = x - 50 + 'px';
    frog.style.top = y - 50 + 'px';
    document.body.appendChild(frog);
    const path = generatePath(source, destination);

    function jump() {
        if (path.length > 0) {
            const point = path.shift();
            const rect = point.getBoundingClientRect();
            const x = rect.left + rect.width / 2;
            const y = rect.top + rect.height / 2;
            frog.style.left = x - 50 + 'px';
            frog.style.top = y - 50 + 'px';
            const imageNumber = 7 - path.length;
            frog.style.backgroundImage = `url(img/${imageNumber}.png)`;
            setTimeout(jump, 50);
        } else {
            const destRect = destination.getBoundingClientRect();
            const x = destRect.left + destRect.width / 2;
            const y = destRect.top + destRect.height / 2;
            frog.style.left = x - 50 + 'px';
            frog.style.top = y - 50 + 'px';
            frog.style.backgroundImage = 'url(img/1.png)';
        }
    }

    jump();

    source.style.backgroundImage = 'none';
    source.style.pointerEvents = 'none';
    jumpCounter++;
}

function fullScreen() {
    const elem = document.getElementById('container');
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    }
}

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

function openRulebook() {
    document.getElementsByClassName('disabler')[0].style.display = 'block';
    rulebook.style.display = 'block';
}

function closeRulebook() {
    document.getElementsByClassName('disabler')[0].style.display = 'none';
    rulebook.style.display = 'none';
}

function timer() {
    let time = 120;
    let timer = setInterval(function () {
        time--;
        document.getElementById('timer-value').innerText = time;
        if (time <= 0) {
            clearInterval(timer);
            document.getElementById('final-score').innerText = score;
            document.getElementsByClassName('disabler')[0].style.display = 'block';
            document.getElementById('gameover').style.display = 'block';
        }
    }, 1000);
}

function initializeGame() {
    sourceDivs = Array.from(document.querySelectorAll('.source-div'));
    destDivs = Array.from(document.querySelectorAll('.destination-div'));

    sourceDivs.forEach((source, index) => {
        source.addEventListener('click', () => frogJump(source, destDivs[index]));
    });

    generateRandomNumber();

    document.getElementById('check').addEventListener('click', () => {
        if (jumpCounter === randomNumber) {
            updateScore(5);
        } else {
            updateScore(-2);
        }
        generateRandomNumber();
        resetFrogPositions();
    });

    document.getElementById('reset').addEventListener('click', resetFrogs);
    const fullScreenButton = document.getElementById('fullscreen');
    fullScreenButton.addEventListener('click', toggleFullScreen);

    const rulebook = document.getElementById('rulebook');
    const gameover = document.getElementById('gameover');
    const rulebookButton = document.getElementById('rules');
    const closeButton = document.getElementById('cancel');
    const playAgainButton = document.getElementById('play-again');

    playAgainButton.addEventListener('click', () => {
        gameover.style.display = 'none';
        document.getElementsByClassName('disabler')[0].style.display = 'none';
        resetFrogs();
        timer();
    });

    rulebookButton.addEventListener('click', openRulebook);
    closeButton.addEventListener('click', closeRulebook);
    timer();
}

initializeGame();
