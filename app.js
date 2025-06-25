

let todo = document.getElementById("todoValue");
let list = document.getElementById("list");


document.addEventListener("DOMContentLoaded", loadTodos);

function addTodo() {
    if (todo.value.trim() === "") {
        alert("Please enter a task!");
        return;
    }


    const newTodo = {
        text: todo.value,
        completed: false,
    };


    addTodoToList(newTodo);


    saveTodosToLocalStorage();


    todo.value = "";
}

function addTodoToList(todoItem) {
    list.innerHTML += 
    `<li class="lists">
                <input type="checkbox" class="todo-checkbox" onchange="toggleCompletion(event)" ${todoItem.completed ? "checked" : ""}>
                <input type="text" class="main_input" value="${todoItem.text}" disabled>
                <button class="del" onclick="deleteTodo(event)">Delete</button>
                <button class="edit" onclick="editTodo(event)">Edit</button>
            </li>`;


    if (todoItem.completed) {
        const lastLi = list.lastElementChild;
        const input = lastLi.querySelector(".main_input");
        input.classList.add("completed");
    }
}

function editTodo(event) {
    let target = event.target;
    let li = target.parentNode;
    let input = li.querySelector(".main_input");
    let editButton = li.querySelector("button:nth-child(4)");

    if (editButton.innerText === "Edit") {
        input.disabled = false;
        editButton.innerText = "Update";
    } else {
        input.disabled = true;
        editButton.innerText = "Edit";
        saveTodosToLocalStorage();
    }}
    function deleteTodo(event) {
        let li = event.target.parentNode;
        li.remove();
        saveTodosToLocalStorage();
    }

    function toggleCompletion(event) {
        let checkbox = event.target;
        let li = checkbox.parentNode;
        let input = li.querySelector(".main_input");

        if (checkbox.checked) {
            input.classList.add("completed");
        } else {
            input.classList.remove("completed");
        }

        saveTodosToLocalStorage(); 
    }

    function saveTodosToLocalStorage() {
        const todos = [];
        const todoItems = list.querySelectorAll(".lists");

        todoItems.forEach((item) => {
            const text = item.querySelector(".main_input").value;
            const completed = item.querySelector(".todo-checkbox").checked;
            todos.push({ text, completed });
        });

        localStorage.setItem("todos", JSON.stringify(todos));
    }

    function loadTodos() {
        const todos = JSON.parse(localStorage.getItem("todos")) || [];

        todos.forEach((todoItem) => {
            addTodoToList(todoItem);
        });

    }
