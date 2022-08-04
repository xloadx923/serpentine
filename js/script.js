
const pos_X = document.getElementById('posX');
const pos_Y = document.getElementById('posY');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

const canva_detail = {
    name: 'canvas',
    color: 'gray',
    width: 600,
    height: 800
}

const snake = {
    color: 'rgb(255,255,255)',
    posX: canvas.width / 2,
    posY: canvas.height / 2,
    width: 5,
    height: 5,
    velocity: 1
}

let direction = 'left';
function serpentine(){
    ctx.beginPath();
    ctx.fillStyle = snake.color;
    ctx.fillRect(snake.posX, snake.posY, snake.width, snake.height);
    ctx.stroke();
    ctx.closePath();
}
function move_snake(){
    pos_X.innerText = snake.posX;
    pos_Y.innerText = snake.posY;
    if(snake.posX < 0) snake.posX = canva_detail.width / 2;
    if(snake.posX > canva_detail.width / 2) snake.posY = 0;
    if(snake.posY < 0) snake.posY = canva_detail.height / 2;
    if(snake.posY > canva_detail.height / 2) snake.posY = 0;

    if(direction == 'left') snake.posX = snake.posX - snake.velocity;
    if(direction == 'right')snake.posX = snake.posX + snake.velocity;
    if(direction == 'up')   snake.posY = snake.posY - snake.velocity;
    if(direction == 'down') snake.posY = snake.posY + snake.velocity;
}

//

function updateScreen(){
    requestAnimationFrame(updateScreen);
    ctx.clearRect(0, 0, canva_detail.width, canva_detail.height);
    serpentine();
    move_snake();
}

document.addEventListener('keydown', (e) => {
    if(e.key == "ArrowLeft"){
        direction = 'left';
    }
    if(e.key == "ArrowRight"){
        direction = 'right';
    }
    if(e.key == "ArrowUp"){
        direction = 'up';
    }
    if(e.key == "ArrowDown"){
        direction = 'down';
    }
    if(e.key == "Enter"){
        updateScreen();
    }
});
updateScreen();

function drawGrid() {
    ctx.canvas.width  = canva_detail.width;
    ctx.canvas.height = canva_detail.height;

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
