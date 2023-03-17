function Dot(obj) {
  this.x = obj.x || 100;
  this.y = obj.y || 100;
  this.radius = obj.radius;
  this.speedX = obj.speedX || 1;
  this.speedY = obj.speedY || 2;
  this.color = obj.color || "black";
  this.width = obj.width;
  this.height = obj.height;
}

Dot.prototype.draw = function () {
  context.fillStyle = this.color;
  context.beginPath();
  context.arc(
    this.x,
    this.y,
    this.radius,
    (Math.PI / 180) * 0,
    (Math.PI / 180) * 360
  );
  context.fill();
};

Dot.prototype.move = function () {
  this.x += this.speedX;
  this.y += this.speedY;
};

Dot.prototype.start = function () {
  this.draw();
  this.move();
  this.check();
};

// 碰撞检测
Dot.prototype.check = function () {
  this.speedX =
    this.x >= this.width - this.radius || this.x <= this.radius
      ? -this.speedX
      : this.speedX;
  this.speedY =
    this.y >= this.height - this.radius || this.y <= this.radius
      ? -this.speedY
      : this.speedY;
};

// 创建小球
function createDot(width, height, num, radius) {
  let arr = [];
  for (let i = 0; i < num; i++) {
    let obj = {};
    let x = Math.floor(Math.random(0, 1) * 100) + radius;
    let y = Math.floor(Math.random(0, 1) * 100) + radius;
    let color = Math.random().toString(16).slice(2, 8);
    let speedX = Math.floor(Math.random(0, 1) * 10);
    let speedY = Math.floor(Math.random(0, 1) * 10);
    if (speedX === 0 || speedY == 0) {
      speedX = 1;
    }

    obj["x"] = x;
    obj["y"] = y;
    obj["color"] = "#" + color;
    obj["speedX"] = speedX;
    obj["speedY"] = speedY;
    obj["width"] = width;
    obj["height"] = height;
    obj["radius"] = radius;
    // console.log(new Dot(obj));
    arr.push(new Dot(obj));
  }
  startMove(width, height, arr);
}
let timer2 = null;
// 小球开始移动
function startMove(width, height, arr) {
  timer2 = setInterval(() => {
    // console.log(1111);
    context.clearRect(0, 0, width, height);
    arr.forEach((item) => {
      item.start();
    });
  }, 15);
}

// 清除画布
function clear(width, height) {
  clearInterval(timer2);
  context.clearRect(0, 0, width, height);
}
