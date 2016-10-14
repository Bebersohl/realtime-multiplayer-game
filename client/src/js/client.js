"use strict"

import threex from './keyboard';
import pixi from 'pixi.js';

var fpsInterval, lastDrawTime, frameCount, lastSampleTime;
var intervalID, requestID, then;
var DELTA = .033;
//Create the renderer
const renderer = pixi.autoDetectRenderer(window.innerWidth, window.innerHeight, {
  //options
  antialias: true,
  autoResize: true,
  resolution: 2
});

renderer.backgroundColor = 0x061639;
renderer.view.style.position = "absolute";
renderer.view.style.display = "block";
renderer.autoResize = true;
var keyboard = new threex.KeyboardState(renderer.domElement);
  //Create a container object called the `stage`
const stage = new pixi.Container();
var sprite;

pixi.loader
  .add("img/explorer.png")
  .load(setup);

function setup() {
  sprite = new pixi.Sprite(
    pixi.loader.resources["img/explorer.png"].texture
  );
  sprite.vx = 0;
  sprite.vy = 0;
  sprite.x = window.innerWidth / 2;
  sprite.y = window.innerHeight / 2;

  keyboard.domElement.addEventListener('keydown', function(event){
    if (event.repeat) {
      return;
    }
    if ( keyboard.eventMatches(event, 'A') || keyboard.eventMatches(event, 'left')){
      sprite.vx -= 100 * DELTA;   
    }
    if ( keyboard.eventMatches(event, 'D') || keyboard.eventMatches(event, 'right')){
      sprite.vx += 100 * DELTA;   
    }
    if ( keyboard.eventMatches(event, 'W') || keyboard.eventMatches(event, 'up')){
      sprite.vy -= 100 * DELTA;   
    }
    if ( keyboard.eventMatches(event, 'S') || keyboard.eventMatches(event, 'down')){
      sprite.vy += 100 * DELTA;   
    }
  })

  keyboard.domElement.addEventListener('keyup', function(event){
    if (event.repeat) {
      return;
    }
    if ( keyboard.eventMatches(event, 'A') || keyboard.eventMatches(event, 'left')){
      sprite.vx = 0;   
    }
    if ( keyboard.eventMatches(event, 'D') || keyboard.eventMatches(event, 'right')){
      sprite.vx = 0;   
    }
    if ( keyboard.eventMatches(event, 'W') || keyboard.eventMatches(event, 'up')){
      sprite.vy = 0;   
    }
    if ( keyboard.eventMatches(event, 'S') || keyboard.eventMatches(event, 'down')){
      sprite.vy = 0;   
    }
  })

  //Add the cat to the stage
  stage.addChild(sprite);


  //Start the game loop
  then = Date.now();
  startAnimating(60, 1000);
}

document.addEventListener("DOMContentLoaded", function(event) { 
//Add the canvas to the HTML document
  document.body.appendChild(renderer.view);

});

window.onresize = function(event) {
  renderer.resize(window.innerWidth, window.innerHeight);
}

function startAnimating(fps, sampleFreq) {
    fpsInterval = 1000 / fps;
    lastDrawTime = performance.now();
    lastSampleTime = lastDrawTime;
    frameCount = 0;
    
    animate();
    
    intervalID = setInterval(sampleFps, sampleFreq);
}

function animate(now) {
    // request another frame
    
    requestID = requestAnimationFrame(animate);

    // calc elapsed time since last loop
    var elapsed = now - lastDrawTime;
    
    // if enough time has elapsed, draw the next frame
    if (elapsed > fpsInterval) {

        // Get ready for next frame by setting lastDrawTime=now, but...
        // Also, adjust for fpsInterval not being multiple of 16.67
        lastDrawTime = now - (elapsed % fpsInterval);

        DELTA = elapsed / 1000;
        console.log(DELTA);
        sprite.x += sprite.vx;
        sprite.y += sprite.vy
        // draw
        renderer.render(stage);

        frameCount++;
    }
}

function sampleFps() {
    // sample FPS
    var now = performance.now();
    if (frameCount > 0) {
        var currentFps =
            (frameCount / (now - lastSampleTime) * 1000).toFixed(2);
        
        frameCount = 0;
        
    }
    lastSampleTime = now;
}
