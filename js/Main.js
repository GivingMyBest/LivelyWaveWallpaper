function livelyPropertyListener(name, val){
    switch(name){
        case "baseColor":{
            baseColor = val;
        }break;
        case "cellSize":{
            cellSize = val;
        }
            
    }
}

function livelyAudioListener(audioArray)
{
    
}

let baseColor = getColor(100, 100, 100);
let cellSize = 125;
let offsetStrength = 1000;
let bgColor = 'brown';
let noiseScale = 1;
let framerate = 60;
let speed = 4000;
let colorSpeed = 4000;
let lineWidth = 3;
let seeTrough = false;

let canvas = new Canvas(document.getElementById('canvas'));

canvas.setWidth(window.innerWidth);
canvas.setHeight(window.innerHeight);

canvas.setLineWidth(lineWidth);

setInterval(function(){draw();}, 1000 / framerate);

let positions = [];


const genLoopX = Math.ceil(window.innerWidth / cellSize + 1) * 1.5;
const genLoopY = Math.ceil(window.innerHeight / cellSize + 1) * 2;

const drawLoopX = genLoopX - 1
const drawLoopY = genLoopY - 1

console.log(perlin.get(0.3, 0.1));
function draw(){
    //const start = performance.now();
    const now = Date.now();
    canvas.drawRect(new Vector2(0, 0), new Vector2(canvas.getWidth(), canvas.getHeight()), bgColor);


    for (let x = 0; x < genLoopX; x++) {
        positions[x] = [];
        for (let y = 0; y < genLoopY; y++) {
            const noisePos = perlin.get(x / Math.ceil(window.innerWidth / cellSize + 1) * noiseScale + (now / speed), y / Math.ceil(window.innerHeight / cellSize + 1) * noiseScale + (now / speed)) * offsetStrength;
            const pos = new Vector2(x * cellSize + noisePos, y * cellSize + noisePos);
            positions[x][y] = pos;
        }
    }
    const renderOffset = 500;
    for (let x = 0; x < drawLoopX; x++) {
        for (let y = 0; y < drawLoopY; y++) {

            const a = new Vector2(positions[x][y].x - renderOffset, positions[x][y].y - renderOffset)
            const b = new Vector2(positions[x + 1][y].x - renderOffset, positions[x + 1][y].y - renderOffset);
            const c = new Vector2(positions[x + 1][y + 1].x - renderOffset, positions[x + 1][y + 1].y - renderOffset);
            const d = new Vector2(positions[x][y + 1].x - renderOffset, positions[x][y + 1].y - renderOffset);

            const color = getRainbowColor(now / colorSpeed + x * y * 10);
            if(seeTrough == false){
                canvas.drawFourCornerFill(a, b, c, d, bgColor);
            }
            
            canvas.drawFourCornerStroke(a, b, c, d, color);
        }
    }
}

function getColor(r, g, b){
    return 'rgb(' + r + ',' + g + ',' + b + ')';
}


function getRainbowColor(position) {
    //Calculating Normalized position
    var normalizedPosition = position % 1;
    if (normalizedPosition < 0) {
      normalizedPosition += 1;
    }
  
    //Calculating r, g, b components
    var red = Math.round(Math.sin(normalizedPosition * Math.PI * 2 + 0) * 127 + 128);
    var green = Math.round(Math.sin(normalizedPosition * Math.PI * 2 + (2 * Math.PI / 3)) * 127 + 128);
    var blue = Math.round(Math.sin(normalizedPosition * Math.PI * 2 + (4 * Math.PI / 3)) * 127 + 128);
  
    //Generating Color String
    var color = 'rgb(' + red + ', ' + green + ', ' + blue + ')';
  
    //Returning Color
    return color;
  }