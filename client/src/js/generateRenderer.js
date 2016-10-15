import {autoDetectRenderer} from 'pixi.js';

//Create the renderer
const renderer = autoDetectRenderer(window.innerWidth, window.innerHeight, {
  //options
  antialias: true,
  autoResize: true,
  resolution: 2
});

renderer.backgroundColor = 0x061639;
renderer.view.style.position = "absolute";
renderer.view.style.display = "block";
renderer.autoResize = true;

export default renderer;
