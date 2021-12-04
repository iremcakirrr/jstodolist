// Tüm elementleri seçmek

const form = document.querySelector("#todo-form");
 
const todoInput = document.querySelector("#todo");
 
const todoList = document.querySelector(".list-group");
 
const firstCardBody = document.querySelectorAll(".card-body")[0];
 
const secondCardBody = document.querySelectorAll(".card-body")[1];
 
const filter = document.querySelector("#filter");
 
const clearButton = document.querySelector("#clear-todos");
 
eventListeners();
function eventListeners(){ //tüm event listenerlar
 
    form.addEventListener("submit",addTodo);
    document.addEventListener("DOMContentLoaded",loadAllTodosToUI);
    secondCardBody.addEventListener("click",deleteTodo);
    filter.addEventListener("keyup",filterTodos);

}

function filterTodos(e){
const filterValue = e.target.value.toLowerCase();
const listitem = document.querySelectorAll(".list-group-item");
listitems.forEach(function(listitem){
    const text = listitem.textContent.toLowerCase();
    if(text.indexOf(filterValue) === -1) {
        // Bulamadı

        listitem.setAttribute("style","display :none !important");
    }
    else {
        listitem.setAttribute("style","display : block");
    }


});

}
function deleteTodo(e){
if(e.target.className === "fa fa-remove"){
e.target.parentElement.parentElement.remove();
deleteTodoFromStorage(e.target.parentElement.parentElement.textContent);
showAlert("success", "Todo başarıyla silindi...");
}

}
function deleteTodoFromStorage(deletetodo){
    let todos = getTodosFromStorage();

    todos.forEach(function(todo,index){
        if(todo === deletetodo) {
            todos.splice(index,1); // arraydan değeri silme

        }
    })

    localStorage.setItem("todos",JSON.stringify(todos));
}
 function loadAllTodosToUI(){
     let todos = getTodosFromStorage();
     todos.forEach(function(todo){
         addTodoToUI(todo);

     })



 }
function addTodo(e){
    const newTodo = todoInput.value.trim();
      if(newTodo === "") {
       
               showAlert("danger", "Lütfen bir todo girin...");     
      }
      else {
          addTodoToUI(newTodo);
          addTodoToStorage(newTodo);
          showAlert("success","başarıyla eklendi");
      }

    e.preventDefault();
   
    }
    function getTodosFromStorage(){ // bütün todo ları alır 
        let todos;
        if (localStorage.getItem("todos") === null) {
            todos = [];
        }
        else {
            todos = JSON.parse(localStorage.getItem("todos"));
        }
        return todos;
    
    }
    function addTodoToStorage(newTodo){
        let todos = getTodosFromStorage();
        todos.push(newTodo);
        localStorage.setItem("todos", JSON.stringify(todos));
    }
    
function showAlert(type,message){
    const alert = document.createElement("div");
    alert.className = `alert alert-${type}`;
    alert.textContent = message;
    firstCardBody.appendChild(alert);
    
   


    // set timeout
    setTimeout(function(){
     alert.remove();
    },1000);

}
function addTodoToUI(newTodo){ // string değerini list item olarak UI'a ekleyecek
  /*  <!-- <li class="list-group-item d-flex justify-content-between">
                            Todo 1
                            <a href = "#" class ="delete-item">
                                <i class = "fa fa-remove"></i>
                            </a>

                        </li>  */
                        // list item oluşturma
           const listitem = document.createElement("li"); 
           // link oluşturma  
           const link = document.createElement("a");
           link.href = "#";
           link.className = "delete-item";
           link.innerHTML = "<i class = 'fa fa-remove'></i>";
           listitem.className = "list-group-item d-flex justify-content-between";

           // text node ekleme
           listitem.appendChild(document.createTextNode(newTodo));
           listitem.appendChild(link);

           // todo liste list item ekleme
           todoList.appendChild(listitem);
           todoInput.value = "";

}