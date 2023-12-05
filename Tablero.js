class Tablero{
    constructor(){
        this.columnas = 10
        this.filas = 20
        this.lado_celda = 25
        this.ancho = this.columnas*this.lado_celda
        this.alto = this.filas*this.lado_celda
        //this.posicion = createVector((width-this.ancho)/2,(height-this.alto)/2)
        this.posicion = createVector(
            marg_t, 
            marg_t + this.lado_celda
            ); 
        this.minosAlmacenados = [];
        for(let fila = 0; fila < this.filas; fila++){
            this.minosAlmacenados[fila]=[];
            for(let columna = 0; columna < this.columnas; columna++){
                this.minosAlmacenados[fila].push("");
            }
        }
    }

    set almacenarMino(tetrimino) {
        for (const pmino of tetrimino.mapaTablero) {
            if (pmino.y < 0) {
                // Fin del juego
                alert("¡Perdiste! Inténtalo de nuevo.")
                tablero = new Tablero();
                tetrimino = new Tetrimino();
                lineas_hechas = 0;
            }
            this.minosAlmacenados[pmino.x][pmino.y] = tetrimino.nombre;
        }
    
        
        let lineasCompletas = this.buscarLineasCompletas();
    
        
        if (lineasCompletas.length > 0) {
            this.borrarLineas(lineasCompletas);
        }
    }
    
    buscarLineasCompletas() {
        let lineas = [];
        for (let fila = this.filas - 1; fila >= 0; fila--) {
            let completa = true;
            for (let columna = 0; columna < this.columnas; columna++) {
                if (!this.minosAlmacenados[columna][fila]) {
                    completa = false;
                    break;
                }
            }
            if (completa) {
                lineas.push(fila);
            }
        }
        return lineas; 
    }
    
    borrarLineas(lineas) {
        lineas_hechas += lineas.length;
    
        for (const linea of lineas) {
            for (let f = linea; f > 0; f--) {
                for (let columna = 0; columna < this.columnas; columna++) {
                    this.minosAlmacenados[columna][f] = this.minosAlmacenados[columna][f - 1];
                }
            }
            for (let columna = 0; columna < this.columnas; columna++) {
                this.minosAlmacenados[columna][0] = "";
            }
        }
    
        let nuevasLineasCompletas = this.buscarLineasCompletas();
        if (nuevasLineasCompletas.length > 0) {
            this.borrarLineas(nuevasLineasCompletas);
        }
    }

    coordenada(x,y){
            return createVector(x,y).mult(this.lado_celda).add(this.posicion)
    }

    dibujar(){
        push()
        //noStroke()
        strokeWeight(1)
        stroke("lightgray")
        for(let columna = 0; columna< this.columnas; columna++){
            for(let fila = 0; fila< this.filas; fila++){
                if((columna+fila)%2==0){
                    fill("rgb(1, 1, 36)");
                }else{
                    fill("rgb(63, 57, 57)");
                }
               let c=  this.coordenada(columna, fila);
               rect(c.x,c.y,this.lado_celda);
            }
        }
        pop();
        this.dibujarMinosAlmacenados()
    }

    dibujarMinosAlmacenados(){
        push();
        for(let columna= 0; columna < this.columnas; columna++){
            for(let fila= 0; fila < this.filas; fila++){
                let nombreMino = this.minosAlmacenados[columna][fila]
            if(nombreMino){
                fill(tetriminosBase[nombreMino].color)
                Tetrimino.dibujarMino(this.coordenada(columna,fila));
            }
          }            
        }
        pop();
    }
}
