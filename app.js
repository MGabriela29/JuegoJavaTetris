const marg_t = 30;
let regu_tec = 0;
let regu_caida = 0;
let lineas_hechas = 0;

let juegoEnPausa = false;


document.getElementById('pauseButton').addEventListener('click', togglePausa);



function togglePausa() {
    if (juegoEnPausa) {
        loop(); 
        regu_caida = millis(); 
    } else {
        noLoop();
    }
    juegoEnPausa = !juegoEnPausa; // Toggle the pause state
}

document.getElementById('startButton').addEventListener('click', continuarJuego);

function continuarJuego() {
    if (juegoEnPausa) {
        loop(); 
        regu_caida = millis(); 
        juegoEnPausa = false; 
    }
}


document.getElementById('restartButton').addEventListener('click', reiniciarJuego);

function reiniciarJuego() {
    tablero = new Tablero();
    tetrimino = new Tetrimino();
    lineas_hechas = 0;
    juegoEnPausa = false; 
    loop(); 
}

function moverAbajo() {
    if (!juegoEnPausa) { 
        this.posicion.y++;
        if (this.movimientoErroneo) {
            this.moverArriba();
            if (tetrimino == this) {
                tablero.almacenarMino = this;
                tetrimino = new Tetrimino();
            }
            return false;
        }
        return true;
    }
    return false;
}


let angulo_fond=Math.random()*360
let tono_fond=Math.random()*360
setInterval(()=>{
    document.body.style.background = `linear-gradient(
        ${angulo_fond}deg,
        rgb(144, 11, 177) 7%,
        rgb(139, 185, 260) 100%)
         `
    
        angulo_fond+=Math.random()
},2);

setInterval(() => {
    if (!juegoEnPausa && millis() - regu_caida >= 300) {
        regu_caida = millis();
        tetrimino.moverAbajo();
    }
}, 300);

function setup(){
    createCanvas(900,600)
    tablero = new Tablero() 
    crearTetriminos()
    tetrimino = new Tetrimino()
   
    resizeCanvas(
        tablero.ancho + 2 * marg_t,
        tablero.alto + 2 * marg_t + tablero.lado_celda)
}

function draw(){
    //clear()
    background("grey")
    dibujarPuntaje()
    tablero.dibujar()
    tetrimino.dibujar()
    keyEventsTetirs()
    
}

function dibujarPuntaje(){
    push()
    textSize(25)
    strokeWeight(3)
    stroke("black")
    fill("white")
    text("Lineas: "+lineas_hechas,
    tablero.posicion.x,
    tablero.posicion.y-tablero.lado_celda/2)
    pop()
}
let limite_regu_veloci_teclas= 90
function keyEventsTetirs(){
    if(millis()-regu_tec < limite_regu_veloci_teclas){
        return
    }
    limite_regu_veloci_teclas= 90
    regu_tec=millis()
    if(keyIsDown(RIGHT_ARROW)){
        tetrimino.moverDerecha()
        regu_caida=millis()
    }
    if(keyIsDown(LEFT_ARROW)){
        tetrimino.moverIzquierda()
        regu_caida=millis()
    }
    if(keyIsDown(DOWN_ARROW)){
        tetrimino.moverAbajo()
        regu_caida=millis()
    }
    if(keyIsDown(UP_ARROW)){
        limite_regu_veloci_teclas=90
        tetrimino.girar()
        regu_caida=millis()
    }
    if(keyIsDown(32)){
        limite_regu_veloci_teclas= 90
        tetrimino.ponerEnElFondo()
        regu_caida=millis()
    }
}
