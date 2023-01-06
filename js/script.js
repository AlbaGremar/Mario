const canvas = document.getElementById("game")
const ctx = canvas.getContext("2d")
const puntuacion = document.getElementById("puntuacion")

const scorec = document.querySelector("#scorec")

const btn = document.getElementById("start-btn")
btn.onclick = () => {
  const game = new Game(ctx)
  const welcome = document.getElementById("welcome")
  welcome.remove()
  game.start()
  canvas.style.display = 'block';
  puntuacion.style.display = 'block';
  
}

const btnrestar = document.getElementById("re-start-btn")
btnrestar.onclick = () => {
  const game = new Game(ctx)
  const gameover = document.getElementById("gameover")
  gameover.style.display = "none"
  game.start()
  canvas.style.display = 'block';
  puntuacion.style.display = 'block';
  scorec.innerText = '0'

}


