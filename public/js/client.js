const socket = io();

socket.on('connection', function(){
  console.log(socket.id);
});

//Create the renderer
const renderer = PIXI.autoDetectRenderer(256, 256, {
  //options
  antialias: true,
  autoResize: true,
  resolution: 2
});

renderer.backgroundColor = 0x061639;
renderer.view.style.position = "absolute";
renderer.view.style.display = "block";
renderer.autoResize = true;
renderer.resize(window.innerWidth, window.innerHeight);

  //Create a container object called the `stage`
const stage = new PIXI.Container();
var sprite;

PIXI.loader
  .add("img/explorer.png")
  .load(setup);

function setup() {
  sprite = new PIXI.Sprite(
    PIXI.loader.resources["img/explorer.png"].texture
  );

  //Add the cat to the stage
  stage.addChild(sprite);

  Mousetrap.bind('w', function(){
    sprite.y -= 5;
  });
  Mousetrap.bind('s', function(){
    sprite.y += 5;
  });
  Mousetrap.bind('d', function(){
    sprite.x += 5;
  });
  Mousetrap.bind('a', function(){
    sprite.x -= 5;
  });
  //Start the game loop
  gameLoop();
}

document.addEventListener("DOMContentLoaded", function(event) { 
//Add the canvas to the HTML document
  document.body.appendChild(renderer.view);

});

window.onresize = function(event) {
  renderer.resize(window.innerWidth, window.innerHeight);
}

function gameLoop() {

  //Loop this function at 60 frames per second
  requestAnimationFrame(gameLoop);

  //Render the stage to see the animation
  renderer.render(stage);
}
