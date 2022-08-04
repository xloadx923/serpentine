const snake = ["👀","⬛️"];
const pos_X = document.getElementById('posX');
const pos_Y = document.getElementById('posY');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const canva_detail = {
    name: 'canvas',
    color: 'gray',
    CANVA_WIDTH: 600,
    CANVA_HEIGHT: 800
}

const snake_detail = {
    SNAKE_HEAD: snake[0],
    color: 'rgb(255,255,255)',
    posX: canva_detail.CANVA_WIDTH / 2,
    posY: canva_detail.CANVA_HEIGHT / 2,
    SNAKE_WIDTH: 10,
    SNAKE_HEIGHT: 10,
    SNAKE_SIZE: 15,
    velocity: 3
}

let direction = 'left';
function serpentine(){
    ctx.beginPath();
    ctx.font = snake_detail.SNAKE_SIZE+'px serif'
    ctx.fillText(snake[0], snake_detail.posX, snake_detail.posY);
    ctx.stroke();
    ctx.closePath();
}
function getRandomNumber(min, max){
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}

// random pour la cible du snake
console.log(getRandomNumber(canva_detail.CANVA_WIDTH, canva_detail.CANVA_HEIGHT));

function move_snake(){
    pos_X.innerText = snake_detail.posX;
    pos_Y.innerText = snake_detail.posY;
    if(snake_detail.posX < 0) snake_detail.posX = canva_detail.CANVA_WIDTH;
    if(snake_detail.posX > canva_detail.CANVA_WIDTH) snake_detail.posX = 0;
    if(snake_detail.posY < 0) snake_detail.posY = canva_detail.CANVA_HEIGHT;
    if(snake_detail.posY > canva_detail.CANVA_HEIGHT) snake_detail.posY = 0;

    if(direction == 'left') snake_detail.posX = snake_detail.posX - snake_detail.velocity;
    if(direction == 'right')snake_detail.posX = snake_detail.posX + snake_detail.velocity;
    if(direction == 'up')   snake_detail.posY = snake_detail.posY - snake_detail.velocity;
    if(direction == 'down') snake_detail.posY = snake_detail.posY + snake_detail.velocity;
}

//

function updateScreen(){
    requestAnimationFrame(updateScreen);
    ctx.clearRect(0, 0, canva_detail.CANVA_HEIGHT, canva_detail.CANVA_HEIGHT);
    serpentine();
    move_snake();
}

document.addEventListener('keydown', (e) => {
    if(e.key == "ArrowLeft")    direction = 'left';
    if(e.key == "ArrowRight")   direction = 'right';
    if(e.key == "ArrowUp")      direction = 'up';
    if(e.key == "ArrowDown")    direction = 'down';
});
updateScreen();

function drawGrid() {
    ctx.canvas.width  = canva_detail.CANVA_HEIGHT;
    ctx.canvas.height = canva_detail.CANVA_HEIGHT;

    const data = '<svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg"> \
        <defs> \
        <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse"> \
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="white" stroke-width="1" /> \
        </pattern> \
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse"> \
                <rect width="80" height="80" fill="url(#smallGrid)" /> \
                <path d="M 80 0 L 0 0 0 80" fill="none" stroke="black" stroke-width="1" /> \
            </pattern> \
        </defs> \
        <rect width="100%" height="100%" fill="url(#smallGrid)" /> \
    </svg>';

    const DOMURL = window.URL || window.webkitURL || window;

    const img = new Image();
    const svg = new Blob([data], {type: 'image/svg+xml;charset=utf-8'});
    const url = DOMURL.createObjectURL(svg);

    img.onload = function () {
      ctx.drawImage(img, 0, 0);
      DOMURL.revokeObjectURL(url);
    }
    img.src = url;
}
