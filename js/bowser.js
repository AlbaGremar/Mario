class Bowser {
    constructor(ctx) {
      this.ctx = ctx
  
      this.x = 1000
      this.y = 300
      this.y0 = 363
      this.w = 70
      this.h = 70
      this.vx = -4
      this.vy = 0
      this.ax = 0
      this.ay = 1
  
      this.img = new Image()
      this.img.src = 'assets/img/bowser.png'
      this.img.frames = 4
      this.img.frameIndex = 0
      this.tick = 0
      
    }

    draw() {
      // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
  
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

      this.animate()
    }

    animate() {
      this.tick++
  
      if (this.tick > 15) {
        this.tick = 0
        this.img.frameIndex++
  
        if (this.img.frameIndex > this.img.frames - 1) {
          this.img.frameIndex = 0
        }  
      }
    }

    move() {
      this.vx += this.ax
      this.vy += this.ay
      this.x += this.vx
      this.y += this.vy
  
      if (this.y >= this.y0) {
        this.y = this.y0
        this.vy = 0
      }
    }
    isVisible() {
      return this.x + this.w >= 0 && this.x <= this.ctx.canvas.width
    }

  }