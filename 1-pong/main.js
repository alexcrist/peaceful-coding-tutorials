// Scores
let humanScore = 0;
let computerScore = 0;
const humanScoreElement = document.querySelector("#human-score");
const computerScoreElement = document.querySelector("#computer-score");

// Ball
const ballSize = 50;
const ballPosition = { x: 100, y: 100 };
const ballVelocity = { x: 2.5, y: 2.5 };
const ballAcceleration = 0.5;
const ballElement = document.querySelector("#ball");

// Human paddle
const humanPaddleHeight = 200;
const humanPaddleWidth = 25;
const humanPaddlePosition = { y: 0 };
const humanPaddleSpeed = 30;
const humanPaddleElement = document.querySelector("#human-paddle");
document.addEventListener("keydown", (event) => {
    if (event.code === "ArrowUp") {
        humanPaddlePosition.y -= humanPaddleSpeed;
    } else if (event.code === "ArrowDown") {
        humanPaddlePosition.y += humanPaddleSpeed;
    }
});

// Computer paddle
const computerPaddleHeight = 200;
const computerPaddleWidth = 25;
const computerPaddlePosition = { y: 0 };
const computerPaddleSpeed = 3;
const computerPaddleElement = document.querySelector("#computer-paddle");

const updateBall = () => {
    ballPosition.x += ballVelocity.x;
    ballPosition.y += ballVelocity.y;

    // Bounce ball off human paddle
    if (
        ballPosition.x < humanPaddleWidth &&
        ballPosition.y + ballSize > humanPaddlePosition.y &&
        ballPosition.y < humanPaddlePosition.y + humanPaddleHeight
    )  {
        ballVelocity.x = Math.abs(ballVelocity.x);
        increaseBallSpeed();
    }

    // Bounce ball off computer paddle
    if (
        (ballPosition.x + ballSize) > (window.innerWidth - computerPaddleWidth) &&
        ballPosition.y + ballSize > computerPaddlePosition.y &&
        ballPosition.y < computerPaddlePosition.y + computerPaddleHeight
    )  {
        ballVelocity.x = -Math.abs(ballVelocity.x);
        increaseBallSpeed();
    }

    // Bounce ball off window sides
    if (ballPosition.y < 0) {
        ballVelocity.y = Math.abs(ballVelocity.y);
        increaseBallSpeed();
    }
    if (ballPosition.y > (window.innerHeight - ballSize)) {
        ballVelocity.y = -Math.abs(ballVelocity.y);
        increaseBallSpeed();
    }
    if (ballPosition.x < 0) {
        ballVelocity.x = Math.abs(ballVelocity.x);
        computerScore++;
        increaseBallSpeed();
    }
    if (ballPosition.x > (window.innerWidth - ballSize)) {
        ballVelocity.x = -Math.abs(ballVelocity.x);
        humanScore++;
        increaseBallSpeed();
    }

    ballElement.style.left = `${ballPosition.x}px`;
    ballElement.style.top = `${ballPosition.y}px`;
};

const increaseBallSpeed = () => {
    if (ballVelocity.x > 0) {
        ballVelocity.x += ballAcceleration;
    } else {
        ballVelocity.x -= ballAcceleration;
    }
    if (ballVelocity.y > 0) {
        ballVelocity.y += ballAcceleration;
    } else {
        ballVelocity.y -= ballAcceleration;
    }
}

const updateHumanPaddle = () => {
    humanPaddleElement.style.top = `${humanPaddlePosition.y}px`;
};

const updateComputerPaddle = () => {
    const ballPositionCenterY = ballPosition.y + (ballSize / 2);
    const computerPaddlePositionCenterY = computerPaddlePosition.y + (computerPaddleHeight / 2);
    const isBallBelowComputerPaddle = ballPositionCenterY > computerPaddlePositionCenterY;
    if (isBallBelowComputerPaddle) {
        computerPaddlePosition.y += computerPaddleSpeed;
    } else {
        computerPaddlePosition.y -= computerPaddleSpeed;
    }
    computerPaddleElement.style.top = `${computerPaddlePosition.y}px`;
};

const updateScores = () => {
    humanScoreElement.innerText = humanScore;
    computerScoreElement.innerText = computerScore;
};

const updateWorld = () => {
    updateBall();
    updateHumanPaddle();
    updateComputerPaddle();
    updateScores();
    requestAnimationFrame(updateWorld);
};

updateWorld();
