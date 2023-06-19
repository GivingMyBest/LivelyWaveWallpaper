class Vector2{
    x;
    y;

    constructor(x, y){
        this.x = x;
        this.y = y;
    }

    add(x, y){
        return new Vector2(this.x + x, this.y + y);
    }
}