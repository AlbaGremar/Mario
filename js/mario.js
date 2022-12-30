class Mario {
  constructor(ctx) {
    this.ctx = ctx

    this.x = 50
    this.y = 0
    this.y0 = 380
    this.w = 40
    this.h = 55
    this.vx = 0
    this.vy = 0
    this.ax = 0
    this.ay = 0.5

    this.img = new Image()
    this.img.src = 'assets/img/mario_walk.png'
    this.img.frames = 3
    this.img.frameIndex = 0
    this.tick = 0

    this.jumpAudio = new Audio('https://www.myinstants.com/media/sounds/maro-jump-sound-effect_1.mp3')
    this.jumpAudio.volume = 0.1

    this.bullets = []
    this.status = {
      jump: false,
      walk: true
    }
  }

  shoot() {
    const x = this.x + this.w
    const y = this.y + this.h / 2
    const bullet = new Bullet(this.ctx, x, y)
    this.bullets.push(bullet)
  }

  draw() {
    // drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
    if (this.status.walk){
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
    } else if (this.status.jump){
      this.ctx.drawImage(
        this.img,
        0,
        0,
        this.img.width,
        this.img.height,
        this.x,
        this.y,
        this.w,
        this.h
      )
    }
    

    this.bullets.forEach(b => b.draw())

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
      this.status.walk = true;
      this.status.jump = false;
      this.img.src = 'assets/img/mario_walk.png'
    }

    if (this.x <= 0) {
      this.vx = 0
      this.x = 0
    }

    if (this.x + this.w >= this.ctx.canvas.width) {
      this.vx = 0
      this.x = this.ctx.canvas.width - this.w
    }

    this.bullets.forEach(b => b.move())
    
  }

  jump() {
    if (this.y === this.y0) {
      this.jumpAudio.play()
      this.vy = -10
      this.img.src = "assets/img/mario_jump.png"
      this.status.jump = true;
      this.status.walk = false;
    }
    
  }

  onKeyDown(key) {
    switch(key) {
      case RIGHT:
        this.vx = 5
        break;
      case LEFT:
        this.vx = -5
        break;
      case UP:
        this.jump();
        break;
      case SPACE:
        this.shoot()
        break;
    }
  }

  onKeyUp(key) {
    switch(key) {
      case RIGHT:
      case LEFT:
        this.vx = 0
        break;
    }
  }
}