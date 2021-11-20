window.onload = () => load()

function load() {


    var allNumbers = document.querySelectorAll(".info-number")

    startCount()

    alert("Bitte ziehen sie in Betracht, dass diese Website nicht für das Handy geeignet ist.")


    function startCount() {
        allNumbers.forEach(el => {
            let from = 0
            let to = parseInt(el.innerHTML)
            let interval = setInterval(() => {
                el.innerHTML = from
                from = from + 20
                if (from > to) {
                    el.innerHTML = to
                    clearInterval(interval)
                }
            }, 20)
        })
    }
}