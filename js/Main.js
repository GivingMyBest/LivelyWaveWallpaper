let genLoopX;
let genLoopY;
let drawLoopX;
let drawLoopY;
let bgColor = 'black'
let interval;
let rainbow = true;
let lineColor;

const canvas = new Canvas(document.getElementById('canvas'));

function livelyPropertyListener(name, val){
    switch(name){
        case "cellSize":{
            cellSize = val;
            recalculateLoopLengths();
        }break;
        case "offsetStrength":{
            offsetStrength = val;
        }break;
        case "bgColor":{
            bgColor = val;
        }break;
        case "noiseScale":{
            noiseScale = val;
        }break;
        case "framerate":{
            clearInterval(interval);
            framerate = val;
            interval = setInterval(function(){draw();}, 1000 / framerate);
        }break;
        case "speed":{
            speed = val;
        }break;
        case "colorSpeed":{
            colorSpeed = val;
        }break;
        case "lineWidth":{
            lineWidth = val;
            canvas.setLineWidth(val);
        }break;
        case "seeTrough":{
            seeTrough = val;
        }break;
        case "rainbow":{
            rainbow = val;
        }break;
        case "lineColor":{
            lineColor = val;
        }break;   
    }
}

let cellSize = 50;
let offsetStrength = 1000;
let noiseScale = 1;
let framerate = 60;
let speed = 8000;
let settingSpeed = 4000;
let colorSpeed = 4000;
let lineWidth = 5;
let seeTrough = false;
let gridSizeMultiplierX = 1.75;
let gridSizeMultiplierY = 2.15;


canvas.setWidth(window.innerWidth);
canvas.setHeight(window.innerHeight);

canvas.setLineWidth(lineWidth);

recalculateLoopLengths();

interval = setInterval(function(){draw();}, 1000 / framerate);


function recalculateLoopLengths(){
    genLoopX = Math.ceil(window.innerWidth / cellSize + 1) * gridSizeMultiplierX;
    genLoopY = Math.ceil(window.innerHeight / cellSize + 1) * gridSizeMultiplierY;
    drawLoopX = genLoopX - 1;
    drawLoopY = genLoopY - 1;
}


function draw() {
    //const start = performance.now();
    const now = performance.now();
    canvas.drawRect(new Vector2(0, 0), new Vector2(canvas.getWidth(), canvas.getHeight()), bgColor);
  
    const renderOffsetX = 450;
    const renderOffsetY = 475;
  
    canvas.ctx.strokeStyle = rainbow ? getRainbowColor(now / colorSpeed) : lineColor;
  
    const cellSizeFactorX = Math.ceil(window.innerWidth / cellSize + 1);
    const cellSizeFactorY = Math.ceil(window.innerHeight / cellSize + 1);
    const timeFactor = now / speed;
  
    for (let y = 0; y < drawLoopY; y++) {
      for (let x = 0; x < drawLoopX; x++) {
        const noisePos = perlin.get((x / cellSizeFactorX) * noiseScale + timeFactor, (y / cellSizeFactorY) * noiseScale + timeFactor) * offsetStrength;
        const pos = new Vector2(Math.round(x * cellSize + noisePos - renderOffsetX), Math.round(y * cellSize + noisePos - renderOffsetY));
  
        const noisePosA = perlin.get(((x + 1) / cellSizeFactorX) * noiseScale + timeFactor, (y / cellSizeFactorY) * noiseScale + timeFactor) * offsetStrength;
        const posA = new Vector2(Math.round((x + 1) * cellSize + noisePosA - renderOffsetX), Math.round(y * cellSize + noisePosA - renderOffsetY));
  
        const noisePosB = perlin.get((x / cellSizeFactorX) * noiseScale + timeFactor, ((y + 1) / cellSizeFactorY) * noiseScale + timeFactor) * offsetStrength;
        const posB = new Vector2(Math.round(x * cellSize + noisePosB - renderOffsetX), Math.round((y + 1) * cellSize + noisePosB - renderOffsetY));
  
        const noisePosC = perlin.get(((x + 1) / cellSizeFactorX) * noiseScale + timeFactor, ((y + 1) / cellSizeFactorY) * noiseScale + timeFactor) * offsetStrength;
        const posC = new Vector2(Math.round((x + 1) * cellSize + noisePosC - renderOffsetX), Math.round((y + 1) * cellSize + noisePosC - renderOffsetY));
  
        if (!seeTrough) {
          canvas.drawFourCornerFill(pos, posA, posB, posC, bgColor);
        }
  
        canvas.ctx.beginPath();
        canvas.ctx.moveTo(pos.x, pos.y);
        canvas.ctx.lineTo(posA.x, posA.y);
        canvas.ctx.moveTo(pos.x, pos.y);
        canvas.ctx.lineTo(posB.x, posB.y);
        canvas.ctx.stroke();
      }
    }
  
    /*const end = performance.now();
    const frametime = end - start;
    if (frametime > 1000 / framerate) {
      console.warn("Can't keep up! Gotten Frametime: " + frametime + " Wanted Frametime: " + 1000 / framerate);
    }*/
  }
  


function getColor(r, g, b){
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}


function getRainbowColor(position) {
    //Calculate Normalized Position
    const normalizedPosition = (position % 1 + 1) % 1;
  
    //Calculate r, g, b
    const angle = normalizedPosition * 2 * Math.PI;
    const red = Math.sin(angle + 0) * 127 + 128;
    const green = Math.sin(angle + (2 * Math.PI / 3)) * 127 + 128;
    const blue = Math.sin(angle + (4 * Math.PI / 3)) * 127 + 128;
  
    //Generate String
    const color = `rgb(${red}, ${green}, ${blue})`;
  
    //Returning color
    return color;
  }
  
