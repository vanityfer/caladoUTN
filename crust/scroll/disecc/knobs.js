var x_p;
var y_p = 50;
var d_p = 15;


var x_s;
var y_s = 50;
var d_s = 20;


function stop() {

x_p = windowWidth - 100;
x_s = windowWidth - 100 + 50;

    if (mouseIsPressed == true) {

        if (dist(mouseX, mouseY, x_s, y_s) < d_s / 2 && mouseButton == LEFT) {

            fill(0); // Black
            stopped = true;
            for (let i = 0; i < left.length; i++) {
                left[i].stop();
            }
            for (let i = 0; i < right.length; i++) {
                right[i].stop();
            }
            // for (let i = 0; i < left.length; i++) {

            //     left[i].addCue(left[i].duration(), random(left).stop());
            // }

            // for (let i = 0; i < right.length; i++) {

            //     right[i].addCue(right[i].duration(), random(right).stop());
            // }


        }

    } else {

        fill(255); // Gray

    }

    noStroke();
    rectMode(CENTER);
    rect(x_s, y_s, d_s, d_s);

}



function play() {


    if (mouseIsPressed == true) {

        if (dist(mouseX, mouseY, x_p, y_p) < d_p / 2 && mouseButton == LEFT) {

            fill(0); // Black

            // for (let i = 0; i < left.length; i++) {

            //     left[i].addCue(left[i].duration(), random(left).loop());
            //     left[i].setVolume(0);

            // }

            // for (let i = 0; i < right.length; i++) {

            //     right[i].addCue(right[i].duration(), random(right).loop());
            //     right[i].setVolume(0);

            // }
            // random(left).play();
            // random(right).play();
            stopped = false;
            playNextLeft();
            playNextRight();

        }

    } else {

        fill(255); // Gray

    }

    noStroke();
    polygon(x_p, y_p, d_p, 3);
}


function knob() {

    push();

    const w = max(0, min(1, mouseX / width));
    translate(width / 2, height / 2);
    noStroke();
    //fill(200);
    fill(255);

    ellipse(0, 0, 130, 130);

    rotate(-40 + w * 4.6);
    //print(mouseX);
    fill(0, 0, 0);
    rectMode(CENTER);
    rect(0, -50, 8, 30);

    pop();

}


function pan_vis(){
        if (stopped == false && mouseX <= windowWidth / 2 + 10) {
             izquierda();
    }

         if (stopped == false && mouseX >= windowWidth / 2 - 10) {
             derecha();
    }
}

function paneando() {



    if (mouseX <= windowWidth / 2 + 10) {

        for (let i = 0; i < left.length; i++) {

            left[i].setVolume(0.1);

        }

}

    if (mouseX <= windowWidth / 2 - 10) {

        for (let i = 0; i < right.length; i++) {

            right[i].setVolume(0);

        }

    }

    if (mouseX >= windowWidth / 2 + 10) {

        for (let i = 0; i < left.length; i++) {

            left[i].setVolume(0);

        }
    }

    if (mouseX >= windowWidth / 2 - 10) {

        for (let i = 0; i < right.length; i++) {

            right[i].setVolume(0.3);

        }
    }
}




/*
function paneando() {

    if (mouseX <= windowWidth / 2 - 120) {

        for (let i = 0; i < left.length; i++) {
            left[i].addCue(left[i].duration(), random(left).play());
        }
    }

    if (mouseX >= windowWidth / 2 + 20) {

        for (let i = 0; i < left.length; i++) {
            left[i].addCue(left[i].duration(), random(right).play());

        }

    }
}
*/

// boton de play! (triangle)

function polygon(x, y, radius, sides = 3, angle = 0) {

    beginShape();
    for (let i = 0; i < sides; i++) {
        const a = angle + TWO_PI * (i / sides);
        let sx = x + cos(a) * radius;
        let sy = y + sin(a) * radius;
        vertex(sx, sy);
    }

    endShape(CLOSE);

}