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
            <button id="edit${root.childNodes.length + 1}">Edit</button>

        </li>`
        var delbtn = `del${root.childNodes.length + 1}`
        var editBtn = `edit${root.childNodes.length + 1}`
        textArea.value = ''


        root.innerHTML += newTask;
        var delbtn = document.getElementById(delbtn).addEventListener('click', (e) => {
            e.target.parentElement.remove();
        })

        var editElemet = document.getElementById(editBtn)
        editElemet.addEventListener('click', (e) => {
            textArea.value = e.target.parentElement.querySelector("span").textContent;
            e.target.parentElement.remove();
        });
    }
});




