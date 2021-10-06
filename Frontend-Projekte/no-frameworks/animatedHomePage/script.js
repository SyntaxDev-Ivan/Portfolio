
window.onload = () => load()

function load() {

  //Nav
  var mobileNav = document.querySelector(".mobile-nav")
  var bars = document.querySelector(".bars-icon")
  var mobileNavBody = document.querySelector(".mobile-nav-body")

  //

  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: "#row-1",
      start: "top top",
      pin: false,
      toggleActions: "play none none reverse",
    }
  })

  bars.addEventListener("click", openNav)

  function openNav() {
    mobileNavBody.classList.toggle("active")
  }

  if(window.innerWidth <= 650) console.log("Animations disabled, because your Device is too small.")
  else animations()




  function animations() {

  /*ANIMATIONS*/
    gsap.registerPlugin(ScrollTrigger)

    
    tl.fromTo(".nav", {
      background: "none",
      duration: .5
    }, {
      background: "black"
    })

    //xPercent is the % of the width that should move right or left
    gsap.from("#row-2", {
      scrollTrigger: {
        trigger: "#row-2-b",
        toggleActions: "play none restart reset",
      },
      xPercent: 100,
      opacity: .1,
      duration: 1
    })

    gsap.from("#row-2 img", {
      scrollTrigger: {
        trigger: "#row-2-b",
        toggleActions: "play none restart reset",
      },
      scale: .2,
      duration: 1
    })

    gsap.from("#row-1", {
      scrollTrigger: {
        trigger: "#row-1",
        toggleActions: "play none restart reset",
      },
      xPercent: -100,
      opacity: .1,
      duration: 1
    })

    gsap.from("#row-1 img", {
      scrollTrigger: {
        trigger: "#row-1",
        toggleActions: "play none restart reset",
      },
      scale: .2,
      duration: 1
    })

    /*ANIMATIONS*/
  }
}
