let genLoopX;
let genLoopY;
let drawLoopX;
let drawLoopY;
let bgColor = 'black'
let interval;

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
        }
            
    }
}

//TODO
function livelyAudioListener(audioArray)
{
    
}

let cellSize = 50;
let offsetStrength = 1000;
let noiseScale = 1;
let framerate = 30;
let speed = 4000;
let colorSpeed = 4000;
let lineWidth = 5;
let seeTrough = false;
let gridSizeMultiplierX = 1.75;
let gridSizeMultiplierY = 2;


canvas.setWidth(window.innerWidth);
canvas.setHeight(window.innerHeight);

canvas.setLineWidth(lineWidth);

recalculateLoopLengths();

interval = setInterval(function(){draw();}, 1000 / framerate);


let positions = [];
let highestY = [];

function recalculateLoopLengths(){
    genLoopX = Math.ceil(window.innerWidth / cellSize + 1) * gridSizeMultiplierX;
    genLoopY = Math.ceil(window.innerHeight / cellSize + 1) * gridSizeMultiplierY;
    drawLoopX = genLoopX - 1;
    drawLoopY = genLoopY - 1;
}


function draw(){
    //const start = performance.now();
    const now = Date.now();
    canvas.drawRect(new Vector2(0, 0), new Vector2(canvas.getWidth(), canvas.getHeight()), bgColor);

    const renderOffsetX = 500;
    const renderOffsetY = 475;

    /*for (let x = 0; x < genLoopX; x++) {
        positions[x] = [];
        for (let y = 0; y < genLoopY; y++) {
            const noisePos = perlin.get(x / Math.ceil(window.innerWidth / cellSize + 1) * noiseScale + (now / speed), y / Math.ceil(window.innerHeight / cellSize + 1) * noiseScale + (now / speed)) * offsetStrength;
            const pos = new Vector2(x * cellSize + noisePos - renderOffsetX, y * cellSize + noisePos - renderOffsetY);

            positions[x][y] = pos;
        }
    }*/

    canvas.ctx.strokeStyle = getRainbowColor(now / colorSpeed);
    
    
    for (let y = 0; y < drawLoopY; y++) {
        
        for (let x = 0; x < drawLoopX; x++) {
            const noisePos = perlin.get(x / Math.ceil(window.innerWidth / cellSize + 1) * noiseScale + (now / speed), y / Math.ceil(window.innerHeight / cellSize + 1) * noiseScale + (now / speed)) * offsetStrength;
            const pos = new Vector2(x * cellSize + noisePos - renderOffsetX, y * cellSize + noisePos - renderOffsetY);

            const noisePosA = perlin.get((x + 1) / Math.ceil(window.innerWidth / cellSize + 1) * noiseScale + (now / speed), y / Math.ceil(window.innerHeight / cellSize + 1) * noiseScale + (now / speed)) * offsetStrength;
            const posA = new Vector2((x + 1) * cellSize + noisePosA - renderOffsetX, y * cellSize + noisePosA - renderOffsetY);

            const noisePosB = perlin.get(x / Math.ceil(window.innerWidth / cellSize + 1) * noiseScale + (now / speed), (y + 1) / Math.ceil(window.innerHeight / cellSize + 1) * noiseScale + (now / speed)) * offsetStrength;
            const posB = new Vector2(x * cellSize + noisePosB - renderOffsetX, (y + 1) * cellSize + noisePosB - renderOffsetY);

            const noisePosC = perlin.get((x + 1) / Math.ceil(window.innerWidth / cellSize + 1) * noiseScale + (now / speed), (y + 1) / Math.ceil(window.innerHeight / cellSize + 1) * noiseScale + (now / speed)) * offsetStrength;
            const posC = new Vector2((x + 1) * cellSize + noisePosC - renderOffsetX, (y + 1) * cellSize + noisePosC - renderOffsetY);
            
            if(seeTrough == false){
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
    if(frametime > 1000 / framerate){
        //console.warn("Can't keep up! Gotten Frametime: " + frametime + " Wanted Frametime: " + 1000 / framerate);
    }*/
}

function getColor(r, g, b){
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}


function getRainbowColor(position) {
    //Calculating Normalized position
    const normalizedPosition = position % 1;
    if (normalizedPosition < 0) {
      normalizedPosition += 1;
    }
  
    //Calculating r, g, b components
    const red = Math.sin(normalizedPosition * Math.PI * 2 + 0) * 127 + 128;
    const green = Math.sin(normalizedPosition * Math.PI * 2 + (2 * Math.PI / 3)) * 127 + 128;
    const blue = Math.sin(normalizedPosition * Math.PI * 2 + (4 * Math.PI / 3)) * 127 + 128;
  
    //Generating Color String
    const color = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
  
    //Returning Color
    return color;
  }