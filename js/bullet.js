class Bullet {
  constructor(ctx, x, y) {
    this.ctx = ctx

    this.x = x
    this.y = y
    this.r = 5
    this.vx = 10
    this.vy = 0
    this.ax = 0
    this.ay = 0.5
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.closePath()
  }

  move() {
    this.vx += this.ax
    this.vy += this.ay
    this.x += this.vx
    this.y += this.vy

      if (this.y > 320) { // TODO: not magic number
        this.vy *= -1
      }
  }
}