//html要素の取得
const canvas = document.getElementById("canvas");
const canvasContext = canvas.getContext('2d');
const cwidth = document.getElementById("currentwidth");
const cheight = document.getElementById("currentheight");



//ステージ系g変数
let gStageWidth = canvas.width = 600;
let gStageHeight = canvas.height = 600;
const gPlayersize = 20;
let gStageSize = Math.floor((gStageWidth * gStageHeight) / (gPlayersize * gPlayersize));

const sx = Math.floor(gStageWidth / gPlayersize);//列数
const sy = Math.floor(gStageHeight / gPlayersize);//行数

//アイコンたち
const plogo = "@";
const wall = "#";
const goal = "X";
const yuka = ".";
const enemy = "&";


/*
    難易度(0~100)
    数字が大きいほど壁が少なくなります
    100で壁0
    0ですべて壁になります

*/
const difficulty = 80;

//ステージ格納配列
let gStage = new Array(gStageSize).fill("");


window.onload = () => {
    gamestart();

}

function gamestart() {
    initialize(canvas.width, canvas.height);
    draw();
}


//初期化
function initialize(width, height) {
    createRect(0, 0, width, height, "black");
    createStage();
}


function show() {
    update();//更新
    draw();//描画
}

function update() {
    canvasContext.clearRect(0, 0, canvas.width, canvas.height);
    player.move();
}

function checkHitWall() {
    if (gStage[player.position - 1] == "#" && player.rotateX == -1) { //左
        player.rotateX = 0;
    }
    if (gStage[player.position + 1] == "#" && player.rotateX == 1) {//右
        player.rotateX = 0;
    }

    if (gStage[player.position - sx] == "#" && player.rotateY == -1) {//上
        player.rotateY = 0;
    }

    if (gStage[player.position + sx] == "#" && player.rotateY == 1) {//下
        player.rotateY = 0;
    }

}


function draw() {
    createRect(0, 0, canvas.width, canvas.height, "black");
    createRect(0, 0, canvas.width, canvas.height);


    let x = 0, y = gPlayersize;
    for (let i = 0; i < gStage.length; i++) {
        canvasContext.beginPath();
        canvasContext.font = "20pt Comic Sans MS";

        if (gStage[i] == wall) {
            canvasContext.fillStyle = "green";
            canvasContext.fillText(wall, x, y);
        }

        if (gStage[i] == yuka) {
            canvasContext.fillStyle = "white";
            canvasContext.fillText(yuka, x, y);
        }

        if (gStage[i] == plogo) {
            canvasContext.fillStyle = "red";
            canvasContext.fillText(plogo, x, y);
        }

        if (gStage[i] == goal) {
            canvasContext.fillStyle = "red";
            canvasContext.fillText(goal, x, y);
        }

        if (gStage[i] == enemy) {
            canvasContext.fillStyle = "yellow";
            canvasContext.fillText(enemy, x, y);
        }

        x += gPlayersize;
        if (x == gStageWidth) {
            x = 0;
            y += gPlayersize;
        }

    }

}


function createRect(x, y, width, height, color) {
    canvasContext.fillStyle = color;
    canvasContext.fillRect(x, y, width, height);
}

class Player {
    constructor() {
        this.rotateX = 0;
        this.rotateY = 0;
        this.position = 0;
    }

    move() {
        if (this.rotateX == 1) {
            swap(this.position, "right");
            this.position++;
        } else if (this.rotateX == -1) {
            swap(this.position, "left");
            this.position--;
        } else if (this.rotateY == 1) {
            swap(this.position, "down");
            this.position += sx;
        } else if (this.rotateY == -1) {
            swap(this.position, "up");
            this.position -= sx;
        }
        this.rotateX = 0;
        this.rotateY = 0;
    }

    //周りのブロックの表示
    aroundstatus() {

        console.log(
            "playerposition: " + this.position + "\n" +
            "up: " + gStage[this.position - sx] + "\n" +
            "down: " + gStage[this.position + sx] + "\n" +
            "left: " + gStage[this.position - 1] + "\n" +
            "right: " + gStage[this.position + 1] + "\n"
        )

    }

}


window.addEventListener("keyup", (event) => {

    if (event.key == "a") {//左に移動
        player.rotateX = -1;
        player.rotateY = 0;
    }
    if (event.key == "w") {//上
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

    checkHitWall();//壁かどうかチェック
    show();

});

function createStage() {

    let pflag = false;
    let eflag = false;
    for (let i = 0; i < gStage.length; i++) {

        if (i % sx == 0 || Math.floor(i / sx) == 0 || Math.floor(i / sx) == sy - 1 || (i + 1) % sx == 0) {
            //外周
            gStage[i] = "#";
        } else {

            if (Math.floor(Math.random() * 100) >= difficulty) {
                gStage[i] = wall;
                continue;
            }

            if (!pflag) {
                gStage[i] = plogo;
                pflag = true;
                player.position = i;
                continue;
            }

            if(!eflag && i > sx * (sy-3) + sx-4){
                gStage[i] = enemy;
                eflag = true;
                continue;
            }
            

            gStage[i] = yuka;


        }
    }
}


function swap(pos, d) {


    let temp = gStage[pos];

    switch (d) {
        case "up":
            gStage[pos] = gStage[pos - sx];
            gStage[pos - sx] = temp;
            break;
        case "left":
            gStage[pos] = gStage[pos - 1];
            gStage[pos - 1] = temp;
            break;
        case "right":
            gStage[pos] = gStage[pos + 1];
            gStage[pos + 1] = temp;
            break;
        case "down":
            gStage[pos] = gStage[pos + sx];
            gStage[pos + sx] = temp;
            break;

    }

}




const player = new Player();
