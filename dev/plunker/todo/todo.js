


var schema = {
  stores:[{
    name:'todo',
    keyPath:"timeStamp"
  }]
};


/**
 * Create and initialize the database. Depending on platform, this will
 * create IndexedDB or WebSql or even localStorage storage mechanism.
 * @type {ydn.db.Storage}
 */
var db = new ydn.db.Storage('todo_2', schema);

var deleteTodo = function (id) {
  db.remove('todo', id).fail(function(e) {
    throw e;
  });

  getAllTodoItems();
};

var getAllTodoItems = function () {
  var todos = document.getElementById("todoItems");
  todos.innerHTML = "";

  var df = db.values('todo');

  df.done(function (items) {
    var n = items.length;
    for (var i = 0; i < n; i++) {
      renderTodo(items[i]);
    }
  });

  df.fail(function (e) {
    throw e;
  })
};

var renderTodo = function (row) {
  var todos = document.getElementById("todoItems");
  var li = document.createElement("li");
  var a = document.createElement("a");
  var t = document.createTextNode(row.text);
  var alerter = document.createElement("a");


  a.addEventListener("click", function () {

    deleteTodo(row.timeStamp);
  }, false);

  alerter.addEventListener("click", function () {
    console.log("click");
    alertTodo(row.timeStamp);
  }, false);

  a.textContent = " [Delete]";
  alerter.textContent = " [Alert This]";
  li.appendChild(t);
  li.appendChild(a);
  li.appendChild(alerter);
  todos.appendChild(li)
};

var addTodo = function () {
  var todo = document.getElementById("todo");

  var data = {
    "text":todo.value,
    "timeStamp":new Date().getTime()
  };
  db.put('todo', data).fail(function(e) {
    throw e;
  });

  todo.value = "";

  getAllTodoItems();
};

var alertTodo = function (id) {
  console.log('looking for todo #'+id)
  db.get('todo', id).done(function(alertMe) {
    console.log('you got me');
    console.log(alertMe);
    alert(alertMe);

  }).fail(function(e) {
    console.log('wtf')
    throw e;
  });

}

function init() {
  getAllTodoItems();
}

init();

