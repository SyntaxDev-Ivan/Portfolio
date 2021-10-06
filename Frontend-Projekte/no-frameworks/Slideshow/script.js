window.onload = () => load() 


function load(){
  //Datastructure
  var dots = document.querySelectorAll(".dot")
  
  var image = { 1: document.getElementById("img1"),
                2: document.getElementById("img2"),
                3: document.getElementById("img3"),
                4: document.getElementById("img4"),
              }
  
  var currentSlide = 1
  var maxSlide = 4
  
  //Call functions
  var slideTimeOut = setTimeout( () => null, 1)
  var startInterval = setInterval(startSlideShow, 1900)

  addAllEvents()

  //Setup the slide
  function startSlideShow(){
    //Set slides
    if(currentSlide >= maxSlide) currentSlide = 1
    else currentSlide++
    nextSlide()

  }

  function nextSlide(){
    //Change stlye of dots
    var oldActive = document.querySelector(".dot.active")
    var newActive = document.getElementById(currentSlide)
    
    newActive.classList.add("active")
    oldActive.classList.remove("active")
    
    //Change hidden images
    image[oldActive.id].classList.add("hidden")
    image[currentSlide].classList.remove("hidden")
  }

  function addAllEvents(){
    var dots = document.querySelectorAll(".dot")
    
    //Add for all dots a click listener
    dots.forEach((el)=>{
      el.addEventListener("click", () => {
        //If already is that Image active
        if(currentSlide == parseInt(el.id)) return
        //Set propertys
        currentSlide = parseInt(el.id)
        nextSlide()
        //Stop switching atomatic the slidershow for 2 seconds
        clearInterval(startInterval)
        clearTimeout(slideTimeOut)
        slideTimeOut = setTimeout(()=>{
          startInterval = setInterval(startSlideShow, 1900)
        }, 2000)
      })
    })
    

  }
  
}