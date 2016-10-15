import renderer from './generateRenderer';
import './io';
import './client';

//config variables





document.addEventListener("DOMContentLoaded", function(event) {
  //Add the canvas to the HTML document
  document.body.appendChild(renderer.view);
});

window.onresize = function(event) {
  renderer.resize(window.innerWidth, window.innerHeight);
}
