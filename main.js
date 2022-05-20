const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;

canvas.width = innerWidth;
canvas.height = innerHeight;

class Player1 {
    constructor() {
        this.velocity ={
            x: 0,
            y: 0
        }

        const image = new Image();
        image.src = './assets/images/player.png'
        image.onload = () => {
            const scale = .3;
            this.image = image;
            this.width = image.width * scale;
            this.height = image.height * scale;
            this.position ={
                x: canvas.width * 0 + 20,
                y: canvas.height / 2 - this.height / 2
            };
        }
    }

    draw(){
        ctx.save();

        ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
        ctx.restore();
    }
    
    update(){
        if (this.image) {
            this.draw()
            this.position.y += this.velocity.y
        }
    }
}

class Player2 {
    constructor() {
        this.velocity ={
            x: 0,
            y: 0
        }

        const image = new Image();
        image.src = './assets/images/player.png'
        image.onload = () => {
            const scale = .3;
            this.image = image;
            this.width = image.width * scale;
            this.height = image.height * scale;
            this.position ={
                x: canvas.width - this.width - 20,
                y: canvas.height / 2 - this.height / 2
            };
        }
    }

    draw(){
        ctx.save();

        ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
        ctx.restore();
    }
    
    update(){
        if (this.image) {
            this.draw()
            this.position.y += this.velocity.y
        }
    }
}

class Ball {
    constructor() {
        this.velocity ={
            x: 0,
            y: 0
        }

        const image = new Image();
        image.src = './assets/images/ball.png'
        image.onload = () => {
            const scale = .1;
            this.image = image;
            this.width = image.width * scale;
            this.height = image.height * scale;
            this.position ={
                x: canvas.width / 2,
                y: canvas.height / 2
            };
        }
    }

    draw(){
        ctx.save();

        ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        );
        ctx.restore();
    }
    
    update(){
        if (this.image) {
            this.draw()
            this.position.y += this.velocity.y
            this.position.x += this.velocity.x
        }
    }
}


const player1 = new Player1();
const player2 = new Player2();
const ball = new Ball();

// Collision w/ Player1
if (
    ball.y < player1.x + player1.width &&
    ball.y < player1.y &&
    ball.y + player1.height
){
    console.log("Collision with player 1")
}

function animate(){
    requestAnimationFrame(animate);
    ctx.fillStyle = '#fa9e57';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    player1.update();
    player2.update();
    ball.update();

    //Speed players move at
    var speedVelocity = 7;

    // Player 1 movement
    if (keys.w.pressed && player1.position.y >= 0){
        player1.velocity.y = -speedVelocity
    } else if (keys.s.pressed && player1.position.y + player1.height <= canvas.height){
        player1.velocity.y = speedVelocity
    }else {
        player1.velocity.y = 0
    }

    // Player 2 movement
    if (keys.ArrowUp.pressed && player2.position.y >= 0){
        player2.velocity.y = -speedVelocity
    } else if (keys.ArrowDown.pressed && player2.position.y + player2.height <= canvas.height){
        player2.velocity.y = speedVelocity
    }else {
        player2.velocity.y = 0
    }
}

animate()