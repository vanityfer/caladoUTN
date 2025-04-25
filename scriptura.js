// Variables del canvas
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Posición inicial de las letras
let xPos = -10;
let yPos = 50;

// Margen inferior
const bottomMargin = 40;  // Definimos un margen inferior para limitar el área de escritura

// Ajusta la altura disponible para el texto, excluyendo el margen inferior
const maxHeight = canvas.height - bottomMargin;

// Tamaño de las imágenes
const imageWidth = 60;
const imageHeight = 60;

// Espaciado entre letras
const letterSpacing = 45;

// Margen de fluctuación para las posiciones en el eje Y
const maxFluctuation = 15;  // Valor de fluctuación para las posiciones en el eje Y

// Ancho máximo del canvas (limite de la línea)
const maxWidth = canvas.width;  // 10px de margen

// Para animar la letra previamente generada
let animatedLetter = null;
let isAnimating = false;
let animationStep = 0;

// Objeto que contiene las rutas de las imágenes asociadas a cada letra
const images = {
    'A': 'disecc/28.png',
    'B': 'disecc/47.png',
    'C': 'disecc/2.png',
    'D': 'disecc/46.png',
    'E': 'disecc/1.png',
    'F': 'disecc/45.png',
    'G': 'disecc/4.png',
    'H': 'disecc/44.png',
    'I': 'disecc/39.png',
    'J': 'disecc/43.png',
    'K': 'disecc/6.png',
    'L': 'disecc/42.png',
    'M': 'disecc/7.png',
    'N': 'disecc/41.png',
    'Ñ': 'disecc/8.png',
    'O': 'disecc/34.png',
    'P': 'disecc/9.png',
    'Q': 'disecc/5.png',
    'R': 'disecc/10.png',
    'S': 'disecc/38.png',
    'T': 'disecc/11.png',
    'U': 'disecc/37.png',
    'V': 'disecc/12.png',
    'W': 'disecc/36.png',
    'X': 'disecc/13.png',
    'Y': 'disecc/23.png',
    'Z': 'disecc/14.png',
    '0': 'disecc/40.png',
    '1': 'disecc/15.png',
    '2': 'disecc/24.png',
    '3': 'disecc/16.png',
    '4': 'disecc/32.png',
    '5': 'disecc/17.png',
    '6': 'disecc/31.png',
    '7': 'disecc/18.png',
    '8': 'disecc/30.png',
    '9': 'disecc/19.png',
    '?': 'disecc/31.png',
    '¿': 'disecc/20.png',
    ',': 'disecc/30.png',
    '.': 'disecc/21.png',
    '-': 'disecc/25.png', 
    '(': 'disecc/26.png', 
    ')': 'disecc/27.png', 
    '[': 'disecc/3.png', 
    ']': 'disecc/29.png'

};

// Variables para el texto ingresado
let inputText = '';
//let lastLetterPos = {x: -10, y: 50};
// Inicializamos xPos al extremo derecho del canvas
xPos = canvas.width - imageWidth - 10;  // Empieza en el borde derecho del canvas
let stopWriting = false;

function drawLetter(letter) {
    if (stopWriting) {
        return;  // Si stopWriting es true, no hace nada y sale de la función
    }

    if (letter === ' ') {
        // Espacio en blanco, retrocedemos en lugar de avanzar
        xPos -= letterSpacing;
        return;
    }

    const imagePath = images[letter.toUpperCase()];
    if (imagePath) {
        const img = new Image();
        img.src = imagePath;
        img.onload = () => {
            // Calculamos un desplazamiento aleatorio para la fluctuación de la posición en Y
            const randomYFluctuation = Math.floor(Math.random() * maxFluctuation) - (maxFluctuation / 2);
            // Dibujamos la imagen con el tamaño ajustado
            ctx.drawImage(img, xPos, yPos + randomYFluctuation, imageWidth * 2, imageHeight * 2);
            // Guardamos la última posición
            lastLetterPos = { x: xPos, y: yPos + randomYFluctuation };
            // Retrocedemos la posición horizontal
            xPos -= letterSpacing;

            // Verificamos si hemos llegado al borde izquierdo del canvas
            if (xPos < 10) {
                // Si hemos llegado al borde, saltamos a la línea siguiente
                xPos = canvas.width - imageWidth - 10; // Reiniciamos la posición x al extremo derecho
                yPos += imageHeight + 10; // Aumentamos la posición Y para el salto de línea
            }
            if (yPos + imageHeight > maxHeight) {
                stopWriting = true; 
                console.log('Se ha alcanzado el margen inferior');
                return;  // Detiene el dibujo si se supera el margen inferior
            }

            
        };
    }
}

// Función para borrar todo el contenido del canvas y volver a dibujar el texto
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Limpia el canvas
    xPos = canvas.width - imageWidth - 10;  // Empieza en el borde derecho del canvas
    yPos = 50;  // Reinicia la posición y
}




// Función para animar la letra anterior
function animateLastLetter() {
   
    if (isAnimating && animatedLetter) {
        
        animationStep += 1;
        if (animationStep > 20) {
            isAnimating = false; // Detenemos la animación después de un número de pasos
            animationStep = 0; // Reiniciamos el contador
        } else {
            // Aquí puedes aplicar cualquier animación, como hacer que la letra se agrande
           // ctx.clearRect(lastLetterPos.x - 10, lastLetterPos.y - 10, imageWidth + 20, imageHeight + 20); // Borrar la letra anterior
            const scaleFactor = 1 + (animationStep * 0.05); // Escala creciente
            const img = new Image();
            img.src = images[animatedLetter.toUpperCase()];
            img.onload = () => {
                ctx.drawImage(img, lastLetterPos.x - (imageWidth * scaleFactor - imageWidth) / 2, lastLetterPos.y - (imageHeight * scaleFactor - imageHeight) / 2, imageWidth * scaleFactor, imageHeight * scaleFactor);
            };
           
        }
    }
}

let isDeadKeyPressed = false;  // Bandera para detectar la tecla "dead"
let lastChar = inputText[inputText.length - 1];

// Función para manejar la letra siguiente después de "dead"
function handleDeadKeyAndDrawLetter(letter) {
    if (isDeadKeyPressed) {
        if (inputText.length > 0) {
            // Animar la última letra (sin dibujar la nueva letra)
            isAnimating = true;
            animatedLetter = inputText[inputText.length - 1]; // Última letra generada

            // Ejecuta la animación con un temporizador para esperar hasta que termine
            const animationInterval = setInterval(() => {
                animateLastLetter();
                if (!isAnimating) { 
                    clearInterval(animationInterval); // Detiene el temporizador

                    // Una vez que termina la animación, dibuja la nueva letra
                    inputText += letter.toUpperCase(); 
                    drawLetter(letter.toUpperCase());
                }
            }, 50); // Intervalo de tiempo entre cuadros de animación (ajustable)
        }

        isDeadKeyPressed = false; // Restablecemos la bandera "dead"
    } else {
        // Si no hubo 'dead', dibujamos la letra de manera normal
        inputText += letter.toUpperCase();
        drawLetter(letter.toUpperCase()); // Dibuja la letra normalmente
    }
}


// Manejador de eventos para las teclas presionadas
document.addEventListener('keydown', (event) => {
    if (event.key === 'Dead') {
        // Detectamos la tecla "dead", pero no dibujamos nada aún
        isDeadKeyPressed = true;  // Activamos la bandera para esperar la siguiente letra
        event.preventDefault();   // Evita que se registre el "dead" como un carácter
    } else if (event.key === 'Enter') {
        // Detectamos la tecla "Enter" para el salto de línea
        xPos = canvas.width - imageWidth - 10;  // Reinicia la posición x al extremo derecho del canvas
        yPos += imageHeight + 10;  // Aumenta la posición Y para el salto de línea
        event.preventDefault();  // Evita el comportamiento por defecto de "Enter"
    } else if (event.key === 'Backspace') {
        // Detectamos la tecla "Backspace" para borrar la última letra
        if (inputText.length > 0) {
            // Eliminar la última letra del texto
            inputText = inputText.slice(0, -1);
            // Limpiar el canvas y redibujar todo el texto sin la última letra
            clearCanvas();
            drawText();
        }
        event.preventDefault();  // Evita el comportamiento por defecto de "Backspace"
    } else if (event.key.length === 1) {
        // Si es una tecla normal (letra o número), procesamos normalmente
        handleDeadKeyAndDrawLetter(event.key);  // Llama a la función para dibujar la letra correctamente
    }
});

// Función para borrar todo el contenido del canvas y volver a dibujar el texto


// Dibuja el texto ingresado (puedes usarlo si prefieres hacer una entrada continua)
function drawText() {
    for (let i = 0; i < inputText.length; i++) {
        drawLetter(inputText[i]);
    }
}

// Limpia el canvas

// Inicializa el canvas vacío al cargar la página
clearCanvas();
