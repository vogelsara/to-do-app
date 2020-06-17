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