const sonic = document.querySelector('.sonic');
const pipe = document.querySelector('.pipe');
const game_over = document.querySelector('.game-over');
const clouds1 = document.querySelector('#nuvem1');
const clouds2 = document.querySelector("#nuvem2")

var count_jump = 0;
var score = 0;
var jump_timeout = null;
var collision = false;

var musica1Audio = new Audio("audios/his world.mp3");
var musica2Audio = new Audio("audios/gravity.mp3");
var musica3Audio = new Audio("audios/green hill.mp3");
var musica4Audio = new Audio("audios/endless possibility.mp3");
var musica5Audio = new Audio("audios/sunshine.mp3");

var teste = localStorage.getItem('aleatorio');
var musica = localStorage.getItem('musica');


function playRandom() {
    var randomNum = Math.floor(Math.random() * 4);

        if(teste == "true") {
        switch (randomNum) {
        case 0:
            setTimeout (() => {
                musica1Audio.play();
            },1000);
            break;
        case 1:
            setTimeout (() => {
                musica2Audio.play();
            },1000);
            break;
        case 2:
            setTimeout (() => {
                musica3Audio.play();
            },1000);
            break;
        case 3:
            setTimeout (() => {
                musica4Audio.play();
            },1000);
            break;
        case 4:
            setTimeout (() => {
                musica5Audio.play();
            },1000);
            break;
        }
    } else if(teste == "none") {

    } else{
        switch (musica) {
            case 'play1':
                setTimeout (() => {
                    musica1Audio.play();
                },1000);
                break;
            case 'play2':
                setTimeout (() => {
                    musica2Audio.play();
                },1000);
                break;
            case 'play3':
                setTimeout (() => {
                    musica3Audio.play();
                },1000);
                break;
            case 'play4':
                setTimeout (() => {
                    musica4Audio.play();
                },1000);
                break;
            case 'play5':
                setTimeout (() => {
                    musica5Audio.play();
                },1000);
                break;
            }
    }
}
    playRandom();

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
    location.href = "jogo.html";
};

const loop = setInterval(() => {

    score += 1
    document.getElementById("score").textContent=`${score}`;
    const pipePosition = pipe.offsetLeft;
    const cloudsPosition1 = clouds1.offsetLeft;
    const cloudsPosition2 = clouds2.offsetLeft - 1280; 
    const sonicPosition = +window.getComputedStyle(sonic).bottom.replace('px', '');

    collision = pipePosition <= 235 && pipePosition > 0 && sonicPosition <= 155;

    
    if (collision == true) {


        clearInterval(loop);
        
        /* PARAR PIPE E NUVENS */ 
        clouds1.style.animation = 'none';
        clouds1.style.left = `${cloudsPosition1}px`;
        clouds2.style.animation = 'none';
        clouds2.style.left = `${cloudsPosition2}px`;

        pipe.style.left = `${pipePosition}px`;
        pipe.style.animation = 'none';
        pipe.style.left = `${pipePosition}px`;

        /* PARAR SONIC*/
        disable()
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

var voltar = document.getElementById("voltarMenu").addEventListener("click", () => {location.href = "index.html"})