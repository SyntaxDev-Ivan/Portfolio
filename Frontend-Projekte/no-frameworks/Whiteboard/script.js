//Whiteboard mit den Einstellungen: Farbe, Größe
//Eher für größere Geräte geeignet, da nicht responsive!

window.onload = () => load()

function load() {
  var canvas = document.querySelector("canvas")
  canvas.width = window.innerWidth - window.innerWidth / 10
  canvas.height = window.innerHeight - window.innerHeight / 15
  canvas.style.border = ".5vw solid black"

  const centerX = canvas.width / 2
  const centerY = canvas.height / 2

  var ctx = canvas.getContext("2d")

  let paintingColor = "black"
  let isPainting = false
  let paintingSize = 9

  addAllEventListener()

  function start(ev) {
    isPainting = true
    draw(ev)
  }

  function end() {
    isPainting = false
    ctx.beginPath()
  }

  function draw(ev) {
    if(!isPainting) return

    ctx.lineWidth = paintingSize
    ctx.lineCap = "round"
    ctx.lineTo(ev.clientX, ev.clientY)
    ctx.strokeStyle = paintingColor
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(ev.clientX, ev.clientY)
  }

  function switchColor(ev) {
    let color = ev.path[0].classList[1]
    let currentColor = document.querySelector(".currentColor")
    currentColor.innerHTML = `
    <div class="color ${color}"></div>
    `
    paintingColor = color
  }

  function switchSize(ev) {
    paintingSize = ev.target.value

  }

  function addAllEventListener() {
    canvas.addEventListener("mousedown", start)
    canvas.addEventListener("mouseup", end)
    canvas.addEventListener("mousemove", draw)
    document.querySelectorAll(".color").forEach(elm => {
      elm.addEventListener("click", switchColor)
    })
    document.querySelector(".size-input").addEventListener("click", switchSize)
    document.querySelector(".size-input").addEventListener("change", switchSize)

  }

  
}