let todoList = [];
displayItems();

function addTodo() {
  let inputElement = document.querySelector('#todo-input');
  let todoitem = inputElement.value;

  let dateElement = document.querySelector('#todo-date');
  let todoDate = dateElement.value;

  let priorityElement = document.querySelector('#todo-priority');
  let priority = priorityElement.value;

  
  todoList = JSON.parse(localStorage.getItem('todoList')) || [];

  
  todoList.push({ item: todoitem, dueDate: todoDate, completed: false, priority });

  
  localStorage.setItem('todoList', JSON.stringify(todoList));

 
  inputElement.value = '';
  dateElement.value = '';
  priorityElement.value = '';

  
  displayItems();
}

function displayItems() {
  let todoLocal = JSON.parse(localStorage.getItem('todoList')) || [];
  let containerElement = document.querySelector('.containerElement');

  
  containerElement.innerHTML = '';

  let newHtml = '';

  for (let i = 0; i < todoLocal.length; i++) {
    let { item, dueDate, completed, priority } = todoLocal[i];

    newHtml += `
      <div class="todo-item ${completed ? 'completed' : ''}">
        <span class="new-todo">${item}</span>
        <p>
        <span>Due Date: ${dueDate}</span>
        <span class="paraText">Priority: ${priority}</span>
        </p>
        <p>
        <button class="btn-mark" onclick="markComplete(${i});"> ${
      completed ? 'Undo' : 'Mark Complete'
    }</button>
        <button class="btn-edit" onclick="editTodo(${i});">Edit</button>
        <button class="btn-del" onclick="removeTodo(${i});">Delete</button>
        </p>
      </div>`;
  }
  containerElement.innerHTML = newHtml;
}

function markComplete(index) {
  let todoLocal = JSON.parse(localStorage.getItem('todoList')) || [];
  todoLocal[index].completed = !todoLocal[index].completed;
  localStorage.setItem('todoList', JSON.stringify(todoLocal));
  displayItems();
}

function removeTodo(index) {
  let todoLocal = JSON.parse(localStorage.getItem('todoList')) || [];
  todoLocal.splice(index, 1);
  localStorage.setItem('todoList', JSON.stringify(todoLocal));
  displayItems();
}

function editTodo(index) {
  let todoLocal = JSON.parse(localStorage.getItem('todoList')) || [];
  let updatedItem = prompt('Enter the updated task:', todoLocal[index].item);
  if (updatedItem !== null) {
    todoLocal[index].item = updatedItem;
    localStorage.setItem('todoList', JSON.stringify(todoLocal));
    displayItems();
  }
}


function updateDateTime() {
  var now = new Date();
  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();
  var day = now.getDate();
  var month = now.getMonth() + 1; 
  var year = now.getFullYear();

  hours = (hours < 10) ? '0' + hours : hours;
  minutes = (minutes < 10) ? '0' + minutes : minutes;

  var timeString = hours + ':' + minutes;
  var dateString = day + '/' + month + '/' + year;

  document.getElementById('datetime').textContent = timeString + ' ' + dateString;
}


setInterval(updateDateTime, 1000);

updateDateTime();