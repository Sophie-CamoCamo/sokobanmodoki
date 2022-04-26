const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext('2d');


const gStageWidth = canvas.width;
const gStageheight = canvas.height;
console.log(gStageWidth + " " + gStageheight);
let gInterval = 1000;

window.onload = () => {
    gameLoop();
}

function gameLoop() {
    initialize(canvas.width, canvas.height);
    setInterval(show, gInterval/20);
}



function initialize(width, height) {
    createRect(0, 0, width, height, "black");
    createRect(0, 0, width, height);
}


function show() {
    update();//更新
    draw();//描画
}

function update() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    player.move();
    checkHitWall();
}

function checkHitWall(){
    if(player.x <= 20 && player.rotateX == -1){
        player.rotateX = 0;
    }
    if(player.x >= gStageWidth -40 && player.rotateX == 1){
        player.rotateX = 0;
    }

    if(player.y <= 40 && player.rotateY == -1){
        player.rotateY = 0;
    }

    if(player.y >= gStageheight - 20 && player.rotateY == 1){
        player.rotateY = 0;
    }

  
}


function draw() {
    createRect(0, 0, canvas.width, canvas.height, "black");
    createRect(0, 0, canvas.width, canvas.height);


    let x = 0; y = 0;
    for (let i = 0; i < gStageWidth * gStageheight; i++) {
        if (i % gStageWidth === 0) {
            x = 0;
            y += 20;
        } else {
            canvasContext.beginPath();
            canvasContext.fillStyle = "green";
            canvasContext.font = "20pt Comic Sans MS"
            if (x === 0 || x >= gStageWidth-20|| y == 20 || y >= gStageheight) {
                canvasContext.fillStyle = "green";
                canvasContext.fillText("#", x, y);
            } else {
                canvasContext.fillStyle = "white";
                canvasContext.fillText(".", x,y);

            }
            x += 20;
        }
    }

    console.log("x: " + player.x + "y: " + player.y);

    canvasContext.beginPath();
    canvasContext.fillStyle = "red";
    canvasContext.font = "20pt Comic Sans MS";
    canvasContext.fillText("P", player.x, player.y);

}


function createRect(x, y, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
}

class Player {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;

        this.rotateX = 0;
        this.rotateY = 0;
        this.size = size;
    }

    move() {
        if (this.rotateX == 1) {
            this.x +=this.size;
        } else if (this.rotateX == -1) {
            this.x -= this.size;
        } else if (this.rotateY == 1) {
            this.y += this.size;
        } else if (this.rotateY == -1) {
            this.y -= this.size;
        }
    }

}


window.addEventListener("keypress", (event) => {

        if (event.key == "a") {//左に移動
            player.rotateX = -1;
            player.rotateY = 0;
        }
        if (event.key == "w") {
            //上
            player.rotateX = 0;
            player.rotateY = -1;
        }
        if (event.key == "d") {
            //右
            player.rotateX = 1;
            player.rotateY = 0;
        }
        if (event.key == "s") {
            //下
            player.rotateX = 0;
            player.rotateY = 1;
        }

        checkHitWall();

});

const player = new Player(40, 80, 20);
