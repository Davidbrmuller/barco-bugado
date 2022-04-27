class Barco {
    constructor(x,y,width,height,barcopos,boatanimation){
        this.animation=boatanimation
        this.speed=0.05
        this.x=x;
        this.y=y;
        this.width=width;
        this.height=height
        this.barcopos=barcopos;
this.body=Bodies.rectangle(x,y,width,height);
this.image=loadImage("assets/boat.png")
World.add(world,this.body);
    }
    remove(i){
        setTimeout(()=>{
        Matter.World.remove(world,barcos[i].body)
        delete barcos[i]},2000)
    }
    animate(){
        this.speed+=0.05
    }
    display(){
var pos=this.body.position;
var index =floor(this.speed%this.animation.lenght)
var angle=this.body.angle;
push()
translate(pos.x,pos.y)
rotate(angle);
imageMode(CENTER)
image(this.animation[index],0,this.barcopos,this.width,this.height)
pop();
    }
}