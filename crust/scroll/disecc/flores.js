function calcWave() {

    theta += 0.001;

    for (let i = 0; i < w / xspacing; i++) {
        yvalues[i] = 0;
    }

    for (let j = 0; j < maxwaves; j++) {
        let x = theta;
        for (let i = 0; i < yvalues.length; i++) {
            if (j % 1 === 0) yvalues[i] += tan(x) * amplitude[j];
            else yvalues[i] += sin(x) * amplitude[j];
            x += dx[j];
        }
    }
}


function calcWave_dos() {

    theta += 0.00000000000000000001;

    for (let i = 0; i < w / xspacing2; i++) {
        yvalues[i] = 0;
    }

    for (let j = 0; j < maxwaves2; j += 0.1) {
        let x = theta;
        for (let i = 0; i < yvalues.length; i += 0.1) {
            if (j % 2 === 0) yvalues[i] += sin(x) * amplitude[j];
            else yvalues[i] += sin(x) * amplitude[j];
            x += dx[j];
        }
    }
}


function mundo() {

    var ruidoX = -0.000009;
    var posX = noise(millis() * ruidoX) * height;

    var ruidoC = 0.000018;
    var posC = noise(millis() * ruidoC) * 200;

    var ruidoC4 = 0.0001;
    var posC4 = noise(millis() * ruidoC4) * 12;

    translate(10, 230);

    for (let x = 0; x < yvalues.length; x++) {


        var words = RiTa.tokenize("Veo morir el mundo")
        noStroke();
        textSize(fontsize);
        fill(255);

        for (var i = 0, j = words.length; i < j; i++) {
            text(words[i], x * xspacing, x + yvalues[x] + i * posC + 200);
        }
    }
}

function fruto() {

    var ruidoX = -0.000009;
    var posX = noise(millis() * ruidoX) * height;

    var ruidoC = 0.000008;
    var posC = noise(millis() * ruidoC) * 100;

    translate(150, -130);

    for (let x = 0; x < yvalues.length; x++) {


        var words = RiTa.tokenize("¿sabrás recordar el sabor de tu fruta favorita?")
        noStroke();
        textSize(fontsize);
        fill(200);

        for (var i = 0, j = words.length; i < j; i++) {
            text(words[i], x * xspacing, x + yvalues[x] + i * posC + 200);
        }
    }
}


function arbol() {


    var ruidoC = 0.000008;
    var posC = noise(millis() * ruidoC) * 100;

    translate(-130, -20);

    for (let x = 0; x < yvalues.length; x++) {


        var words = RiTa.tokenize("cuando el árbol no de más frutos?")
        noStroke();
        textSize(fontsize);
        fill(200);

        for (var i = 0, j = words.length; i < j; i++) {
            text(words[i], x * xspacing, x + yvalues[x] + i * posC);
        }
    }
}

function el_rio() {


    var ruidoC = 0.000018;
    var posC = noise(millis() * ruidoC) * 200;


    translate(10, 30);

    for (let x = 0; x < yvalues.length; x++) {


        var words = RiTa.tokenize("¿sabrás recordar cómo suena el río?")
        noStroke();
        textSize(fontsize);
        fill(255);

        for (var i = 0, j = words.length; i < j; i++) {
            text(words[i], x * xspacing, x + yvalues[x] + i * posC);
        }
    }
}




function canto() {

    let canto = "yo canto\n         a todo lo que\n  se apaga";

    //fill(0);

    //hue = ++hue % 255;

    hue = ++hue % 505;



    //hue++;

    fill(hue);

    //fill(hue, 62, 99);

    noStroke();

    var ruidoT = -0.00002;
    var posT = noise(millis() * ruidoT) * 20;

    textSize(22 + posT);

    var ruidoX = 0.00002;
    var posX = noise(millis() * ruidoX) * 600;

    var ruidoY = 0.0001;
    var posY = noise(millis() * ruidoY) * 250;

    var ruidoC = 0.0001;
    var posC = noise(millis() * ruidoC) * 500;

    translate(100 + posX, 150 + posY);

    text(canto, 100, 0, posC, 600);

}

function loqueseapaga() {

    let canto = "yo canto\n         a todo lo que\n  se apaga";

    //fill(0);

    //hue = ++hue % 255;

    hue = ++hue % 505;



    //hue++;

    fill(hue);

    //fill(hue, 62, 99);

    noStroke();

    var ruidoT = -0.00002;
    var posT = noise(millis() * ruidoT) * 20;

    textSize(22 + posT);

    var ruidoX = 0.00002;
    var posX = noise(millis() * ruidoX) * 900;

    var ruidoY = 0.00001;
    var posY = noise(millis() * ruidoY) * 350;

    var ruidoC = 0.0008;
    var posC = noise(millis() * ruidoC) * 800;

    translate(280 + posX, 270 + posY);

    text(canto, 100, 0, posC, 500);

}

function poco() {

    let poco = "lo que poco a poco deja de moverse, las luciérnagas que nunca más has visto,";

    //fill(0);

    //hue = ++hue % 255;

    hue = ++hue % 505;


    fill(hue);


    noStroke();

    var ruidoT = -0.00002;
    var posT = noise(millis() * ruidoT) * 20;

    textSize(18 + posT);

    var ruidoX = 0.00002;
    var posX = noise(millis() * ruidoX) * 800;

    var ruidoY = 0.0001;
    var posY = noise(millis() * ruidoY) * 250;

    var ruidoC = 0.0001;
    var posC = noise(millis() * ruidoC) * 800;

    translate(150 + posX, 100 + posY);

    text(poco, 60, 0, posC, 2400);

}

function apoco() {

    let poco = "lo que poco a poco deja de moverse, las luciérnagas que nunca más has visto,";

    //fill(0);

    //hue = ++hue % 255;

    hue = ++hue % 505;


    fill(hue);


    noStroke();

    var ruidoT = -0.00002;
    var posT = noise(millis() * ruidoT) * 10;

    textSize(18 + posT);

    var ruidoX = 0.00006;
    var posX = noise(millis() * ruidoX) * 800;

    var ruidoY = 0.000021;
    var posY = noise(millis() * ruidoY) * 250;

    var ruidoC = 0.0001;
    var posC = noise(millis() * ruidoC) * 300;

    translate(350 + posX, 300 + posY);

    text(poco, 60, 0, posC, 600);

}



function abuelas() {

    var ruidoX = 0.00008;
    var posX = noise(millis() * ruidoX) * height;

    var ruidoC = 0.000008;
    var posC = noise(millis() * ruidoC) * 70;

    var ruidoC4 = 0.0001;
    var posC4 = noise(millis() * ruidoC4) * 8;

translate(width/1.5, height/3.5);

    for (let x = 0; x < yvalues.length; x++) {
        
        stroke(205, 141, 193);
        strokeWeight(2);
rotate(13);
        //line(x * xspacing, posX, x * xspacing, height / 4 + yvalues[x]);
        
        //var words = RiTa.tokenize("Tsikua mee kuaku yàà yu´u, ka’mà chikui xiniku,")

var words = RiTa.tokenize("y solo viven en las historias de mis abuelas.")


        noStroke();
        textSize(18+posC4);
        fill(255);
     
        for (var i = 0, j = words.length; i < j; i++) {

            text(words[i], x * xspacing2, x + yvalues[x] + i * posC + 200);
        }
    }
}

function extingue() {

    var ruidoX = -0.000009;
    var posX = noise(millis() * ruidoX) * height;

    var ruidoC = 0.000018;
    var posC = noise(millis() * ruidoC) * 200;

    var ruidoC4 = 0.0001;
    var posC4 = noise(millis() * ruidoC4) * 12;

    translate(10, 230);

    for (let x = 0; x < yvalues.length; x++) {


        var words = RiTa.tokenize("Canto a todo lo que se extingue")
        noStroke();
        textSize(fontsize);
        fill(255);

        for (var i = 0, j = words.length; i < j; i++) {
            text(words[i], x * xspacing, x + yvalues[x] + i * posC);
        }
    }
}

function belleza() {

    var ruidoX = -0.000009;
    var posX = noise(millis() * ruidoX) * height;

    var ruidoC = 0.000008;
    var posC = noise(millis() * ruidoC) * 100;

    translate(150, -130);

    for (let x = 0; x < yvalues.length; x++) {


        var words = RiTa.tokenize("la belleza de lo que va muriendo,")
        noStroke();
        textSize(fontsize);
        fill(200);

        for (var i = 0, j = words.length; i < j; i++) {
            text(words[i], x * xspacing, x + yvalues[x] + i * posC);
        }
    }
}

function consuelo() {

    var ruidoX = -0.000009;
    var posX = noise(millis() * ruidoX) * height;

    var ruidoC = 0.000018;
    var posC = noise(millis() * ruidoC) * 200;

    var ruidoC4 = 0.0001;
    var posC4 = noise(millis() * ruidoC4) * 12;

    translate(10, 230);

    for (let x = 0; x < yvalues.length; x++) {


        var words = RiTa.tokenize("La raíz, un astro de luz que trae consuelo")
        noStroke();
        textSize(fontsize);
        fill(255);

        for (var i = 0, j = words.length; i < j; i++) {
            text(words[i], x * xspacing, x + yvalues[x] + i * posC);
        }
    }
}

function lengua() {

    var ruidoX = -0.000009;
    var posX = noise(millis() * ruidoX) * height;

    var ruidoC = 0.000008;
    var posC = noise(millis() * ruidoC) * 100;

    translate(150, -130);

    for (let x = 0; x < yvalues.length; x++) {


        var words = RiTa.tokenize("la lenta (lengua) del sueño.")
        noStroke();
        textSize(fontsize);
        fill(200);

        for (var i = 0, j = words.length; i < j; i++) {
            text(words[i], x * xspacing, x + yvalues[x] + i * posC);
        }
    }
}

function fix() {

    let poco = "this code is not working like i expect — how do i fix it?";

    //fill(0);

    //hue = ++hue % 255;

    hue = ++hue % 505;


    fill(170, hue/6, hue);


    noStroke();

    var ruidoT = -0.00002;
    var posT = noise(millis() * ruidoT) * 80;

    textSize(18 + posT);

    var ruidoX = 0.00006;
    var posX = noise(millis() * ruidoX) * 800;

    var ruidoY = 0.000021;
    var posY = noise(millis() * ruidoY) * 250;

    var ruidoC = 0.0001;
    var posC = noise(millis() * ruidoC) * 300;

    translate(0 + posX, 150 - posY);

    text(poco, 60, 0, posC, 600);

}

function it() {

    let poco = "this code is not working like i expect — how do i fix it?";

    //fill(0);

    //hue = ++hue % 255;

    hue = ++hue % 255;


    fill(hue);


    noStroke();

    var ruidoT = -0.00002;
    var posT = noise(millis() * ruidoT) * 40;

    textSize(18 + posT);

    var ruidoX = 0.000046;
    var posX = noise(millis() * ruidoX) * 800;

    var ruidoY = 0.00001;
    var posY = noise(millis() * ruidoY) * 250;

    var ruidoC = 0.0001;
    var posC = noise(millis() * ruidoC) * 500;

    translate(0 + posX, 100 + posY);

    text(poco, 60, 0, posC, 600);

}



function drift() {

  tamango = tamango + dato;
  
  
 //background(255, 170, 0);
 
 if (tamango <= 0){
   dato = 1;
   
 }
if (tamango >= 100){
   dato = -1;
}

  fill(142, 202, 230, random(80));
  stroke(2, 48, 71, 70);
   
  
  // noise
  
  var bruitX = 0.0001;
  var bruit_x = noise(millis() * bruitX) * width;
  
  var bruitY = 0.0002;
  var bruit_y = noise(millis() * bruitY) * height;
  
  
  
  ellipse(bruit_x, bruit_y, tamango, tamango);
  

}

function capullo() {

    var ruidoX = -0.000009;
    var posX = noise(millis() * ruidoX) * height;

    var ruidoC = 0.000018;
    var posC = noise(millis() * ruidoC) * 200;

    var ruidoC4 = 0.0001;
    var posC4 = noise(millis() * ruidoC4) * 12;

    translate(10, 230);

    for (let x = 0; x < yvalues.length; x++) {


        var words = RiTa.tokenize("Veo morir el mundo: Un capullo brota de la tierra,")
        noStroke();
        textSize(fontsize);
        fill(255);

        for (var i = 0, j = words.length; i < j; i++) {
            text(words[i], x * xspacing, x + yvalues[x] + i * posC + 200);
        }
    }
}

function tierra() {

    var ruidoX = -0.000009;
    var posX = noise(millis() * ruidoX) * height;

    var ruidoC = 0.000008;
    var posC = noise(millis() * ruidoC) * 100;

    translate(150, -130);

    for (let x = 0; x < yvalues.length; x++) {


        var words = RiTa.tokenize("tierra es el color de tus ojos.")
        noStroke();
        textSize(fontsize);
        fill(200);

        for (var i = 0, j = words.length; i < j; i++) {
            text(words[i], x * xspacing, x + yvalues[x] + i * posC + 200);
        }
    }
}


function amanha() {

    var ruidoX = -0.000009;
    var posX = noise(millis() * ruidoX) * height;

    var ruidoC = 0.000018;
    var posC = noise(millis() * ruidoC) * 200;

    var ruidoC4 = 0.0001;
    var posC4 = noise(millis() * ruidoC4) * 12;

    translate(10, 230);

    for (let x = 0; x < yvalues.length; x++) {



        var words = RiTa.tokenize("Por la mañana rumbo de madera")
        noStroke();
        textSize(fontsize);
        fill(255);

        for (var i = 0, j = words.length; i < j; i++) {
            text(words[i], x * xspacing, x + yvalues[x] + i * posC + 200);
        }
    }
}

function enmienda() {

    var ruidoX = -0.000009;
    var posX = noise(millis() * ruidoX) * height;

    var ruidoC = 0.000008;
    var posC = noise(millis() * ruidoC) * 100;

    translate(150, -130);

    for (let x = 0; x < yvalues.length; x++) {


        var words = RiTa.tokenize("que enmienda mi camino")
        noStroke();
        textSize(fontsize);
        fill(200);

        for (var i = 0, j = words.length; i < j; i++) {
            text(words[i], x * xspacing, x + yvalues[x] + i * posC + 200);
        }
    }
}











