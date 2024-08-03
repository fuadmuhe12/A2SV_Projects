"use strict";
let root = document.getElementById("root");
let btn = document.getElementById("submitId");
let todo = document.getElementById("todo");
let type = document.getElementById("select");
function addTodo(event) {
    event.preventDefault();
    if (root == null || todo == null || (todo === null || todo === void 0 ? void 0 : todo.value) == "" || type == null) {
        alert("Nothing to add");
    }
    else {
        let newTodo = {
            value: todo.value,
            types: type.value,
        };
        let task = `
            <li id="item_${root === null || root === void 0 ? void 0 : root.childNodes.length}">
                <input type="checkbox" name="todo" id="todo">
                <span class="value">${newTodo.value}</span>
                <span class="type">${newTodo.types}</span>
                <button class="del" onClick="removeTodo()">Delete</button>
                <button class="edit">Edit</button>
            </li>`;
        root.innerHTML += task;
        todo.value = "";
        let del = document.getElementById(`item_${(root === null || root === void 0 ? void 0 : root.childNodes.length) - 1}`);
        del === null || del === void 0 ? void 0 : del.addEventListener("click", removeTodo);
        let edit = document.getElementById(`item_${(root === null || root === void 0 ? void 0 : root.childNodes.length) - 1}`);
        edit === null || edit === void 0 ? void 0 : edit.addEventListener("click", editTodo);
    }
}
function removeTodo(event) {
    if (event.target.classList.contains("del")) {
        let parent = event.target.parentElement;
        parent === null || parent === void 0 ? void 0 : parent.remove();
    }
}
function ToggleHide() { }
btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", addTodo);
function editTodo(event) {
    var _a, _b, _c, _d, _e;
    if (event.target.classList.contains("edit")) {
        if (todo != null && type != null) {
            todo.value = (_b = (_a = event.target.parentElement) === null || _a === void 0 ? void 0 : _a.querySelector(".value")) === null || _b === void 0 ? void 0 : _b.textContent;
            type.value = (_d = (_c = event.target.parentElement) === null || _c === void 0 ? void 0 : _c.querySelector(".type")) === null || _d === void 0 ? void 0 : _d.textContent;
        }
        event.preventDefault();
        (_e = event.target.parentElement) === null || _e === void 0 ? void 0 : _e.remove();
        btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", addTodo);
    }
}
