const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let cnt = 0;
let then = Date.now();
const bogols = [];
const render = () => {
  const now = Date.now();
  const elapsed = now - then;
  if (elapsed > 50) {
    then = now;
    cnt += 1;
    cnt %= 200;
    if (cnt % 50 === 0 && bogols.length < 100) {
      for (let i = 0; i < 10; i++) bogols.push(new Bogol());
    }
    canvas.height = wh;
    canvas.width = ww;
    bogols.forEach((bogol) => {
      bogol.update();
      bogol.draw();
    });
  }
  requestAnimationFrame(render);
};

const init = () => {
  canvas.height = wh;
  canvas.width = ww;
  for (let i = 0; i < 10; i++) {
    const newX = (i * ww) / 10 + 10;
    const newBogol = new Bogol((x = newX));
    bogols.push(newBogol);
  }
  requestAnimationFrame(render);
};

let ww = window.innerWidth;
let wh = window.innerHeight;

function Bogol(x = null) {
  this.x = x ? x : Math.random() * ww;
  this.y = wh + Math.random() * 10;
  this.mode = 1;
  this.age = 0;
  this.velocity = Math.random() + 0.5;
}
Bogol.prototype.update = function () {
  this.age += 1;
  switch (Math.floor(this.age / 10) % 12) {
    case 0:
      this.mode = -1;
      break;
    case 1:
      this.mode = -0.6;
      break;
    case 2:
      this.mode = -0.4;
      break;
    case 3:
      this.mode = 0;
      break;
    case 4:
      this.mode = 0.4;
      break;
    case 5:
      this.mode = 0.6;
      break;
    case 6:
      this.mode = 1;
      break;
    case 7:
      this.mode = 0.6;
      break;
    case 8:
      this.mode = 0.4;
      break;
    case 9:
      this.mode = 0;
      break;
    case 10:
      this.mode = -0.4;
      break;
    case 11:
      this.mode = -0.6;
      break;
  }
  if (this.key === "key") console.log(this.mode);
  this.x += (this.velocity * this.mode) / 2;
  this.y -= this.velocity * 2;
  if (this.y < 0) this.y = wh;
};

Bogol.prototype.draw = function () {
  ctx.beginPath();
  ctx.arc(this.x, this.y, 6, 2 * Math.PI, false);
  ctx.fillStyle = "rgba(255, 255, 255, 0.1)";
  ctx.fill();
  ctx.lineWidth = 1;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
  ctx.stroke();
};

window.onload = init;
window.addEventListener("resize", function () {
  ww = window.innerWidth;
  wh = window.innerHeight;
});
