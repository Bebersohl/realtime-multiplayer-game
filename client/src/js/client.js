"use strict"

import threex from './lib/keyboard';
import pixi from 'pixi.js';
import renderer from './generateRenderer';
import socket from './io';

let sprites = [];
//Create a container object called the `stage`
const stage = new pixi.Container();
pixi.loader
  .add("img/explorer.png")
  .load(setup);
socket.on('new player', (packet) => {
  generateExplorer(packet.id);
  console.log(packet.id);
});
socket.on('player left', (packet) => {
  for(let i=0; i < sprites.length; i++){
    if(sprites[i].id === packet.id){
      stage.removeChild(sprites[i]);
      sprites.splice(i, 1);
    }
  }
});
socket.on('update', (packet) => {

  for(let i=0; i < packet.players.length; i++){
    //if sprites doesnt have id -> add it
    let player = packet.players[i];

    let doesContain = sprites.find((sprite) => {
      return sprite.id === player.id;
    })
    if (!doesContain){
      generateExplorer(player.id);
    }else{
      //update position
      doesContain.x = player.x;
      doesContain.y = player.y;
    }
  }

});
function generateExplorer(socketID){
  sprites.push(new pixi.Sprite(pixi.loader.resources["img/explorer.png"].texture));
  sprites[sprites.length - 1].vx = 0;
  sprites[sprites.length - 1].vy = 0;
  sprites[sprites.length - 1].x = 100;
  sprites[sprites.length - 1].y = 100;
  sprites[sprites.length - 1].id = socketID;
  //Add the cat to the stage
  stage.addChild(sprites[sprites.length - 1]);
}
function setup() {
  const player_speed = 100;
  generateExplorer(socket.id);
  console.log(sprites[0].id);
  var keyboard = new threex.KeyboardState(renderer.domElement);
  keyboard.domElement.addEventListener('keydown', function(event){
    if (event.repeat) {
      return;
    }
    if ( keyboard.eventMatches(event, 'A') || keyboard.eventMatches(event, 'left')){
      sprites[0].vx -= player_speed * DELTA;
    }
    if ( keyboard.eventMatches(event, 'D') || keyboard.eventMatches(event, 'right')){
      sprites[0].vx += player_speed * DELTA;
    }
    if ( keyboard.eventMatches(event, 'W') || keyboard.eventMatches(event, 'up')){
      sprites[0].vy -= player_speed * DELTA;
    }
    if ( keyboard.eventMatches(event, 'S') || keyboard.eventMatches(event, 'down')){
      sprites[0].vy += player_speed * DELTA;
    }
  })

  keyboard.domElement.addEventListener('keyup', function(event){
    if (event.repeat) {
      return;
    }
    if ( keyboard.eventMatches(event, 'A') || keyboard.eventMatches(event, 'left')){
      sprites[0].vx = 0;
    }
    if ( keyboard.eventMatches(event, 'D') || keyboard.eventMatches(event, 'right')){
      sprites[0].vx = 0;
    }
    if ( keyboard.eventMatches(event, 'W') || keyboard.eventMatches(event, 'up')){
      sprites[0].vy = 0;
    }
    if ( keyboard.eventMatches(event, 'S') || keyboard.eventMatches(event, 'down')){
      sprites[0].vy = 0;
    }
  })

  //Start the game loop
  animate(performance.now())
}

function animate(t) {
  let lastframetime;
  window.DELTA = lastframetime ? ((t - lastframetime) / 1000.0) : 0.016;
  lastframetime = t;
  // draw
  sprites[0].x += sprites[0].vx;
  sprites[0].y += sprites[0].vy;
  socket.emit('new position', {x: sprites[0].x, y: sprites[0].y});
  renderer.render(stage);
  // request another frame
  requestAnimationFrame(animate);
}
