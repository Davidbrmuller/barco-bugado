const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
var engine, world,ground;
var backgroundimg;
var torre, torreimg;
var cannon, angle=20, cannonimg; 
var bala
var balas=[]
var barco
var barcos =[]
var boatanimation=[]
var boatspritedata
var boatspritesheet
var boatsframes
var img;
function preload() {
 backgroundimg=loadImage("assets/background.gif");
 torreimg=loadImage("assets/tower.png");
 boatspritedata=loadJSON("assets/boat/boat.json")
 boatspritesheet=loadImage("assets/boat/boat.png")
}
function setup() {

  canvas = createCanvas(1200, 600);
  engine = Engine.create();
  world = engine.world;
  
 options={
 isStatic:true
 }
 angleMode(DEGREES);
 angle=15;
 ground= Bodies.rectangle(0,height-1, width*2,1,options);
 World.add(world,ground);
 torre=Bodies.rectangle(160,350,160,310,options);
 World.add(world,torre);
 cannon=new Cannon(180,110,130,100,angle)
 barco=new Barco(width-79,height-20,170,170,-80)
boatsframes=boatspritedata.frames 
for (var i=0;i<boatsframes.length;i++){
  var pos =boatsframes[i].position;
  var img=boatspritesheet.get(pos.x,pos.y,pos.w,pos.h);
  boatanimation.push(img)
}
}

function draw() {
  image(backgroundimg,0,0,1200,600);
  Engine.update(engine);
 
 rect(ground.position.x, ground.position.y,width*2,1);
 push();
 imageMode(CENTER);
 image(torreimg,torre.position.x, torre.position.y,160,310); 
   pop();
   cannon.display();
   showbarcos();

   //criando as bolas de canhao de acordo com o compromento da matriz
   for(var i=0;i<balas.length;i++){
  showCannonBall(balas[i],i);
  colisaobarco(i);
}
}
function keyReleased(){
  if (keyCode===DOWN_ARROW){
  balas[balas.length-1].shoot()}//atirando as balas de canhao de dentro da matriz balas 
}
function keyPressed(){
  if(keyCode===DOWN_ARROW){
    bala= new Cannonball(cannon.x,cannon.y)//criando balas de canhao apos a seta para baixo
    balas.push(bala);//adicionando as balas de canhao na matriz
  }
}
//exibindo as balas de canhao de acordo com o indice da matriz(i)
function showCannonBall(bala,i){
  if(bala){
    bala.display();
    if(bala.body.position.x>=width||bala.body.position.y>=height-50){
      bala.remove(i)
    }
  }
}
function showbarcos(){
  //se o comprimento da matriz de barcos é maior que 0 se nao for, criar barco no else (linha 89)
  if(barcos.length>0){
    //se barco for indefinido ou estiver na posicao menor que -300 criar novo barco
        if(barcos[barcos.length-1]===undefined||barcos[barcos.length-1].body.position.x<width-300){
          //vriando barcos em uma posicao aleatoria dentro da matriz posicoes
          var posicoes=[-40,-60,-70,-20]
          var posicao=random(posicoes)
          var barco=new Barco(width,height-100,170,170,posicao,boatanimation)
          //adicionando o barco na matriz barcos
          barcos.push(barco)
        }
        //verificar se tem barcos na matriz, se tiver, exibir barco e adicionar velocidade
for(var i=0;i<barcos.length;i++){
  if(barcos[i]){
    Matter.Body.setVelocity(barcos[i].body,{x:-0.9,y:0})
    barcos[i].display();
    barcos[i].animate()
  }
  else{
    barcos[i];
  }
}
  }
  //estruçao para criar e adicionar o primeiro barco,se nao tiver barcos na matriz
  else{
    var barco=new Barco(width,height-60,170,170,-60,boatanimation)
    barcos.push(barco);
  }
}


function colisaobarco(index){
  for(var i=0;i<barcos.length;i=i+1){
if(balas[index]!==undefined && barcos[i]!==undefined){
  var colisao= Matter.SAT.collides(balas[index].body,barcos[i].body)
  if(colisao.collided){
    barcos[i].remove(i)
    Matter.World.remove(world,balas[index].body)
    delete balas[index]
  }
}

  }
}