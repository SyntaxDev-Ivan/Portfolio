window.onload = () => load("load", false)

var needToBeSorted = Array.from({
    length: 70
}, () => Math.floor(Math.random() * 100));

//Kann momentan ein neues Sortierungsverfahren ermöglicht werden
//oder läuft eins noch?
var canRun = false

async function load(algo, clearEvents) {
    canRun = true

    needToBeSorted = Array.from({
        length: 70
    }, () => Math.floor(Math.random() * 100));



    var bars = document.querySelector(".bars")

    switch (algo) {
        case "bubble":
            bubbleSort(needToBeSorted);
            break;
        case "insertion":
            inserationSort(needToBeSorted);
            break;
        case "load":
            showBars(needToBeSorted);
            break;
    }

    addAllEventListener()


    async function bubbleSort(arr) {
        canRun = false
            //bubblesort ist sehr langsam und man sollte ihn nur für 
            //kleine bis mittelgroße Arrays benutzen. Ansonsten so etwas wie quicksorte!
            //Langsamer als insertion sort da es gilt: n-i-1 oder (n^2)/2 insgesamt
            //und insertsion sort: (n^2) / 4 insgesamt. Also doppelt so schnell.


        //temp -> da arr[j] verändert wird, muss es davor gespeichert werden, sonst ist arr[j] & arr[j + 1] gleich
        let temp;
        //Von hinten vom array durchgehen
        for (var i = arr.length; i > 0; i--) {
            //Von vorne vom array durchgehen
            for (var j = 0; j < i; j++) {
                //Vergleichen
                if (arr[j] > arr[j + 1]) {
                    temp = arr[j]
                    arr[j] = arr[j + 1]
                    arr[j + 1] = temp
                        //Warte 5ms, damit die visualisierung zu sehen ist und nicht sofort alles sortiert ist
                    await sleep()
                        //Zeige die atuellen Diagramm
                    showBars(arr)
                        //Visualisiere die grünen bars, wo wir gerade sind
                    visualisation(j, "green")
                    visualisation(j + 1, "green")
                        //und die lilanen bis wo es geht
                    for (var k = i - 1; k < i; k++) {
                        visualisation(k, "purple")
                    }
                    for (var e = 0; e < j; e++) {
                        //und die roten, wo wir schon waren
                        visualisation(e, "red")
                    }
                }
            }
        }
        //Ab jetzt kann ein Neuer algorithmus gestartet werden
        canRun = true

        //Zeige entgültig alle bars an!
        showBars(arr)

    }

    async function inserationSort(arr) {
        canRun = false
            //Diese Art von Sortierverfahren ist viel schneller als Bubblesort. 
            //Sie vergleicht auch paarweise, aber unterscheidet zwischen der bereits sortierten Hälfte
            //und der unsortierten hälfte und ist durchaus für etwas größere Arrays geeignet.
            //(n^2) / 4 

        for (var i = 0; i < arr.length; i++) {
            //Den array ab der 2 stelle durchgehen da 1 schon in der "sortierten" Hälfte ist.


            let j = i
            let needToBeSorted = arr[j + 1]

            while (needToBeSorted < arr[j]) {
                await sleep()
                if (needToBeSorted < arr[j]) {

                    let temp = arr[j]
                    arr[j] = needToBeSorted
                    arr[j + 1] = temp
                    showBars(arr)

                    visualisation(i + 1, "green")
                }

                j--

                needToBeSorted = arr[j + 1]
            }

            if (i == arr.length) {
                canRun = true
            }
        }
        //Ab jetzt kann ein Neuer algorithmus gestartet werden
        canRun = true
        console.log(canRun)
    }

    function showBars(array) {
        bars.innerHTML = ""
        for (var i = 0; i < array.length; i++) {
            bars.innerHTML += `
      <div class="bar" id=${i}></div>
      `

            document.getElementById(i).style.height = array[i] + "%"
        }
    }

    async function visualisation(bar, color) {
        document.getElementById(bar).style.background = color || "red"
    }

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    function addAllEventListener() {
        document.querySelectorAll("button").forEach(elm => {
            elm.addEventListener("click", switchAlgo)
        })
    }

    function removeAllEventListener() {
        document.querySelectorAll("button").forEach(elm => {
            elm.removeEventListener("click", switchAlgo)
        })
    }

    async function switchAlgo(ev) {
        if (canRun) {
            let id = (!ev.path[0].id) ? ev.path[1].id : ev.path[0].id
            var curActive = document.querySelector(".active")
            if (curActive) {
                curActive.classList.remove("active")
            }
            document.getElementById(id).classList.add("active")
            removeAllEventListener()
            load(id, false)
        }

    }




}