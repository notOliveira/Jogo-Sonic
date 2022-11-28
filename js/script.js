const sonic = document.querySelector('.sonic');
const pipe = document.querySelector('.pipe');
const game_over = document.querySelector('.game-over');
const clouds = document.querySelector('.clouds');

var jump_timeout = null;
var collision = false;

const jump = () => {
    sonic.classList.add('jump');
    sonic.src = './img/jumping.gif';
    jump_timeout = setTimeout(fall, 1000);

};

function fall() {
    sonic.classList.remove('jump');
    sonic.src = './img/sonic.gif';
};

function reload() {
    window.location.reload();
};

const loop = setInterval(() => {

    const pipePosition = pipe.offsetLeft;
    const cloudsPosition = clouds.offsetLeft;
    const sonicPosition = +window.getComputedStyle(sonic).bottom.replace('px', '');

    collision = pipePosition <= 235 && pipePosition > 0 && sonicPosition <= 155;

    if (collision) {

        console.log(collision);
        console.log('COLISAO');

        /* PARAR PIPE E NUVENS */
        clouds.style.animation = 'none';
        clouds.style.left = `${cloudsPosition}px`;
        pipe.style.left = `${pipePosition}px`;
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        /* PARAR SONIC*/
        sonic.style.bottom = `${sonicPosition}px`;
        sonic.src = './img/sonic-death.png';

        /* ANIMAÇÃO DE GAME OVER */
        game_over.style.animation = 'GO 2000ms linear';
        clearTimeout(jump_timeout);
        sonic.style.animation = 'death 1500ms ease-out';
        setInterval(reload, 2000);
    }

    // collision = false;

}, 10);

document.addEventListener('keypress', jump);