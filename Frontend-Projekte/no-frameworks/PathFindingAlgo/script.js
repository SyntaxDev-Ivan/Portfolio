//Dieser Algorithmus heißt Dijkstra, nicht zu verwechseln mit A*, da A* fast das gleiche ist
//aber dazu ein Schätzalgorithmus benutzt.



window.onload = () => load("s")


    /* DATENSTRUKTUR */
  let start;
  let destination;
  let visited = []
  let lowestCosts
  let route;

  var amountOfPoints;


  var graph = {}

  var list = {}
    /* DATENSTRUKTUR */

async function load(startpoint) {
  start = startpoint
  destination = "c"
  visited = []
  lowestCosts
  route;

  amountOfPoints = 9

  //ACHTUNG: Wenn man die Kosten eines Punkten ändert
  //z.B bei "s": {} "a" verändert dann muss man auch
  //bei "a": {} "s" verändern!

  graph = {
    "s": {
      "a": 20,
      "d": 10,
      "h": 6
    },
    "a": {
      "s": 20,
      "d": 20,
      "c": 26,
      "b": 20,
      "h": 10,
      "f": 12
    },
    "d": {
      "s": 10,
      "c": 50,
      "a": 20,
      "g": 19
    },
    "b": {
      "a": 20,
      "c": 10,
      "e": 7,
      "f": 4
    },
    "c": {
      "d": 40,
      "b": 10,
      "a": 26,
      "g": 20,
      "e": 5
    },
    "h": {
      "s": 6,
      "a": 10,
      "f": 15
    },
    "g": {
      "c": 20,
      "d": 19
    },
    "e": {
      "c": 5,
      "b": 7
    },
    "f": {
      "h": 15,
      "a": 12,
      "b": 4
    }
  }

  list = {
    "s": {
      costs: Infinity,
      prev: "",
      index: 0
    },
    "a": {
      costs: Infinity,
      prev: "",
      index: 1
    },
    "b": {
      costs: Infinity,
      prev: "",
      index: 2
    },
    "c": {
      costs: Infinity,
      prev: "",
      index: 3
    },
    "d": {
      costs: Infinity,
      prev: "",
      index: 4
    },
    "e": {
      costs: Infinity,
      prev: "",
      index: 5
    },
    "f": {
      costs: Infinity,
      prev: "",
      index: 6
    },
    "g": {
      costs: Infinity,
      prev: "",
      index: 7
    },
    "h": {
      costs: Infinity,
      prev: "",
      index: 8
    }
  }

  //Die Kosten für den Anfang auf 0 (funktion: setStartValues()), da es der Start ist. => Keine Kosten sind schon da.

  setStartValues()
  addAllEventListener()
  intializeGraphAndRoute()



 async function intializeGraphAndRoute() {
  await calcTable()
  route = getRoute()
  showGraph()
  visited = []
  lowestCosts = undefined
  }

  function setStartValues() {
    list[`${start}`].costs = 0
    list[`${start}`].prev = start
    lowestCosts = start
  }

  async function calcTable() {
    for (var key in list) {
      await getLowest()
      nextWithLowestCosts()
    }
  } 

  function nextWithLowestCosts() {
    for (var key in graph[lowestCosts]) {
      var allCosts = list[lowestCosts].costs + graph[lowestCosts][key]
      if (allCosts <= list[key].costs) {
        list[key].costs = allCosts
        list[key].prev = lowestCosts
      }
    }
    visited.push(lowestCosts)
  }

  async function getLowest() {
    //Mit dem nächsten Knoten anfangen, das noch nicht
    //besucht wurde und die kleinsten Kosten hat.
    //Wenn aber die Besuchtenliste voll ist, sollen die Lowestcosts
    //beibehalten werden.
    var curLowest = Infinity
    var curLowestKey = ""

    for (var key in list) {
      if (visited.length == amountOfPoints) {
        curLowestKey = lowestCosts
      } else if (visited.includes(key)) {
        continue
      } else {
        if (curLowest > list[key].costs) {
          curLowest = list[key].costs
          curLowestKey = key
        }
      }
    }

    if (curLowestKey != "") {
      lowestCosts = curLowestKey
    }

  }

  function getRoute() {
    //Die schnellste Route mit den Vorgängern ausrechnen
    var setNext = list[`${destination}`].prev
    var route = []
    let i = 0;
    do{ 
        //in Route den nächsten Vorgänger speichern, um dann den schnellsten weg zu bekommen
        route.push(setNext)
        setNext = list[setNext].prev
        //Solange, bis wir am start angekommen sind.
    } while(!route.includes(start)) 

    //Reverse da die Route umgekehrt ist!
    var finalRoute = route.reverse()
    //Destination, da wenn z.B das Ziel: c ist, dann müssen wir bis c 
    //Gehen. Also sprich einfach das Ziel zur Route hinzufügen.
    finalRoute.push(destination)
    return finalRoute
  }

  function showGraph() {
    //Alle Kosten anzeigen!
    var allDivs = document.querySelectorAll(".div")
    var allCosts = document.querySelectorAll(".cost")
    allCosts.forEach((el)=>{
      //Die id von der connection (Beinhaltet 2 Punkte z.B sa)
      var classes = el.id
      //Die beiden Punkte aufteilen z.B => ["s", "a"]
      var connection = classes.split("")

      //Vom graphen die Kosten der Verbindung von beiden Punkten bekommen & einsetzen!
      el.innerHTML = graph[connection[0]][connection[1]] + "km"
    })
  }

  function showRoute(route){
    //Routenlinien berechnen.
    var routeLines = []
    for(var i = 0; i < route.length; i++){
      //Im Array die Route mit Nachbarn z.B sa -> s nach a. beispiel array ["s", "a", "c"]
      //Wenn Ziel ist c und s der Start -> routelines = ["sa", "ac"]
      //Wir gehen von sa zu ac und sind dann bei dem Ziel angelangt.
      routeLines.push(`${route[i]}${route[i + 1]}`)
    }
    if(routeLines[routeLines.length - 1].includes("undefined" || undefined)) routeLines.pop()

    //Die Routen noch grün einfärben.
    drawRouteLines(routeLines)
  }

  function drawRouteLines(routeLines){
    routeLines.forEach((el)=>{
      //Die routen einfärben
      var line = document.querySelector(`.${el}`)
      line.setAttribute("color", "green")
      //Auch umgekehrt. Sprich wenn die routeline "sa" ist, dann auch "as" einfärben
      var line2 = document.querySelector(`.${el.split("").reverse().join("")}`)
      line2.setAttribute("color", "green")
    })
  }

  function removeRoute() {
    //Alle rot einfärben
    var lines = document.querySelectorAll("connection")
    lines.forEach(el => {
      el.setAttribute("color", "red")
    })
   
  }


  function addAllEventListener() {
    var allDivs = document.querySelectorAll(".div")

    allDivs.forEach((el)=>{
      el.addEventListener("mouseenter", mouseEnter)
      el.addEventListener("mouseleave", mouseLeave)
      el.addEventListener("click", setNewStartPoint)
    })
    
  }

  function mouseEnter(ev){
    //Das ganze wiederholen, aber mit einem andern Ziel, je nach dem welches Element getriggert wird
    destination = (!ev.path[0].id) ? ev.path[1].id : ev.path[0].id 
    document.getElementById(destination).style.background = (destination == start) ? "yellowgreen" : "purple"
    //Neue Route erstellen
    var newRoute = getRoute()
    //Neue Route anzeigen
    showRoute(newRoute)
    //Kosten anzeigen
    showGraph()
  } 
  
  function mouseLeave(ev){
    //Alles wieder Rückgangig
    var destination = (!ev.path[0].id) ? ev.path[1].id : ev.path[0].id
    removeRoute()
    document.getElementById(destination).style.background = (destination == start) ? "yellowgreen" : "black"
  }

  function setNewStartPoint(ev){
    //Neues start wählen, indem man die Funktion neu lädt, aber mit einem anderen Startpunkt
    var newStart = (!ev.path[0].id) ? ev.path[1].id : ev.path[0].id
    load(newStart)
    //Startpunkt einfärbenm
    setColorOfStartPoint()
  }

  function setColorOfStartPoint() {
    document.querySelector(".start").style.background = "black"
    document.querySelector(".start").classList.remove("start")
    document.getElementById(start).classList.add("start")
    document.getElementById(start).style.background = "yellowgreen"
  }
}