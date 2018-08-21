const bgColor = 50;
const canvasSize = 600;
// ang > 90 = acute; ang < 90 = obtuse
const ang = 5;

var prev_time = 300;
var current_time = 0;
var current_ang = 0;
var prev_lines = [];
var init_x = -prev_time / 2;
var init_y = -prev_time / 2;
var next_y = -1;
var next_x = -1;
var hu = 0;

function setup() {
    noFill();
    colorMode(HSB);
    createCanvas(canvasSize, canvasSize);
    angleMode(DEGREES);
    strokeWeight(4);
}

function draw() {
    background(bgColor);
    translate(canvasSize / 2, canvasSize / 2);
    stroke(prev_lines.length + 1, 255, 255);

    // draw all previous lines
    for (let i = 0; i < prev_lines.length; i++) {
        line(prev_lines[i].x1, prev_lines[i].y1, prev_lines[i].x2, prev_lines[i].y2);
    }

    // so we know what y to start the next square on
    if (next_y == -1 && current_time > sin(ang) * (prev_time) / (cos(ang) + sin(ang)) && prev_lines.length % 4 == 0) {
        next_y = init_y + current_time * sin(current_ang);
        next_x = init_x + current_time * cos(current_ang);
    }

    // start of new line
    if (current_time > prev_time) {

        // gets rid of flicker
        line(init_x, init_y, init_x + current_time * cos(current_ang), init_y + current_time * sin(current_ang));

        current_time--;

        // draw previous lines
        prev_lines.push({
            x1: init_x,
            y1: init_y,
            x2: init_x + current_time * cos(current_ang),
            y2: init_y + current_time * sin(current_ang)
        });


        init_x = init_x + current_time * cos(current_ang);
        init_y = init_y + current_time * sin(current_ang);

        current_time = 0;

        current_ang += 90;

        // start of new square
        if (prev_lines.length % 4 == 0) {
            init_x = next_x;
            init_y = next_y;

            current_ang += ang;
            prev_time = prev_time / (cos(ang) + sin(ang));
            next_y = -1;
            next_x = -1;
        }
    }

    current_time += 2;

    line(init_x, init_y, init_x + current_time * cos(current_ang), init_y + current_time * sin(current_ang));

}