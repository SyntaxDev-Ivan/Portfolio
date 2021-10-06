window.onload = () => load()

async function load() {

  /* 
  [1][2][3]
  [4][5][6]
  [7][8][9]
  */

  /*Datenstruktur*/
  let circleTurn = false;
  let fieldsLeft = 9

  let combinations = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 5, 9],
    [3, 5, 7],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9]
  ]
  /*Datenstruktur*/


  addAllEventListener()

  function mouseEntersField(ev) {
    ev.path[0].innerHTML = (circleTurn) ? "O" : "X"
  }

  async function fieldClicked(ev, elm) {
    ev.target.removeEventListener("mouseenter", mouseEntersField)
    ev.target.classList.remove("field")
    ev.target.classList.add("taken")
    insertInCombis(ev.target.id, (circleTurn ? "o" : "x"))
    fieldsLeft--
    circleTurn = !circleTurn

    var results = isWinner()

    if (results.isWinner) {
      await new Promise(resolve => setTimeout(resolve, 1))
      showResult(`${(results.winner).toString().toLocaleUpperCase()} hat gewonnen!`)
      return
    }
    if (isDraw()) {
      await new Promise(resolve => setTimeout(resolve, 1))
      showResult("Unentschieden!")
    }

  }

  function insertInCombis(num, value) {
    for (let i = 0; i < combinations.length; i++) {
      for (let j = 0; j < combinations[i].length; j++) {
        if (combinations[i][j] == parseInt(num)) {
          combinations[i][j] = value
        }
      }
    }
  }

  function showResult(result) {
    document.querySelector(".winResult").style.display = "flex"
    document.querySelector(".winResult p").innerHTML = result
  }

  function isWinner() {
    for (let i = 0; i < combinations.length; i++) {
      if (combinations[i][0] == combinations[i][1] &&
        combinations[i][0] == combinations[i][2]) {
        return {
          isWinner: true,
          winner: combinations[i][0]
        }
      }
    }

    return {
      isWinner: false
    }

  }

  function isDraw() {
    if (fieldsLeft <= 0) return true
    return false
  }

  function resetHtml() {
    document.querySelector(".grid").innerHTML = `
    <div class="field left-column top-row">
      <p class="inner-field" id="1"></p>
    </div>
    <div class="field top-row">
      <p class="inner-field" id="2"></p>
    </div>
    <div class="field right-column top-row">
      <p class="inner-field" id="3"></p>
    </div>
    <div class="field left-column">
      <p class="inner-field" id="4"></p>
    </div>
    <div class="field">
      <p class="inner-field" id="5"></p>
    </div>
    <div class="field right-column">
      <p class="inner-field" id="6"></p>
    </div>
    <div class="field left-column bottom-row">
      <p class="inner-field" id="7"></p>
    </div>
    <div class="field bottom-row">
      <p class="inner-field" id="8"></p>
    </div>
    <div class="field bottom-row right-column" id="9">
      <p class="inner-field" id="9"></p>
    </div>
    `

    document.querySelector(".winResult").style.display = "none"
  }

  function playAgain() {
    resetHtml()
    addAllEventListener()
    circleTurn = false;
    fieldsLeft = 9

    combinations = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [1, 5, 9],
      [3, 5, 7],
      [1, 4, 7],
      [2, 5, 8],
      [3, 6, 9]
    ]


  }

  function addAllEventListener() {
    //preview
    document.querySelectorAll(".inner-field").forEach(elm => {
      elm.addEventListener("mouseenter", mouseEntersField)
    })

    document.querySelectorAll(".field").forEach(elm => {
      elm.addEventListener("click", ev => {
        fieldClicked(ev, elm)
      })
    })

    document.querySelector(".play-again")
    .addEventListener("click", playAgain)
    
    document.querySelector("#reset")
    .addEventListener("click", playAgain)
  
  }
}