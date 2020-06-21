window.addEventListener('load', start);

function start() {
  makeRequest("GET", "/api/todo", [], function(responseText) {
    var todos = JSON.parse(responseText);
    console.log(todos);
  });
  }

function createTodos(event){
    event.preventDefault();
    var title = document.getElementById("titleInput").value;
    var date = document.getElementById("dateInput").value;
    var body = {
      title: title,
      date: date
    };

    makeRequest("POST", "/api/todo", body, function(responseText) {});

    var showTodoContainer = document.getElementById('showTodo');
    var row = document.createElement('p');
    showTodoContainer.appendChild(row);
    row.innerHTML = body.title + " " + body.date;
  }

  function makeRequest(method, url, body, onResponse){
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