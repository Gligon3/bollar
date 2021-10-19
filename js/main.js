let canvas = document.createElement('canvas');
canvas.setAttribute("id", "bg");
//canvas.setAttribute = "id:"
//let canvas = document.getElementById('bg');
canvas.width  = window.innerWidth;
canvas.height = window.innerHeight;

let ctx = canvas.getContext('2d');

let start = null;

const shield = document.querySelector('#pizza');

const Ball = function(x, y, r) {
    const ball = {};
    ball.x = x;
    ball.y = y;
    ball.r = r;
    ball.velX = random(-5, 5);
    ball.velY = random(-5, 5);
    ball.collide = function(balls) {
        if(this.x - this.r < 0 || this.x + this.r > canvas.width) {
            this.velX = -this.velX;
        }
        if(this.y - this.r < 0 || this.y + this.r > canvas.height) {
            this.velY = -this.velY;
        }
        balls.forEach(element => {
            if(element !== this) {
                let dx = this.x - element.x;
                let dy = this.y - element.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                if(distance < this.r + element.r) {
                    this.velX = -this.velX;
                    this.velY = -this.velY;
                    element.velX = -element.velX;
                    element.velY = -element.velY;
                }
            }
        });
        this.x += this.velX;
        this.y += this.velY;
    }
    ball.draw = function() {
        ctx.drawImage(shield, this.x, this.y);
    };
    return ball;
}

let balls = [];

let i = 0;

while (i < 10) {
    balls.push(Ball(random(0, canvas.width), random(0, canvas.height), 96));
    i++;
}

function step(timestamp) {
    ctx.fillStyle = "#1c0030";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    balls.forEach(element => {
        element.draw();
        element.collide(balls);
    });

    window.requestAnimationFrame(step);
}

window.requestAnimationFrame(step);

function random(min,max) {
    return Math.floor(Math.random()*(max-min)) + min;
}

let body = document.getElementsByTagName('body')[0];

body.appendChild(canvas);

window.onresize = () => {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight; 
}
window.onscroll = () => {
    canvas.setAttribute("style", "top: " + window.pageYOffset + "px");
}
