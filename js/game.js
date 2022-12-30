class Game {
  constructor(ctx) {
    this.ctx = ctx

    this.interval = null
    this.bg = new Background(ctx)
    this.mario = new Mario(ctx)
    this.audio = new Audio("https://www.myinstants.com/media/sounds/untitled_3.mp3")
    this.obstacle = new Obstacle(ctx)

    this.mushrooms = []

    this.count = 0
  }

  start() {
    this.stop()
    this.audio.play()
    this.initListeners()

    this.interval = setInterval(() => {
      this.clear()
      this.draw()
      this.checkCollisions()
      this.move()
      this.count++
      if (this.count > 150){
        this.count = 0
        this.addEnemy()
      }
    }, 1000 / 60)
  }

  initListeners() {
    document.onkeydown = (e) => {
      this.mario.onKeyDown(e.keyCode)
    }

    document.onkeyup = (e) => {
      this.mario.onKeyUp(e.keyCode)
    }
  }

  stop() {
    clearInterval(this.interval)
  }

  draw() {
    this.bg.draw()
    this.mario.draw()
    this.mushrooms.forEach((mushroom) => {mushroom.draw()})
    this.obstacle.draw()
  }

  move() {
    this.bg.move()
    this.mario.move()
    this.mushrooms.forEach((mushroom) => {mushroom.move()})
    this.obstacle.move()
  }

  clear() {
    this.ctx.clearRect(
      0,
      0,
      this.ctx.canvas.width,
      this.ctx.canvas.height,
    )
  }

  addEnemy(){
    const mushroom = new Mushroom(this.ctx)
    this.mushrooms.push(mushroom)
  }

  clearMushrooms(mushroom){
    this.mushrooms = this.mushrooms.filter(mush => mush !== mushroom)
  } 
  
  checkCollisions() {
    const m = this.mario

    this.mushrooms.forEach(mushroom => {
      const colX = (m.x + m.w) >= mushroom.x && (mushroom.x + mushroom.w) >= m.x
      const colY = (mushroom.y + mushroom.h) >= m.y && mushroom.y <= (m.y + m.h)
      const step = m.status.jump && m.y + m.h >= mushroom.y && m.x + m.w >= mushroom.x && m.x <= mushroom.x + mushroom.w

      if (step){
        this.clearMushrooms(mushroom)
      } else if (colX && colY) {
        this.gameOver()
      } 
    })
    
  }
  gameOver() {
    this.stop()	
    alert("Game Over");
  }
}