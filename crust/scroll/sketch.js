
// variables para el audio


var left = [];
var right = [];

var button;

let value = 0;
let allSoundsAreLoaded = false;
let playNextLeft, playNextRight;
let stopped = false;



let xspacing = 303; // How far apart should each horizontal position be spaced

let xspacing2 = 65; // How far apart should each horizontal position be spaced

let w; // Width of entire wave
let maxwaves = 0.8; // total # of waves to add together
let maxwaves2 = 8; // total # of waves to add together


var lines, markov;

let theta = 0;
let amplitude = []; // Height of wave
let dx = []; // Value for incrementing X, to be calculated as a function of period and xspacing
let yvalues = 200; // Using an array to store height values for the wave (not entirely necessary)


var font,
    fontsize = 22;

var contador = 1;
var contando = 1;

let hue = 0;

// drift

var tamango = 20;
var dato = 1;



function setup() {
    createCanvas(windowWidth, windowHeight);

    noStroke();
    loadAllSounds();
    w = width;

    textFont("Work Sans");

    for (let i = 0; i < maxwaves; i++) {
        amplitude[i] = 102;
        let period = 240; // How many pixels before the wave repeats
        dx[i] = (TWO_PI / period) * xspacing;
    }

    yvalues = [];
}

function draw() {

    // Before all the sounds are loaded
    if (!allSoundsAreLoaded) {
clear();


        fill(255);
        // agregar loading
        
        ellipse(windowWidth / 2, windowHeight / 2, Math.sin(frameCount * 0.07) * 20);
        fill(0, 0, 0);
        ellipse(windowWidth / 2, windowHeight / 2, Math.sin(frameCount * 0.07) * 10);
        fill(255);
        let loaded = true;
        for (let i = 0; i < left.length; i++) {
            if (left[i].isLoaded() == false) {
                loaded = false;
            }
        }
        for (let i = 0; i < right.length; i++) {
            if (right[i].isLoaded() == false) {
                loaded = false;
            }
        }
        if (loaded) {
            // console.log("EVERYTHING IS LOADED NOW");
            allSoundsAreLoaded = true;
            playNextLeft = function() {
                if (stopped == false) {
                    let s = random(left);
                    s.play();
                    // console.log("playing the next left");
                    setTimeout(playNextLeft, (s.duration()) * 1000);
                }

            };
            playNextRight = function() {
                if (stopped == false) {
                    let s = random(right);
                    s.play();
                    // console.log("playing the next right");
                    setTimeout(playNextRight, (s.duration()) * 1000);
                }
            };
            // for (let i = 0; i < left.length; i++) {
            //     let s = left[i];
            //     s.addCue(s.duration() - 0.1, playNextLeft);
            // }
            // for (let i = 0; i < right.length; i++) {
            //     let s = right[i];
            //     s.addCue(s.duration() - 0.1, playNextRight);
            // }
        }

    }

    // When all the sounds are loaded
    else {


    contando++;

    calcWave();


    if (contando <= 1000) {
        //canto();
        push();
        clear();
        mundo();
        fruto();
        pop();

    }

    if (contando >= 1000 && contando <= 2000) {

        push();
        clear();
        arbol();
        pop();
        push();
        el_rio();
        pop();
    }


    if (contando >= 2000 && contando <= 3000) {

        push();
        clear();
        canto();
        pop();
        push();
        loqueseapaga();
        pop();

    }


    if (contando >= 3000 && contando <= 4000) {


        push();
        clear();
        poco();
        pop();
        push();
        apoco();
        pop();
    }

    if (contando >= 4000 && contando <= 5000) {

        push();
        clear();
        abuelas();
        pop();
    }

    if (contando >= 5000 && contando <= 6000) {

        push();
        clear();
        extingue();
        belleza();
        pop();
    }

    if (contando >= 6000 && contando <= 7000) {

        push();
        clear();
        consuelo();
        pop();
        push();
        lengua();
        pop();
    }

    if (contando >= 7000 && contando <= 9000) {

        push();
        fix();
        pop();
        push();
        it();
        pop();
        push();
        drift();
        pop();
    }

    if (contando >= 9000 && contando <= 10000) {

        push();
        clear();
        capullo();
        pop();
        push();
        tierra();
        pop();
    }

    if (contando >= 10000 && contando <= 11000) {

        push();
        clear();
        amanha();
        pop();
        push();
        enmienda();
        pop();
    }

    if (contando >= 11000) {
        contando = 0;
        //window.location.reload();

    }


        // Draw the knob 
       /*
        push();
        pan_vis();
        pop();
*/
        push();
        play();
        pop();

        push();
        stop();
        pop();

        push();
        paneando();
        pop();

        // push();
        // knob();
        // pop();

    }

}



function loadAllSounds() {
    
    left.push(loadSound('left/01.mp3'));
    left.push(loadSound('left/02.mp3'));
    left.push(loadSound('left/03.mp3'));
    left.push(loadSound('left/04.mp3'));
    left.push(loadSound('left/05.mp3'));
    left.push(loadSound('left/06.mp3'));
    left.push(loadSound('left/07.mp3'));
    left.push(loadSound('left/08.mp3'));
    left.push(loadSound('left/09.mp3'));
    left.push(loadSound('left/10.mp3'));
    left.push(loadSound('left/11.mp3'));
    left.push(loadSound('left/12.mp3'));
    left.push(loadSound('left/13.mp3'));
    left.push(loadSound('left/14.mp3'));
    left.push(loadSound('left/15.mp3'));
    left.push(loadSound('left/16.mp3'));
    left.push(loadSound('left/17.mp3'));
    left.push(loadSound('left/18.mp3'));
    left.push(loadSound('left/19.mp3'));

    
    right.push(loadSound('right/01.mp3'));
    right.push(loadSound('right/02.mp3'));
    right.push(loadSound('right/03.mp3'));
    right.push(loadSound('right/04.mp3'));
    right.push(loadSound('right/05.mp3'));
    right.push(loadSound('right/06.mp3'));
    right.push(loadSound('right/07.mp3'));
    right.push(loadSound('right/08.mp3'));
    right.push(loadSound('right/09.mp3'));
    right.push(loadSound('right/10.mp3'));
    right.push(loadSound('right/11.mp3'));
    right.push(loadSound('right/12.mp3'));
    right.push(loadSound('right/13.mp3'));
    right.push(loadSound('right/14.mp3'));
    right.push(loadSound('right/15.mp3'));
    right.push(loadSound('right/16.mp3'));
    right.push(loadSound('right/17.mp3'));
    right.push(loadSound('right/18.mp3'));
    right.push(loadSound('right/19.mp3'));
    right.push(loadSound('right/20.mp3'));
    right.push(loadSound('right/21.mp3'));
    right.push(loadSound('right/22.mp3'));
    right.push(loadSound('right/23.mp3'));
    right.push(loadSound('right/24.mp3'));

}


// On window resize, update the canvas size

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}