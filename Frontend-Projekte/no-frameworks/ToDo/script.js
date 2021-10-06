window.onload = () => load()

/*DATENSTRUKTUR*/

var addBtn = document.querySelector(".add > button")  
var addInput = document.querySelector(".add > input")
var remove = document.querySelector(".remove")
var todosHtml = document.querySelector(".todos")
var todoRadioInput = document.querySelectorAll(".todoInput")

var todos = new Map()
var todoCounter = 0;

function load() {
  addAllEventListener()
}

function addTodo(){
  if(addInput.value == "" || addInput.value == " " || addInput.value.length > 47) return
  if(window.innerWidth < 1005 && window.innerWidth > 800 && addInput.value.length > 35) return alert("Dein ToDo ist zu lang! Max: 35");
  if(window.innerWidth < 800 && window.innerWidth > 500 && addInput.value.length > 22) return alert("Dein ToDo ist zu lang! Max: 22");
  if(window.innerWidth < 500 && addInput.value.length > 15) return alert("Dein ToDo ist zu lang! Max: 15")
  todos.set(todoCounter, addInput.value)
  todoCounter++
  listTodos()
  addInput.value = ""
}

function listTodos(){
  todosHtml.innerHTML = `
  <div class="todo">
          <label style="text-align: center; width: 100%">Deine Todos: ${todos.size}</label>
  </div>
  `
  todos.forEach((value, key) => {
    todosHtml.innerHTML += `
    <div class="todo todo-${key}">
          <input type="radio" class="todoInput" name="todo" id="todo-${key}">
          <label>${value}</label>
    </div>
    `
  })
}

function removeTodo(ev){
  todoRadioInput = document.querySelectorAll(".todoInput")
  todoRadioInput.forEach((el) => {
    if(el.checked){
      var key = el.id.split("-")[1]
      todos.delete(parseInt(key))
      listTodos()
    }
  })
}


function addAllEventListener(){
  addBtn.addEventListener("click", addTodo)
  remove.addEventListener("click", removeTodo)
}