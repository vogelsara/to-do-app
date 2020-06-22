window.addEventListener('load', start);

function start() {
  makeRequest("GET", "/api/todo", [], function(responseText) {
    var todos = JSON.parse(responseText);
    console.log(todos);
    renderTodos(todos);
  });
}

function createTodos(event) {
    event.preventDefault();
    var title = document.getElementById("titleInput").value;
    var date = document.getElementById("dateInput").value;
    var body = {
      title: title,
      date: date
    };

    makeRequest("POST", "/api/todo", body, function(responseText) {
      makeRequest("GET", "/api/todo", [], function(responseText) {
        var todos = JSON.parse(responseText);
        console.log(todos);
        renderTodos(todos);
      });
    });
  }

  function renderTodos(todos) {
    var showTodoContainer = document.getElementById('showTodo');
    while (showTodoContainer.firstChild) {
      showTodoContainer.removeChild(showTodoContainer.lastChild);
    }
    
    for (var i = 0; i < todos.length; i++) {
      var listElement = document.createElement("li");
      var content = todos[i];
      var checkbox = document.createElement("input");
      checkbox.id = todos[i].id;
      checkbox.className = "checkboxTodos";
      checkbox.setAttribute("type", "checkbox");

      listElement.innerHTML = content.title + " " + content.date;
      showTodoContainer.appendChild(listElement);
      listElement.appendChild(checkbox);
    }
  }

function deleteTodo() {
    var itemsToDelete = [];
    var todocheckboxes = document.getElementsByClassName("checkboxTodos");
    for (var i = 0; i < todocheckboxes.length; i++) {
        if (todocheckboxes[i].checked == true) {
            itemsToDelete.push(todocheckboxes[i].id);
        }
    }
    makeRequest("DELETE", "/api/todo/", itemsToDelete, function(responseText) {
      makeRequest("GET", "/api/todo", [], function(responseText) {
      var todos = JSON.parse(responseText);
      console.log(todos);
      renderTodos(todos);
    });
  });
}

  function makeRequest(method, url, body, onResponse) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && parseInt(this.status/100) == 2) {
          onResponse(this.responseText);
        }
    }
    xhttp.open(method, url, true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(body));
  }