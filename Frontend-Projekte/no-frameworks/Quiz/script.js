window.onload = () => load()
async function load() {
    var currentQuestion = 0
    var correct = 0;
    var correctCounter = 0;
    var falseCounter = 0;
    var quiz = (await getQuiz()).quiz
    var clickAble = true

    showCurrentQuestion()
    addAllEventListener()

    async function getQuiz() {
        var quiz = await fetch("./questions/quiz1.json")
        return quiz.json()
    }

    function addAllEventListener() {
        var answers = document.querySelectorAll(".answer")
        var nextBtn = document.querySelector(".next button")

        answers.forEach((el) => {
            el.addEventListener("click", next)
        })

        nextBtn.addEventListener("click", nextQuestion)
    }


    function showCurrentQuestion() {

        var answers = document.querySelector(".answers")
        answers.innerHTML = ""

        var question = quiz[currentQuestion]
        var questionInHtml = document.querySelector(".question p")

        for (var i = 0; i < 4; i++) {
            answers.innerHTML += `
      <div class="${i} answer" id="${i}">
       <p class="${i}">${quiz[currentQuestion].answers[i]}</p>
      </div>
      `
        }

        questionInHtml.innerHTML = `
          ${quiz[currentQuestion].question}
        `

        correct = quiz[currentQuestion].correct

        updateCounter()

        currentQuestion++
    }

    function updateCounter() {
        var headerLeft = document.querySelector(".header-left")
        headerLeft.innerHTML =
            `
    ${currentQuestion + 1}/${quiz.length}
    `
    }

    function next(ev) {
        if (clickAble) {
            var _id = (ev.path[1].id == null || ev.path[1].id == '' || ev.path[1].id == undefined) ? ev.path[0].id : ev.path[1].id

            if (_id == correct.toString()) return showIfCorrect(true, _id, ev)
            else return showIfCorrect(false, _id, ev)
        }
    }

    function showIfCorrect(gotCorrect, id, ev) {
        if (gotCorrect) {
            correctAnswered(id, ev)
        } else {
            notCorrectAnswered(id, ev)
        }
    }

    function correctAnswered(id, ev) {
        correctCounter++
        var answered = document.getElementById(id)
        answered.style.background = "green"
        clickAble = false
        showNextBtn()
    }

    function notCorrectAnswered(id, ev) {
        falseCounter++
        var answered = document.getElementById(id)
        answered.style.background = "red"

        var correctAnswer = document.getElementById(`${correct}`)
        correctAnswer.style.background = "green"

        clickAble = false

        showNextBtn()
    }

    function showNextBtn() {
        document.querySelector(".next").style.display = "block"
    }

    function toggleNextBtn() {
        document.querySelector(".next").style.display = "none"
    }

    function showWinResults() {
        var questionP = document.querySelector(".question p")
        questionP.innerHTML = `
    Ergebnisse:
    `

        var answersHtml = document.querySelector(".answers")

        answersHtml.innerHTML = `
    Richtige Antworten: ${(correctCounter / quiz.length * 100).toFixed(2)}% | ${correctCounter}/${quiz.length}<br>
    Falsche Antworten: ${(100-(correctCounter / quiz.length * 100)).toFixed(2)}% | ${falseCounter}/${quiz.length}
    `
    }

    function nextQuestion(ev) {
        clickAble = true
        toggleNextBtn()
        if (currentQuestion == quiz.length) return showWinResults()
        showCurrentQuestion()
        addAllEventListener()
    }
}