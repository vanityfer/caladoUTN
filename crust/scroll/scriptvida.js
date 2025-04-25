const img = new Image();
img.src = 'cherax2.png';  // Asegúrate de colocar la ruta correcta de la imagen.

img.onload = function() {
    actualizarCanvas();  // Redibujamos el canvas una vez que la imagen haya cargado.
};

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");

// Función para ajustar el tamaño del canvas al tamaño de la ventana
function ajustarTamañoCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

// Llama a la función al inicio y cada vez que la ventana se redimensione
ajustarTamañoCanvas();
window.addEventListener("resize", ajustarTamañoCanvas);

// Aquí puedes incluir el resto de tu código del juego de la vida
// para actualizar el tablero, etc.

const w = 34;
const h = 22;
const tamCelda = canvas.width / w;

let automatico = null;
let matriz = Array(w);
for (let i = 0; i < w; i++) {
    matriz[i] = Array(h);
    for(let j = 0; j < h; j++) {
        matriz[i][j] = 0;
    }
}

actualizarCanvas();
///////////////////////////////////////////////////////////////////////////////








///////////////////////////////////////////////////////////////////////////////
//                              Lógica de vista.                             //
// Es decir, métodos relacionados a la representación del estado del sistema //
// NOTA: La representación HTML/CSS y sus botones también se considera vista //
///////////////////////////////////////////////////////////////////////////////

/**
 * EJEMPLO DE FACHADA SIMPLIFICADORA.
 * Dibuja una línea de un punto a otro. Utilizará el color asignado a la
 * propiedad strokeStyle del contexto del canvas (ctx.strokeStyle).
 * @param {number} xor Coordenada X (en el sistema del canvas) donde comienza.
 * @param {number} yor Coordenada Y (en el sistema del canvas) donde comienza. 
 * @param {number} xdestino Coordenada X objetivo.
 * @param {number} ydestino Coordenada Y objetivo.
 */
function dibujarLinea(xor, yor, xdestino, ydestino) {
    ctx.beginPath();
    ctx.moveTo(xor, yor);
    ctx.lineTo(xdestino, ydestino);
    ctx.stroke();
    ctx.closePath();
}

/**
 * Dibuja todas las líneas en el canvas.
 * 
 * TAREA QUE OS ENCOMIENDO Nº 1.
 * Considera disponer de 2 canvas superpuestos del mismo tamaño. Las líneas
 * sólo se dibujan en el inferior, las casillas en el superior. De este modo
 * no es necesario redibujar todas las líneas en cada paso, pues sólo se
 * redibujan las celdas.
 */
function dibujarTodasLasLíneas() {
    ctx.strokeStyle = "#444";
    for(let i = 1; i < w; i++) {
        dibujarLinea(i*tamCelda, 0, i*tamCelda, h*tamCelda);
    }
    
    for(let i = 1; i < h; i++) {
        dibujarLinea(0, i*tamCelda, w*tamCelda, i*tamCelda);
    }
}

/**
 * Dibuja cada célula (casilla) que esté viva en el estado actual. Se
 * rellena un cuadro por célula viva SIN tocar los píxeles de las líneas.
 */
function dibujarCelulasVivas() {
    for (let i = 0; i < w; i++) {
        for(let j = 0; j < h; j++) {
            if(matriz[i][j] != 0) {
                // Dibuja la imagen en lugar de un color sólido
                // +1 pixel a la derecha y arriba para no tocar las líneas
                ctx.drawImage(img, i * tamCelda + 1, j * tamCelda + 1, tamCelda - 2, tamCelda - 2);
            }
        }
    }
}

function actualizarCanvas() {
    // Borrar todo el canvas.
    ctx.clearRect(0,0,canvas.width, canvas.height);
    dibujarTodasLasLíneas();  // Redibujar las líneas.
    dibujarCelulasVivas();    // Redibujar las celdas vivas con la imagen.
}

/**
 * Asegurarse de que se ejecute la función de dibujo sólo después de que la imagen esté cargada
 */
if (img.complete) {
    actualizarCanvas(); // Si la imagen ya está cargada antes de que se ejecute, actualizamos directamente.
}
/**
 * Borra todo el canvas y redibuja según estado actual.
 */

















///////////////////////////////////////////////////////////////////////////////
//                             Lógica de control                             //
//               Métodos asociados a los controles de la interfaz            //
///////////////////////////////////////////////////////////////////////////////
/**
 * Listener para clicks sobre el canvas. Obtiene la coordenada real, la
 * transforma a una coordenada entera del sistema de casillas y trata la
 * adición/eliminación de una célula.
 * @param {Object} eventInfo información sobre el click (posición y tal)
 */
function canvasPulsado(eventInfo) {
    // Obtener posición del mouse SOBRE el canvas.
    // clientX devuelve posición del mouse desde la izquierda del documento,
    // no desde la izquierda (comienzo) del canvas. Hay que restarle la 
    // distancia del canvas al comienzo del documento.
    const rect = canvas.getBoundingClientRect();
    const x = eventInfo.clientX - rect.x;
    const y = eventInfo.clientY - rect.y;

    // PARA CANVAS DE TAMAÑOS NO COINCIDENTES
    // Propiedades width/height del canvas distintas del width/height de su
    // estilo CSS computado. Encontrar la relación permite trabajar con
    // cualquier nivel de zoom, de manera adaptativa.
    const relacionTamCanvasTamCSS = rect.width / canvas.width;

    const celdaX = Math.floor(x/tamCelda/relacionTamCanvasTamCSS);
    const celdaY = Math.floor(y/tamCelda/relacionTamCanvasTamCSS);

    console.log("x: " + x + "  celdaX: " + celdaX);
    matriz[celdaX][celdaY] = 1 - matriz[celdaX][celdaY];
    actualizarCanvas();
}

// Añadimos dicho lístener al canvas.
canvas.addEventListener('mousedown', canvasPulsado);

/**
 * Asociado al onclick del botón Limpiar.
 * Mata todas las células (matriz a 0) y limpia el canvas.
 */
function limpiarTablero() {
    location.reload(); // Recarga toda la página
}


/**
 * Computa un nuevo paso. Dado que las celdas se deben calcular a la vez, no
 * se puede ir actualizando sobre la misma matriz, hay que crear una nueva
 * con el nuevo estado.
 */
function siguientePaso() {
    const nuevaMatriz = Array(w);
    for (let i = 0; i < w; i++) {
        nuevaMatriz[i] = Array(h);
        for(let j = 0; j < h; j++) {
            nuevaMatriz[i][j] = calcularCelula(i,j);
        }
    }

    matriz = nuevaMatriz;
    actualizarCanvas();
}

/**
 * Comprueba si una célula concreta vive o muere según estado actual.
 * @param {number} x Coordenada X de la celda a comprobar.
 * @param {number} y Coordenada Y de la celda a comprobar.
 * @return {boolean} true si célula viva, false si muerta.
 */
function calcularCelula(x,y) {

    let vecinosVivos = 0;

    
    // TAREA QUE OS ENCOMIENDO Nº 2.
    // Considera crear la matriz de tamaño +2 horizontal y vertical dejando 
    // un "marco" alrededor que nunca se utiliza como tal (sólo células muertas)
    // Implica mayor coste de memoria pero ahorraría todos los if para evitar 
    // desbordamientos. NOTA: habría que ajustar los bucles for para empezar 
    // desde 1 y no 0, además de su 

    // Solución con múltiples if. Solución con for rinde bastante menos aunque
    // pueda ser más legible.
    // Columna izquierda
    if(x-1 >= 0) {
        if (y-1 >= 0)  vecinosVivos += matriz[x-1][y-1];
        if (y+1 < h)   vecinosVivos += matriz[x-1][y+1];
        vecinosVivos += matriz[x-1][y];
    }

    // Columna central
    if (y-1 >= 0)   vecinosVivos += matriz[x][y-1];
    if (y+1 < h)    vecinosVivos += matriz[x][y+1];

    // Columna derecha
    if(x+1 < w) {
        if (y-1 >= 0)  vecinosVivos += matriz[x+1][y-1];
        if (y+1 < h)   vecinosVivos += matriz[x+1][y+1];
        vecinosVivos += matriz[x+1][y];
    }



    if(matriz[x][y] == 1 && (vecinosVivos == 2 || vecinosVivos == 3)) { return true; }
    if(matriz[x][y] == 0 && vecinosVivos == 3) { return true; }
    return false;
}


/**
 * Activa el modo automático, simplemente es como pulsar el botón de paso
 * 10 veces por segundo (una vez cada 100ms).
 */
function activarAuto() {
    const btn = document.querySelector("#botonAuto");
    if(automatico !== null) {
        btn.classList.remove("active");
        clearInterval(automatico);
        automatico = null;
    } else {
        btn.classList.add("active");
        automatico = setInterval(()=> {
            siguientePaso();
        },100);
    }
}