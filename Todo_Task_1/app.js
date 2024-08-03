var addBtn = document.getElementById('btn');
var textArea = document.getElementById('input');
var root = document.getElementById("root");
addBtn.addEventListener('click', () => {
    if (textArea.value.length === 0) {
        alert("Nothing to add")
    }
    else {
        var newTask = `
        <li>
            <span>${textArea.value}</span>
            <button id="del${root.childNodes.length + 1}">Delete</button>
        </li>`
        var curId = `del${root.childNodes.length + 1}`
        textArea.value = ''


        root.innerHTML += newTask;
        var delbtn = document.getElementById(curId).addEventListener('click', (e) => {
            e.target.parentElement.remove();
        })
    }
});




