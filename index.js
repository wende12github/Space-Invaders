import audio from './audio.js';
import spaceshipImage from './images/spaceship.png';
import invaderImage from './images/invader.png';

const canvas = document.getElementById('gameCanvas');
const c = canvas.getContext('2d');
canvas.width = 480;
canvas.height = 320;

let score = 0;
const scoreEl = document.getElementById('scoreEl');

class Player {
    constructor() {
        this.position = { x: canvas.width / 2, y: canvas.height - 50 };
        this.width = 50;
        this.height = 30;
        this.image = new Image();
        this.image.src = spaceshipImage;
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }

    move(direction) {
        if (direction === 'left' && this.position.x > 0) {
            this.position.x -= 5;
        } else if (direction === 'right' && this.position.x + this.width < canvas.width) {
            this.position.x += 5;
        }
    }
}

class Invader {
    constructor(x, y) {
        this.position = { x, y };
        this.width = 40;
        this.height = 30;
        this.image = new Image();
        this.image.src = invaderImage;
    }

    draw() {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
    }
}

const player = new Player();
const invaders = [new Invader(50, 50), new Invader(100, 50)]; // Example invaders

function animate() {
    c.clearRect(0, 0, canvas.width, canvas.height);
    player.draw();
    invaders.forEach(invader => invader.draw());
    requestAnimationFrame(animate);
}

document.getElementById('startButton').addEventListener('click', () => {
    document.getElementById('startScreen').style.display = 'none';
    animate();
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        player.move('left');
    } else if (event.key === 'ArrowRight') {
        player.move('right');
    }
});