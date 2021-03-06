import {Rectangle, Circle, Composite, IBeam, ZBeam} from './shape.js';
import {Beam, Force, DOWN, UP, LEFT, RIGHT, FixedSupport} from './beam.js';
var nerdamer = require('nerdamer/all');
nerdamer.set('SOLUTIONS_AS_OBJECT', true);

var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

const iBeam = new IBeam({
    topFlangeThickness: 38, 
    webThickness: 25,
    topFlangeWidth: 250,
    botFlangeWidth: 150,
    height: 300 + 38 + 38
});

const beam = new Beam(5, iBeam, 0);
beam.applyAction(new FixedSupport(0, 0, 'Fx', 'Fy', 'M'));
beam.applyAction(new Force(5, 0, 10, DOWN));
console.log("X: " + nerdamer(beam.sumX()));
console.log("Y: " + nerdamer(beam.sumY()));
console.log("M: " + nerdamer(beam.sumMoments(2)));
console.log(beam.solve());

ctx.translate(0, canvas.height);
ctx.scale(1, -1);
ctx.beginPath();
ctx.rect(0, 0, 10, 10);
ctx.fill();
ctx.closePath();

iBeam.draw(ctx);

canvas.addEventListener("click", onClickCanvas);

function onClickCanvas(event) {
    var rect = canvas.getBoundingClientRect();
    console.log("x: " + (event.clientX - rect.left) + " |  y: " + (canvas.height - event.clientY - rect.top));
}

function onClickCalculate(event) {
    console.log("Calculate");
}
