class Bullet {
  constructor(ctx, x, y, direction) {
    this.ctx = ctx

    this.x = x
    this.y = y
    this.y0 = 440
    this.w = 15
    this.h = 15
    
    this.vx = 10 * direction
    this.vy = 0
    this.ax = 0
    this.ay = 2

    this.img = new Image()
    this.img.src = 'assets/img/fuego.png'
    this.img.frames = 4
    this.img.frameIndex = 0

    this.tick = 0
  }

  draw() {
    //this.ctx.beginPath();
    //this.ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
    //this.ctx.fill();
    //this.ctx.closePath();

    this.ctx.drawImage(
      this.img,
      this.img.frameIndex * this.img.width / this.img.frames,
      0,
      this.img.width / this.img.frames,
      this.img.height,
      this.x,
      this.y,
      this.w,
      this.h
    )
    
    this.tick++
    if (this.tick > 5){
      this.tick = 0
      this.img.frameIndex++

      if (this.img.frameIndex > 3) {
        this.img.frameIndex = 0
      }
    }
  }

  move() {
    this.vx += this.ax
    this.vy += this.ay
    this.x += this.vx
    this.y += this.vy

      if (this.y + this.h > this.y0) {
        this.vy = -17
      }

      if (this.y >= this.y0){
        this.y = this.y0
      }
  }
}