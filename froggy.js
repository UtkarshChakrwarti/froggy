
let jumpCounter = 0;
let score = 0;
let randomNumber = 0;
let sourceDivs = [];
let destDivs = [];

function generateRandomNumber() {
  randomNumber = Math.floor(Math.random() * 10) + 1;
  document.getElementById('randomNumber').innerText =  randomNumber;
  jumpCounter = 0;
  
}

function resetFrogPositions() {
  const frogs = document.querySelectorAll('.frog');
  frogs.forEach(frog => {
    frog.remove();
  });

  sourceDivs.forEach(source => {
    source.style.pointerEvents = 'auto';
    source.style.backgroundImage = 'url(1.png)';
  });
}

function resetFrogs() {
  resetFrogPositions();
  generateRandomNumber();
  score = 0;
  document.getElementById('score').innerText = 'Score: ' + score;
  jumpCounter = 0;
  //document.getElementById('jumpCount').innerText = 'Jump Count: ' + jumpCounter;
}

function validateJumpCount() {
  if (jumpCounter === randomNumber) {
    score += 5;
    document.getElementById('score').innerText = 'Score: ' + score;
    generateRandomNumber();
    resetFrogPositions();
  } else {
    score -= 2;
    document.getElementById('score').innerText = 'Score: ' + score;
    generateRandomNumber();
    resetFrogPositions();
  }
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
      frog.style.backgroundImage = `url(${imageNumber}.png)`;

      setTimeout(jump, 50);
    } else {
      const destRect = destination.getBoundingClientRect();
      const x = destRect.left + destRect.width / 2;
      const y = destRect.top + destRect.height / 2;

      frog.style.left = (x - 50) + 'px';
      frog.style.top = (y - 50) + 'px';

      frog.style.backgroundImage = 'url(1.png)';
    }
  }

  jump();

  source.style.backgroundImage = 'none';
  source.style.pointerEvents = 'none';
  jumpCounter++;
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

  generateRandomNumber();

  document.getElementById('check').addEventListener('click', validateJumpCount);
  document.getElementById('reset').addEventListener('click', resetFrogs);
}

    // function timeIntervalToplay()  {
    //     let time = 60;
    //     let timer = setInterval(function() {
    //         time--;
    //         document.getElementById("timer").innerHTML ='Time: '+ time;
    //         if(time <= 0) {
    //             clearInterval(timer);
    //             alert("Game Over");
    //             resetFrogs();
    //         }
    //     }, 1000);
    // }
initializeGame();
