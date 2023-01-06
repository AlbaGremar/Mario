class Game {
  constructor(ctx) {
    this.ctx = ctx

    this.interval = null
    this.bg = new Background(ctx)
    this.mario = new Mario(ctx)
    this.audio = new Audio("https://www.myinstants.com/media/sounds/untitled_3.mp3")
    this.obstacle = new Obstacle(ctx)
    this.audiodead = new Audio("https://www.myinstants.com/media/sounds/10-mario-died.mp3")
    //this.obstacle = []
    this.mushrooms = []
    this.coins =[]
    this.count = 0
    this.countcoin = 0
    this.score = 0
    this.maxRandom = 10000
  }

  start() {
    this.stop()
    this.audio.play()
    this.initListeners()

    this.interval = setInterval(() => {
      this.clear()
      this.draw()
      this.checkShoot()
      this.checkCollisions()
      this.move()
      this.count++
      if (this.count > Math.random() * this.maxRandom){
        this.count = 0
        this.addEnemy()
        this.maxRandom -= 300

        if (this.maxRandom < 0) {
          this.maxRandom = 1000
        }
      }
      this.countcoin++
      if (this.countcoin > Math.random() * this.maxRandom){
        this.countcoin = 0
        this.addCoin()
        this.maxRandom -= 100

        if (this.maxRandom < 0) {
          this.maxRandom = 1000
        }
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
    this.coins.forEach((coin) => {coin.draw()})
    this.obstacle.draw()
  }

  move() {
    this.bg.move()
    this.mario.move()
    this.mushrooms.forEach((mushroom) => {mushroom.move()})
    this.coins.forEach((coin) => {coin.move()})
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

  addCoin(){
    const coin = new Coin(this.ctx)
    this.coins.push(coin)
  }

  clearMushrooms(mushroom){
    this.mushrooms = this.mushrooms.filter(mush => mush !== mushroom)
  } 
  clearBullet(bullet){
    this.mario.bullets = this.mario.bullets.filter(bull => bull !== bullet)
  }
  clearCoins(coin){
    this.coins = this.coins.filter(coi => coi !== coin)
  } 
  
  checkCollisions() {
    const m = this.mario

    this.mushrooms.forEach(mushroom => {
      const colX = (m.x + m.w) >= mushroom.x && (mushroom.x + mushroom.w) >= m.x
      const colY = (mushroom.y + mushroom.h) >= m.y && mushroom.y <= (m.y + m.h)
      const step = m.status.jump && m.y + m.h >= mushroom.y && m.x + m.w >= mushroom.x && m.x <= mushroom.x + mushroom.w

      if (step){
        this.score += 100
        scorec.innerHTML = this.score
        scorecfin.innerHTML = this.score
        this.clearMushrooms(mushroom)
        
      } else if (colX && colY) {
        this.gameOver()
      } 
    })
  }
  checkShoot(){
    this.mushrooms.forEach(m => {
      this.mario.bullets.forEach(b => {
        const colX = b.x + b.w >= m.x && b.x <= m.x + m.w
        const colY = b.y + b.h >= m.y && b.y <= m.y + m.h
    
        if (colX && colY) {
          this.clearMushrooms(m)
          this.clearBullet(b)
          
          this.score += 30
          scorec.innerHTML = this.score
          scorecfin.innerHTML = this.score
        }
      })
    })
  }
  checkCollisionsCoins() {
    this.coins.forEach(c => {
      const colX = m.x + m.w >= c.x && m.x <= c.x + c.w
      const colY = m.y + m.h >= c.y && m.y <= c.y + c.h
      if (colX && colY) {
        console.log("hola")
        this.score += 50
        scorec.innerHTML = this.score
        scorecfin.innerHTML = this.score
        this.clearCoins(c)
      }
    })
  }

  gameOver() {
    this.stop()	
    this.audio.pause()
    this.audiodead.play()
    canvas.style.display = 'none';
    const gameover = document.getElementById("gameover")
    gameover.style.display = 'block';
  }
}