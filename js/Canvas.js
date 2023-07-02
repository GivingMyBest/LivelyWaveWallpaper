class Canvas{
    canvas;
    ctx;

    constructor(canvas){
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d', {alpha: false});
    }

    drawRect(pos, size, color){
        this.ctx.fillStyle = color;
        this.ctx.fillRect(pos.x, pos.y, size.x, size.y);
    }
    drawFourCornerStroke(a, b, c, d, color){
        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo(a.x, a.y);
        this.ctx.lineTo(b.x, b.y);
        this.ctx.lineTo(c.x, c.y);
        this.ctx.lineTo(d.x, d.y);
        //this.ctx.closePath();
        this.ctx.stroke();
    }
    drawFourCornerFill(a, b, c, d, color){
        this.ctx.fillStyle = color;
        this.ctx.beginPath();
        this.ctx.moveTo(b.x, b.y);
        this.ctx.lineTo(a.x, a.y);
        this.ctx.lineTo(c.x, c.y);
        this.ctx.lineTo(d.x, d.y);
        this.ctx.closePath();
        this.ctx.fill();
    }


    getWidth(){
        return this.canvas.width;
    }
    getHeight(){
        return this.canvas.height;
    }
    setWidth(width){
        this.canvas.width = width;
    }
    setHeight(height){
        this.canvas.height = height;
    }

    setLineWidth(width){
        this.ctx.lineWidth = width;
    }
}