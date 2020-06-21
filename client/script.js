window.addEventListener('load', start);

function start() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
          var todos = JSON.parse(this.responseText);
          console.log(todos);
      }
    };
    xhttp.open("GET", "/api/todo", true);
    xhttp.send();
  }

function createTodos(event){
    event.preventDefault();
    var title = document.getElementById("titleInput").value;
    var date = document.getElementById("dateInput").value;

    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      var response = JSON.stringify(this.responseText);
      console.log(response);
      if (this.readyState == 4 && this.status == 200) {
        var response = JSON.parse(this.responseText);
        console.log(response);
      }
    }
    xhttp.open("POST", "/api/todo", true);
    var body = {
      title: title,
      date: date
    };
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.send(JSON.stringify(body));
    console.log(body.title + body.date);

    var showTodoContainer = document.getElementById('showTodo');
    var row = document.createElement('p');
    showTodoContainer.appendChild(row);
    row.innerHTML = body.title + " " + body.date;
  }