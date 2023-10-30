let xCircle = 300;
let yCircle = 200;
let diametro = 23;

let velx = 6;
let vely = 6;
let raio = diametro / 2;

let xRect = 5;
let yRect = 150;
let rectwidth = 10;
let rectheight = 90;

let hit = false;

let xRectCPU = 585;
let yRectCPU = 150;
let velycpu;

let mistake = 0;

let myScore = 0;
let cpuScore = 0;

let soundtrack;
let scoresound;
let rectsound;

function preload() {
  soundtrack = loadSound("trilha.mp3");
  scoresound = loadSound("ponto.mp3");
  rectsound = loadSound("raquetada.mp3");
}

function setup() {
  createCanvas(600, 400);
  soundtrack.loop();
}

function draw() {
  background(0);
  showCircle();
  moveCircle();
  colideCircle();
  //desbugBall();
  showRect(xRect, yRect);
  showRect(xRectCPU, yRectCPU);
  //moveRect();
  //moveRectCPU();
  Ariany();
  Melissa();
  //colideRect();
  collide(xRect, yRect);
  collide(xRectCPU, yRectCPU);
  score();
  makeScore();
}

function showCircle() {
  circle(xCircle, yCircle, diametro);
}

function moveCircle() {
  xCircle += velx;
  yCircle += vely;
}

function colideCircle() {
  if (xCircle + raio > width || xCircle - raio < 0) {
    velx *= -1;
  }
  if (yCircle + raio > height || yCircle - raio < 0) {
    vely *= -1;
  }
}

function desbugBall() {
    if (xCircle - raio < 0) {
    xCircle = 23;
    }
}

function showRect(x,y) {  
  rect(x, y, rectwidth, rectheight);
}

function moveRectCPU() {
velycpu = yCircle - yRectCPU - rectwidth / 2 - 30;
  yRectCPU += velycpu + mistake;
  calcMistake();
  
  yRectCPU = constrain(yRectCPU, 0, height);
}

function calcMistake() {
  if (cpuScore >= myScore) {
    mistake += 1
    if (mistake >= 39){
    mistake = 40
    }
  } else {
    mistake -= 1
    if (mistake <= 35){
    mistake = 35
    }
  }
}

function Ariany() {
  if (keyIsDown(87)) {
    yRect -= 10;
  }
  if (keyIsDown(83)) {
    yRect += 10;
  }
  
  yRect = constrain(yRect, 0, 310);
}

function Melissa() {
  if (keyIsDown(UP_ARROW)) {
    yRectCPU -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRectCPU += 10;
  }
  
  yRectCPU = constrain(yRectCPU, 0, 310);
}

function moveRect() {
  if (keyIsDown(UP_ARROW)) {
    yRect -= 10;
  }
  if (keyIsDown(DOWN_ARROW)) {
    yRect += 10;
  }
  
  yRect = constrain(yRect, 0, 310);
}

function colideRect() {
  if (xCircle - raio < xRect + rectwidth && yCircle - raio > yRect && yCircle + raio < yRect + rectheight) {
    velx *= -1;
  }
}

function collide(x,y) {
  hit = collideRectCircle(x, y, rectwidth, rectheight, xCircle, yCircle, raio);
  if (hit) {
    velx *= -1;
    rectsound.play();
  }
}  

function score() {
  stroke(255);
  textAlign(CENTER);
  textSize(16);
  fill(color(255, 140, 0));
  rect(150, 10 ,40 , 20);
  fill(255);
  text(myScore, 170, 25);
  fill(color(255, 140, 0));
  rect(450,10, 40, 20);
  fill(255);
  text(cpuScore, 470, 25);
}

function makeScore() {
  if (xCircle - raio < 0) {
    cpuScore += 1;
    scoresound.play();
  }
  if (xCircle + raio > 600) {
    myScore += 1;
    scoresound.play();
  }
}