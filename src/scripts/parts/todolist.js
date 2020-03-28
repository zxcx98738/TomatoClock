import $ from "jquery";

function init() {
  console.log("Hello World! Todolist!");
}
//api
function getTodolist() {
  var Todolist = [];
  for (var i = 0; i < localStorage.length; i++) {
    Todolist.push(JSON.parse(localStorage.getItem(i)));
  }
  //console.log(Todolist);
  return Todolist;
}
//api
function finishTodolist(id) {
  var TodolistJSON;
  TodolistJSON = JSON.parse(localStorage.getItem(id));
  //console.log(TodolistJSON.status);
  return TodolistJSON.status;
}

$("#add-button").click(addNote);

function addNote() {
  //console.log($("#add-text").val());
  //console.log(getCurrentTime());
  storeNote($("#add-text").val());
}
function storeNote(text) {
  console.log(text);
  //localStorage = window.localStorage;
  var id = localStorage.length;
  var itemJson = {
    id: id,
    name: text,
    status: false,
    createAt: getCurrentTime(),
    finishAt: null
  };
  localStorage.setItem(id, JSON.stringify(itemJson));
  //console.log(JSON.parse(localStorage.getItem(id)));
  //localStorage.clear();
}
function getCurrentTime() {
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  var time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  var dateTime = date + " " + time;

  return dateTime;
}

export { init };
