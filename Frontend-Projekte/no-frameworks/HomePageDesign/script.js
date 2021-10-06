
window.onload = () => {
  var mobile_nav = document.querySelector(".mobile-menu")
  var navbarList = document.querySelector(".navbar-list")

  mobile_nav.addEventListener("click", ()=>{
    mobile_nav.classList.toggle("active")
    if(navbarList.classList.contains("none")){
      navbarList.style.top = 0
    }else{
      navbarList.style.top = "-100vh"
    }
    navbarList.classList.toggle("none")
  })
}