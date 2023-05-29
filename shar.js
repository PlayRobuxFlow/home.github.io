<meta charset="UTF-8"></meta>
document.addEventListener("DOMContentLoaded", function() {
    const balloon = document.getElementById("balloon");
    const gameContainer = document.getElementById("game-container");
    const scoreDisplay = document.getElementById("score");

    let score = 0;
    let isGameOver = false;

    function moveBalloon(event) {
        if (!isGameOver) {
            let mouseX;
            if (event.type === "touchmove") {
                mouseX = event.touches[0].clientX;
            } else {
                mouseX = event.clientX;
            }
    
            const containerRect = gameContainer.getBoundingClientRect();
            const containerWidth = gameContainer.offsetWidth;
            const balloonWidth = balloon.offsetWidth;
            const maxBalloonX = containerWidth - balloonWidth;
    
            let newX = Math.min(Math.max(mouseX - balloonWidth / 2, 0), maxBalloonX);
            balloon.style.left = newX + "px";
        }
    }
    
    gameContainer.addEventListener("mousemove", moveBalloon);
    gameContainer.addEventListener("touchmove", moveBalloon);
    

    function checkCollision() {
        const blocks = document.getElementsByClassName("block");
        const balloonRect = balloon.getBoundingClientRect();

        for (let i = 0; i < blocks.length; i++) {
            const blockRect = blocks[i].getBoundingClientRect();
            if (
                balloonRect.top < blockRect.bottom &&
                balloonRect.bottom > blockRect.top &&
                balloonRect.left < blockRect.right &&
                balloonRect.right > blockRect.left
            ) {
                gameOver();
                break;
            }
        }
    }

    function addBlock() {
        if (!isGameOver) {
            const block = document.createElement("div");
            block.className = "block";
            block.style.left = Math.random() * (gameContainer.offsetWidth - block.offsetWidth) + "px";
            gameContainer.appendChild(block);
        }
    }

    function updateScore() {
        score++;
        scoreDisplay.innerText = score;

        // Обновляем общий баланс
        const currentBalance = parseInt(localStorage.getItem("snakeBalance")) || 0;
        const updatedBalance = currentBalance + 1;
        localStorage.setItem("snakeBalance", updatedBalance);

        // Обновляем баланс на странице баланса
        const balanceValue = parent.window.document.getElementById("balance-value");
        if (balanceValue) {
            balanceValue.innerText = updatedBalance;
        }
    }

    function gameOver() {
        isGameOver = true;
        alert("Игра окончена. Ваш счет: " + score);
        // Здесь вы можете выполнить логику для добавления очков к общему балансу игры
    }

    setInterval(addBlock, 2000);
    setInterval(checkCollision, 10);
    gameContainer.addEventListener("mousemove", moveBalloon);
    setInterval(updateScore, 1000);
});
function resizeGameContainer() {
    gameContainer.style.width = window.innerWidth + "px";
    gameContainer.style.height = window.innerHeight + "px";
}

window.addEventListener("resize", resizeGameContainer);
resizeGameContainer(); // Вызовите функцию один раз при загрузке, чтобы установить начальные размеры