const star = document.querySelector(".star");
const dong = document.querySelector(".dong");

const hideStar = () => (star.style.visibility = "hidden");
const showStar = () => (star.style.visibility = "visible");
const hideDong = () => (dong.style.visibility = "hidden");
const showDong = () => (dong.style.visibility = "visible");

let mouseX = 0;
let mouseY = 0;

function getMousePosition(e) {
  const eObj = window.event ? window.event : e;
  mouseX = eObj.clientX;
  mouseY = eObj.clientY + document.documentElement.scrollTop;
}

function moveStar() {
  const m_x = Number(star.style.left.slice(0, -2));
  const m_y = Number(star.style.top.slice(0, -2));
  star.style.left = m_x + Math.round((mouseX - m_x) / 4) + "px";
  star.style.top = m_y + Math.round((mouseY - m_y) / 4) + 6 + "px";
}

function moveDong() {
  const m_x = Number(dong.style.left.slice(0, -2));
  const m_y = Number(dong.style.top.slice(0, -2));
  dong.style.left = m_x + Math.round((mouseX - m_x) / 8) + "px";
  dong.style.top = m_y + Math.round((mouseY - m_y) / 8) + 8 + "px";
}
document.onmousemove = () => {
  getMousePosition();
};

setInterval(() => {
  moveStar();
  moveDong();
}, 50);

document.addEventListener("mouseleave", () => {
  hideStar();
  hideDong();
});

document.addEventListener("mouseenter", () => {
  showStar();
  showDong();
});
