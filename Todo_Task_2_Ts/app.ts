let root: HTMLElement | null = document.getElementById("root");
let btn: HTMLElement | null = document.getElementById("submitId");
let todo: HTMLInputElement | null = document.getElementById(
  "todo"
) as HTMLInputElement;
let type: HTMLSelectElement | null = document.getElementById(
  "select"
) as HTMLSelectElement;
interface Itodo {
  value: string;
  types: string;
}

function addTodo(event: Event): void {
  event.preventDefault();
  if (root == null || todo == null || todo?.value == "" || type == null) {
    alert("Nothing to add");
  } else {
    let newTodo: Itodo = {
      value: todo.value,
      types: type.value,
    };
    let task: string = `
            <li id="item_${root?.childNodes.length}">
                <input type="checkbox" name="todo" id="todo">
                <span class="value">${newTodo.value}</span>
                <span class="type">${newTodo.types}</span>
                <button class="del" onClick="removeTodo()">Delete</button>
                <button class="edit">Edit</button>
            </li>`;
    root.innerHTML += task;
    todo.value = "";

    let del: HTMLElement | null = document.getElementById(
      `item_${root?.childNodes.length - 1}`
    );
    del?.addEventListener("click", removeTodo);
    let edit: HTMLElement | null = document.getElementById(
      `item_${root?.childNodes.length - 1}`
    );
    edit?.addEventListener("click", editTodo);
  }
}

function removeTodo(event: MouseEvent): void {
  if ((event.target as HTMLElement).classList.contains("del")) {
    let parent = (event.target as HTMLElement).parentElement;
    parent?.remove();
  }
}
function ToggleHide(): void {}

btn?.addEventListener("click", addTodo);

function editTodo(event: Event): void {
  if ((event.target as HTMLElement).classList.contains("edit")) {
    if (todo != null && type != null) {
      todo.value = (event.target as HTMLElement).parentElement?.querySelector(
        ".value"
      )?.textContent as string;
      type.value = (event.target as HTMLElement).parentElement?.querySelector(
        ".type"
      )?.textContent as string;
    }
    event.preventDefault();
    (event.target as HTMLElement).parentElement?.remove();
    btn?.addEventListener("click", addTodo);
  }
}
