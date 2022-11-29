const sonic = document.querySelector('.sonic');
const pipe = document.querySelector('.pipe');
const game_over = document.querySelector('.game-over');
const clouds = document.querySelector('.clouds');

var count_jump = 0;
var score = 0;
var jump_timeout = null;
var collision = false;


function disable()
{
 document.onkeydown = function (e) 
 {
  return false;
 }
}
function enable()
{
 document.onkeydown = function (e) 
 {
    return true;
 }
}

const jump = () => {
    sonic.classList.add('jump');
    disable();
    sonic.src = './img/jumping.gif';
    jump_timeout = setTimeout(fall, 1000);


};

function fall() {
    enable();
    sonic.classList.remove('jump');
    sonic.src = './img/sonic.gif';
    count_jump += 1;
    document.getElementById("count-jump-sonic").textContent=`${count_jump}`;

};

function reload() {
    window.location.reload();
};

const loop = setInterval(() => {

    score += 1
    document.getElementById("score").textContent=`${score}`;
    const pipePosition = pipe.offsetLeft;
    const cloudsPosition = clouds.offsetLeft;
    const sonicPosition = +window.getComputedStyle(sonic).bottom.replace('px', '');

    collision = pipePosition <= 235 && pipePosition > 0 && sonicPosition <= 155;

    
    if (collision == true) {

        clearInterval(loop);

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
        sonic.style.animation = 'death 2000ms ease-out';
        setInterval(reload, 2000);
    }

}, 1);

document.addEventListener('keypress', jump);
